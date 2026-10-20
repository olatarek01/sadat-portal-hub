import content from "@/data/public-content.json";
import type {
  CollegeRow,
  NewsRow,
  FaqRow,
  DepartmentRow,
  FacultyRow,
  TestimonialRow,
} from "@/data/content-types";
export type {
  CollegeRow,
  NewsRow,
  FaqRow,
  DepartmentRow,
  FacultyRow,
  TestimonialRow,
} from "@/data/content-types";
// Local public snapshot. No network, authentication, or credentials.
export const listColleges = async (): Promise<CollegeRow[]> => structuredClone(content.colleges);
export const listNews = async (): Promise<NewsRow[]> => structuredClone(content.news);
export const listFaqs = async (): Promise<FaqRow[]> => structuredClone(content.faqs);
export const listDepartments = async (): Promise<DepartmentRow[]> =>
  structuredClone(content.departments);
export const listFaculty = async (): Promise<FacultyRow[]> => structuredClone(content.faculty);
export const listTestimonials = async (): Promise<TestimonialRow[]> =>
  structuredClone(content.testimonials);
