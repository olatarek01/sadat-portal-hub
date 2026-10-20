import type { Bi } from "./university";

import imgVet from "@/assets/col-veterinary-medicine.jpg";
import imgMed from "@/assets/col-medicine.jpg";
import imgPharm from "@/assets/col-pharmacy.jpg";
import imgBio from "@/assets/col-biotechnology.jpg";
import imgEng from "@/assets/col-engineering.jpg";
import imgCom from "@/assets/col-commerce.jpg";
import imgEdu from "@/assets/col-education.jpg";
import imgPe from "@/assets/col-physical-education.jpg";
import imgTour from "@/assets/col-tourism.jpg";
import imgGen from "@/assets/col-genetic-engineering-institute.jpg";
import imgEnv from "@/assets/col-environmental-studies.jpg";
import imgAi from "@/assets/col-computers-ai.jpg";

export const collegeImages: Record<string, string> = {
  "veterinary-medicine": imgVet,
  medicine: imgMed,
  pharmacy: imgPharm,
  biotechnology: imgBio,
  engineering: imgEng,
  commerce: imgCom,
  business: imgCom,
  science: imgBio,
  education: imgEdu,
  "physical-education": imgPe,
  "sports-science": imgPe,
  tourism: imgTour,
  "genetic-engineering-institute": imgGen,
  "environmental-studies": imgEnv,
  "computers-ai": imgAi,
};

export const announcements: Bi[] = [
  {
    ar: "فتح باب التقديم للعام الجامعي الجديد عبر بوابة القبول الإلكترونية",
    en: "Applications are open for the new academic year via the online admissions portal",
  },
  {
    ar: "الجامعة تحصد مراكز متقدمة في تصنيف التايمز للجامعات الناشئة",
    en: "The university advances in the Times Young University Rankings",
  },
  {
    ar: "بدء التسجيل في الدورات التدريبية بمركز تنمية قدرات أعضاء هيئة التدريس",
    en: "Registration opens for staff development training courses",
  },
  {
    ar: "الجامعة تعلن فتح باب التوظيف لأعضاء هيئة التدريس والهيئة المعاونة",
    en: "The university announces the opening of recruitment for academic and teaching staff",
  },
];

export const whyUs: { key: string; title: Bi; desc: Bi }[] = [
  {
    key: "accredited",
    title: { ar: "اعتماد أكاديمي", en: "Academic Accreditation" },
    desc: {
      ar: "برامج معتمدة من الهيئة القومية لضمان جودة التعليم والاعتماد.",
      en: "Programs accredited by the National Authority for Quality Assurance.",
    },
  },
  {
    key: "labs",
    title: { ar: "معامل متطورة", en: "Advanced Laboratories" },
    desc: {
      ar: "أكثر من 120 معملًا بحثيًا وتعليميًا مجهزًا بأحدث الأجهزة.",
      en: "Over 120 teaching and research labs with state-of-the-art equipment.",
    },
  },
  {
    key: "global",
    title: { ar: "شراكات دولية", en: "Global Partnerships" },
    desc: {
      ar: "اتفاقيات تبادل علمي مع جامعات ومراكز بحثية في أوروبا وآسيا.",
      en: "Exchange agreements with universities and research centres in Europe and Asia.",
    },
  },
  {
    key: "career",
    title: { ar: "دعم التوظيف", en: "Career Support" },
    desc: {
      ar: "مركز التدريب والتوظيف يربط الخريجين بسوق العمل والمنطقة الصناعية.",
      en: "A careers centre linking graduates with employers and the industrial zone.",
    },
  },
  {
    key: "campus",
    title: { ar: "مدينة جامعية", en: "Student Housing" },
    desc: {
      ar: "مدن جامعية للطلاب والطالبات بخدمات إقامة وإعاشة متكاملة.",
      en: "On-campus housing for male and female students with full services.",
    },
  },
  {
    key: "digital",
    title: { ar: "تحول رقمي", en: "Digital Transformation" },
    desc: {
      ar: "خدمات طلابية إلكترونية ومنصات تعلم رقمية ومكتبة رقمية.",
      en: "E-services, digital learning platforms and a full digital library.",
    },
  },
];

