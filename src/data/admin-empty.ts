// No private records are shipped in the local website.
type Application = {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  college_slug: string;
  notes: string | null;
  total_score: number | null;
  created_at: string;
  status: string;
};
type Message = {
  id: string;
  full_name: string;
  email: string;
  phone: string | null;
  subject: string;
  message: string;
  created_at: string;
  status: string;
};
type Audit = {
  id: string;
  action: string;
  admin_id: string;
  entity_type: string;
  created_at: string;
};
export const privateRows: {
  applications: Application[];
  messages: Message[];
  audit: Audit[];
  admins: { email: string; active: boolean }[];
} = {
  applications: [],
  messages: [],
  audit: [],
  admins: [],
};
