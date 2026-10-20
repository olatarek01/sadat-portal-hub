import { expect, test } from "bun:test";
import { listColleges, listNews, listTestimonials } from "./content.functions";
import { rejectUnavailable } from "./availability";
import { privateRows } from "../data/admin-empty";
import { readdir, readFile } from "node:fs/promises";

async function sourceFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      if (entry.name === "integrations" || entry.name === "routeTree.gen.ts") return [];
      const url = new URL(entry.name + (entry.isDirectory() ? "/" : ""), directory);
      if (entry.isDirectory()) return sourceFiles(url);
      return /\.(ts|tsx)$/.test(entry.name) ? [url] : [];
    }),
  );
  return files.flat();
}

test("local public catalog retains exactly the seven approved faculties", async () => {
  expect((await listColleges()).map((row) => row.slug).sort()).toEqual([
    "business",
    "computers-ai",
    "pharmacy",
    "science",
    "sports-science",
    "tourism",
    "veterinary-medicine",
  ]);
});
test("local content reads do not make network requests", async () => {
  const original = globalThis.fetch;
  globalThis.fetch = () => {
    throw new Error("Unexpected network request");
  };
  try {
    expect((await listNews()).length).toBe(3);
    expect((await listTestimonials()).length).toBe(1);
  } finally {
    globalThis.fetch = original;
  }
});
test("disabled operations never resolve as a successful save", async () => {
  await expect(rejectUnavailable()).rejects.toThrow("service_unavailable");
});
test("no private admin records are included in local data", () => {
  expect(privateRows).toEqual({ applications: [], messages: [], audit: [], admins: [] });
});

test("application source never imports backend integrations or reads backend credentials", async () => {
  for (const file of await sourceFiles(new URL("../", import.meta.url))) {
    const source = await readFile(file, "utf8");
    expect(source).not.toMatch(
      /(?:from\s*|import\s*\()["'][^"']*(?:@supabase\/|integrations\/supabase)/,
    );
    expect(source).not.toMatch(/\b(?:VITE_)?SUPABASE_[A-Z_]+\b|\bcreateServerFn\s*\(/);
  }
});

test("runtime dependencies do not include a backend SDK", async () => {
  const pkg = JSON.parse(await readFile(new URL("../../package.json", import.meta.url), "utf8"));
  expect(Object.keys(pkg.dependencies).filter((name) => name.startsWith("@supabase/"))).toEqual([]);
});