export const presidentMessage = {
  name: { ar: "أ.د. ناصر عبد الباري", en: "Prof. Nasser Abdel Bary" },
  role: {
    ar: "رئيس جامعة مدينة السادات الأهلية",
    en: "President of National University of Sadat City",
  },
  quote: {
    ar: "رسالتنا أن نُخرِّج جيلًا قادرًا على المنافسة، يمتلك المعرفة والمهارة والقيم. نستثمر في الإنسان أولًا، ونربط البحث العلمي باحتياجات الصناعة والمجتمع في المنوفية ومصر كلها.",
    en: "Our mission is to graduate a competitive generation equipped with knowledge, skills and values. We invest in people first, and connect research with the needs of industry and society across Menoufia and Egypt.",
  },
};

export const achievements: { value: number; suffix?: string; label: Bi }[] = [
  { value: 480, suffix: "+", label: { ar: "بحث دولي منشور", en: "International publications" } },
  { value: 36, label: { ar: "براءة اختراع", en: "Registered patents" } },
  { value: 62, suffix: "+", label: { ar: "اتفاقية تعاون", en: "Cooperation agreements" } },
  { value: 120, suffix: "+", label: { ar: "معمل مجهز", en: "Equipped laboratories" } },
];

export const progressMetrics: { label: Bi; value: number }[] = [
  { label: { ar: "نسبة رضا الطلاب", en: "Student satisfaction" }, value: 92 },
  {
    label: { ar: "المشاركة في الأنشطة الطلابية", en: "Student activity participation" },
    value: 88,
  },
  { label: { ar: "البرامج المعتمدة", en: "Accredited programs" }, value: 85 },
  { label: { ar: "الخدمات الرقمية", en: "Digitised services" }, value: 96 },
];

export const testimonials: { name: Bi; role: Bi; quote: Bi }[] = [
  {
    name: { ar: "منة الله شريف", en: "Mennatallah Sherif" },
    role: { ar: "طالبة كلية الصيدلة", en: "Pharmacy student" },
    quote: {
      ar: "المعامل والتدريب العملي في الصيدلة أعطياني ثقة حقيقية، وشاركت في تدريب صيفي بشركة أدوية أثناء الدراسة.",
      en: "The labs and practical training in pharmacy gave me real confidence, and I joined a summer training at a pharma company during my studies.",
    },
  },
  {
    name: { ar: "أحمد عبد الرحمن", en: "Ahmed Abdelrahman" },
    role: {
      ar: "طالب كلية الحاسبات والمعلومات والذكاء الاصطناعي",
      en: "Computers, Information & AI student",
    },
    quote: {
      ar: "مشروعات التخرج هنا مرتبطة بمصانع المنطقة الصناعية، وده خلانا نشتغل على مشاكل حقيقية.",
      en: "Graduation projects here are tied to factories in the industrial zone, so we solve real problems.",
    },
  },
  {
    name: { ar: "سارة الجندي", en: "Sara El-Gindy" },
    role: { ar: "معيدة بكلية العلوم", en: "Teaching assistant, Faculty of Science" },
    quote: {
      ar: "بيئة بحثية داعمة وتمويل للمشروعات، وشاركنا في أبحاث معملية خلال عامين.",
      en: "A supportive research environment with project funding; we took part in lab research within two years.",
    },
  },
  {
    name: { ar: "محمود سيد", en: "Mahmoud Sayed" },
    role: { ar: "طالب كلية الطب البيطري", en: "Veterinary Medicine student" },
    quote: {
      ar: "المستشفى البيطري التعليمي كان نقلة، اتدربت على حالات حقيقية من أول سنة إكلينيكية.",
      en: "The teaching veterinary hospital was a turning point; I handled real cases from my first clinical year.",
    },
  },
];
