export type CollegeRow = {
  id: string;
  slug: string;
  name_ar: string;
  name_en: string;
  category_ar: string;
  category_en: string;
  desc_ar: string;
  desc_en: string;
  dean_ar: string;
  dean_en: string;
  years: number;
  students: number;
  programs: { ar: string; en: string }[];
  image_key: string;
  sort_order: number;
};

export type NewsRow = {
  id: string;
  kind: string;
  category_ar: string;
  category_en: string;
  title_ar: string;
  title_en: string;
  excerpt_ar: string;
  excerpt_en: string;
  body_ar: string;
  body_en: string;
  image_key: string;
  event_date: string;
  published: boolean;
};

export type FaqRow = {
  id: string;
  question_ar: string;
  question_en: string;
  answer_ar: string;
  answer_en: string;
  sort_order: number;
  published: boolean;
};

export type DepartmentRow = {
  id: string;
  college_id: string;
  name_ar: string;
  name_en: string;
  description_ar: string;
  description_en: string;
  sort_order: number;
};

export type FacultyRow = {
  id: string;
  college_id: string;
  name_ar: string;
  name_en: string;
  title_ar: string;
  title_en: string;
  bio_ar: string;
  bio_en: string;
  email: string;
  photo_key: string;
  sort_order: number;
};

export type TestimonialRow = {
  id: string;
  college_id: string | null;
  student_name_ar: string;
  student_name_en: string;
  role_ar: string;
  role_en: string;
  content_ar: string;
  content_en: string;
  photo_key: string;
  rating: number;
  sort_order: number;
};
