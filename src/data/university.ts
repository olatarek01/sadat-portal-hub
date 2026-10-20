export type Bi = { ar: string; en: string };

export const university = {
  name: { ar: "جامعة مدينة السادات الأهلية", en: "National University of Sadat City" },
  short: { ar: "جامعة السادات", en: "SCU" },
  tagline: {
    ar: "علمٌ يُبنى، ومستقبلٌ يُصنع في مدينة السادات",
    en: "Knowledge built today, futures made in Sadat City",
  },
  about: {
    ar: "جامعة أهلية مصرية غير هادفة للربح تأسست عام 2024 في محافظة المنوفية، تضم 7 كليات ويبلغ عدد طلابها 7,000+ طالب وطالبة.",
    en: "An Egyptian national (non-profit) university established in 2024 in Menoufia Governorate, comprising 7 faculties and 7,000+ students.",
  },
  contact: {
    address: {
      ar: "مدينة السادات، محافظة المنوفية، جمهورية مصر العربية",
      en: "Sadat City, Menoufia Governorate, Egypt",
    },
    phone: "01090004204",
    phoneIntl: "+201090004204",
    email: "info@nusc.edu.eg",
  },
};

export const stats: { value: number; suffix?: string; label: Bi }[] = [
  { value: 7, label: { ar: "كليات", en: "Faculties" } },
  { value: 7000, suffix: "+", label: { ar: "طالب وطالبة", en: "Students" } },
  { value: 450, suffix: "+", label: { ar: "عضو هيئة تدريس", en: "Academic Staff" } },
  { value: 2024, label: { ar: "سنة التأسيس", en: "Founded" } },
];

export type College = {
  slug: string;
  name: Bi;
  category: Bi;
  years: number;
  desc: Bi;
  programs: Bi[];
  dean: Bi;
  students: number;
};

export const colleges: College[] = [
  {
    slug: "pharmacy",
    name: { ar: "كلية الصيدلة", en: "Faculty of Pharmacy" },
    category: { ar: "علوم طبية", en: "Medical Sciences" },
    years: 5,
    students: 780,
    dean: { ar: "أ.د. مروة فايد", en: "Prof. Marwa Fayed" },
    desc: {
      ar: "تمنح درجة الصيدلة الإكلينيكية مع معامل متقدمة للتحليل الدوائي والتكنولوجيا الصيدلية.",
      en: "Offers a clinical pharmacy degree with advanced labs for drug analysis and pharmaceutical technology.",
    },
    programs: [
      { ar: "الصيدلة الإكلينيكية", en: "Clinical Pharmacy" },
      { ar: "فارم دي", en: "Pharm.D" },
    ],
  },
  {
    slug: "veterinary-medicine",
    name: { ar: "كلية الطب البيطري", en: "Faculty of Veterinary Medicine" },
    category: { ar: "علوم طبية", en: "Medical Sciences" },
    years: 5,
    students: 760,
    dean: { ar: "أ.د. شريف زيدان", en: "Prof. Sherif Zeidan" },
    desc: {
      ar: "تُعنى الكلية بإعداد أطباء بيطريين مؤهلين للتعامل مع صحة الحيوان والأمن الغذائي، وتضم مستشفى بيطري تعليمي ومزارع تدريبية.",
      en: "Prepares veterinarians for animal health and food security, with a teaching veterinary hospital and training farms.",
    },
    programs: [
      { ar: "الطب البيطري", en: "Veterinary Medicine" },
      { ar: "صحة وسلامة الغذاء", en: "Food Safety & Hygiene" },
    ],
  },
  {
    slug: "computers-ai",
    name: {
      ar: "كلية الحاسبات والمعلومات والذكاء الاصطناعي",
      en: "Faculty of Computers, Information & Artificial Intelligence",
    },
    category: { ar: "علوم وهندسة", en: "Science & Engineering" },
    years: 4,
    students: 790,
    dean: { ar: "أ.د. أحمد سالم", en: "Prof. Ahmed Salem" },
    desc: {
      ar: "برامج في الشبكات والحوسبة السحابية والذكاء الاصطناعي والبيانات الضخمة مع معامل حوسبة عالية الأداء.",
      en: "Programs in networks and cloud computing, AI and big data, with high-performance computing labs.",
    },
    programs: [
      { ar: "الشبكات والحوسبة السحابية", en: "Networks & Cloud Computing" },
      { ar: "الذكاء الاصطناعي والبيانات الضخمة", en: "AI & Big Data" },
    ],
  },
  {
    slug: "science",
    name: { ar: "كلية العلوم", en: "Faculty of Science" },
    category: { ar: "العلوم والحوسبة", en: "Science & Computing" },
    years: 4,
    students: 735,
    dean: { ar: "أ.د. خالد الكيلاني", en: "Prof. Khaled El-Keylany" },
    desc: {
      ar: "دراسة العلوم الأساسية والتطبيقية وتنمية مهارات البحث العلمي والتحليل والتجريب.",
      en: "Basic and applied sciences with a focus on scientific research, analysis and experimentation.",
    },
    programs: [
      { ar: "الكيمياء الصناعية التطبيقية", en: "Applied Industrial Chemistry" },
      { ar: "علوم البيانات وتطبيقات الذكاء الاصطناعي", en: "Data Science & AI Applications" },
    ],
  },
  {
    slug: "business",
    name: { ar: "كلية الأعمال", en: "Faculty of Business" },
    category: { ar: "علوم إنسانية", en: "Humanities" },
    years: 4,
    students: 750,
    dean: { ar: "أ.د. مروة", en: "Prof. Marwa" },
    desc: {
      ar: "برامج في نظم معلومات الأعمال والمحاسبة المهنية والتسويق الرقمي مع تدريس باللغة الإنجليزية.",
      en: "Programs in business information systems, professional accounting and digital marketing, taught in English.",
    },
    programs: [
      { ar: "نظم معلومات الأعمال (BIS)", en: "Business Information Systems (BIS)" },
      { ar: "المحاسبة المهنية", en: "Professional Accounting" },
      { ar: "التسويق الرقمي", en: "Digital Marketing" },
    ],
  },
  {
    slug: "sports-science",
    name: { ar: "كلية علوم الرياضة", en: "Faculty of Sports Science" },
    category: { ar: "علوم إنسانية", en: "Humanities" },
    years: 4,
    students: 715,
    dean: { ar: "أ.د. أحمد ربيع", en: "Prof. Ahmed Rabie" },
    desc: {
      ar: "برامج في تخطيط الأحمال التدريبية والاستشفاء والتأهيل وإدارة الأعمال الرياضية وتحليل البيانات والترويح، مع ملاعب وصالات مجهزة ومعامل فسيولوجيا رياضية.",
      en: "Programs in training load planning, recovery and rehabilitation, sports business, data analytics and recreation, with equipped fields, halls and physiology labs.",
    },
    programs: [
      { ar: "تخطيط الأحمال التدريبية", en: "Training Load Planning" },
      { ar: "الاستشفاء والتأهيل البدني والحركي", en: "Recovery & Physical Rehabilitation" },
      { ar: "إدارة الأعمال الرياضية", en: "Sports Business Management" },
      { ar: "تحليل البيانات الرياضية", en: "Sports Data Analytics" },
      { ar: "الترويح وأنشطة جودة الحياة", en: "Recreation & Quality-of-Life Activities" },
    ],
  },
  {
    slug: "tourism",
    name: { ar: "كلية السياحة والفنادق", en: "Faculty of Tourism & Hotels" },
    category: { ar: "علوم إنسانية", en: "Humanities" },
    years: 4,
    students: 705,
    dean: { ar: "أ.د. محمود رمضان", en: "Prof. Mahmoud Ramadan" },
    desc: {
      ar: "برامج في إدارة الطيران والإدارة الدولية لعمليات الفنادق والمطاعم مع تدريب صيفي بالمنشآت السياحية والفندقية.",
      en: "Programs in aviation management and international hotel and restaurant operations, with summer training at tourism and hospitality venues.",
    },
    programs: [
      { ar: "إدارة الطيران", en: "Aviation Management" },
      {
        ar: "الإدارة الدولية لعمليات الفنادق والمطاعم",
        en: "International Hotel & Restaurant Operations Management",
      },
    ],
  },
];

export const admissionSteps: { title: Bi; desc: Bi }[] = [
  {
    title: { ar: "تنسيق القبول الإلكتروني", en: "Online Placement" },
    desc: {
      ar: "سجّل رغباتك عبر موقع التنسيق الإلكتروني لوزارة التعليم العالي خلال المرحلة المخصصة لمجموعك.",
      en: "Register your choices on the Ministry of Higher Education placement portal during your score stage.",
    },
  },
  {
    title: { ar: "تسليم ملف الالتحاق", en: "Submit Your File" },
    desc: {
      ar: "قدّم شهادة الثانوية الأصلية، شهادة الميلاد، 6 صور شخصية، ونموذج 2 جند للطلاب الذكور.",
      en: "Provide the original secondary certificate, birth certificate, 6 photos and military form 2 for male students.",
    },
  },
  {
    title: { ar: "الكشف الطبي", en: "Medical Check" },
    desc: {
      ar: "اجتياز الكشف الطبي بالإدارة الطبية بالجامعة، وهو شرط للتسجيل النهائي.",
      en: "Pass the medical examination at the university medical administration — required for final registration.",
    },
  },
  {
    title: { ar: "سداد المصروفات", en: "Pay Tuition" },
    desc: {
      ar: "سداد الرسوم الدراسية إلكترونيًا أو عبر البنك المعتمد واستلام إيصال السداد.",
      en: "Pay tuition online or through the approved bank and keep the payment receipt.",
    },
  },
  {
    title: { ar: "استلام الكارنيه وبدء الدراسة", en: "Get Your ID & Start" },
    desc: {
      ar: "استلم كارنيه الجامعة وحساب البريد الأكاديمي وابدأ أسبوع التهيئة للطلاب الجدد.",
      en: "Collect your university ID and academic email, then join freshman orientation week.",
    },
  },
];

export type TuitionRow = {
  college: Bi;
  program: Bi;
  fees: { amount: number; track?: Bi }[];
};

// Program fees follow the latest user-approved table; language rates apply to
// every listed program within Business and Sports Science.
export const tuition: TuitionRow[] = colleges.flatMap((college) =>
  college.programs
    .map((program, index) => {
      let fees: TuitionRow["fees"];
      switch (college.slug) {
        case "pharmacy":
          fees = [{ amount: index === 0 ? 90000 : 80000 }];
          break;
        case "computers-ai":
          fees = [{ amount: index === 0 ? 58000 : 62000 }];
          break;
        case "veterinary-medicine":
          fees = [{ amount: 65000 }];
          break;
        case "science":
          fees = [{ amount: 45000 }];
          break;
        case "business":
          fees = [
            { amount: 40000, track: { ar: "إنجليزي", en: "English" } },
            { amount: 30000, track: { ar: "عربي", en: "Arabic" } },
          ];
          break;
        case "sports-science":
          fees = [
            { amount: 35000, track: { ar: "إنجليزي", en: "English" } },
            { amount: 25000, track: { ar: "عربي", en: "Arabic" } },
          ];
          break;
        case "tourism":
          fees = [{ amount: 30000 }];
          break;
        default:
          return [];
      }
      return [{ college: college.name, program, fees }];
    })
    .flat(),
);

export const researchCenters: { name: Bi; desc: Bi; metric: Bi }[] = [
  {
    name: {
      ar: "مركز التميز البحثي في التكنولوجيا الحيوية",
      en: "Centre of Excellence in Biotechnology",
    },
    desc: {
      ar: "أبحاث في اللقاحات البيطرية والإنتاج الحيوي بالتعاون مع شركاء صناعيين.",
      en: "Research on veterinary vaccines and bioproduction with industrial partners.",
    },
    metric: { ar: "38 مشروعًا نشطًا", en: "38 active projects" },
  },
  {
    name: { ar: "وحدة النشر العلمي الدولي", en: "International Publishing Unit" },
    desc: {
      ar: "دعم الباحثين في النشر بالمجلات المصنفة وتغطية رسوم النشر المفتوح.",
      en: "Supports researchers publishing in indexed journals and covers open-access fees.",
    },
    metric: { ar: "1,240 بحثًا منشورًا", en: "1,240 papers published" },
  },
  {
    name: { ar: "مكتب نقل وتسويق التكنولوجيا", en: "Technology Transfer Office" },
    desc: {
      ar: "تسجيل براءات الاختراع وربط مخرجات البحث بالمنطقة الصناعية.",
      en: "Patent filing and linking research outputs with the industrial zone.",
    },
    metric: { ar: "64 براءة اختراع", en: "64 patents filed" },
  },
  {
    name: { ar: "معامل التحاليل المركزية", en: "Central Analytical Labs" },
    desc: {
      ar: "خدمات تحليلية متقدمة للباحثين والشركات على مدار الأسبوع.",
      en: "Advanced analytical services for researchers and companies all week.",
    },
    metric: { ar: "27 جهازًا متقدمًا", en: "27 advanced instruments" },
  },
];

export type NewsItem = {
  id: string;
  type: "news" | "event";
  category: Bi;
  date: string;
  title: Bi;
  excerpt: Bi;
};

export const news: NewsItem[] = [
  {
    id: "n1",
    type: "news",
    category: { ar: "أكاديمي", en: "Academic" },
    date: "2026-09-02",
    title: {
      ar: "جامعة مدينة السادات الأهلية تعتمد لائحة جديدة لكلية الحاسبات والذكاء الاصطناعي",
      en: "University approves a new bylaw for the Faculty of Computers & AI",
    },
    excerpt: {
      ar: "تتضمن اللائحة مسارات جديدة في تعلم الآلة وأمن المعلومات بدءًا من العام الدراسي القادم.",
      en: "The bylaw introduces new tracks in machine learning and information security from next academic year.",
    },
  },
  {
    id: "n2",
    type: "event",
    category: { ar: "مؤتمرات", en: "Conferences" },
    date: "2026-10-14",
    title: {
      ar: "المؤتمر الدولي الخامس للتكنولوجيا الحيوية التطبيقية",
      en: "5th International Conference on Applied Biotechnology",
    },
    excerpt: {
      ar: "ثلاثة أيام من الجلسات العلمية وورش العمل بمشاركة باحثين من 14 دولة.",
      en: "Three days of scientific sessions and workshops with researchers from 14 countries.",
    },
  },
  {
    id: "n3",
    type: "news",
    category: { ar: "بحث علمي", en: "Research" },
    date: "2026-08-21",
    title: {
      ar: "فريق بحثي بالجامعة يسجل براءة اختراع لمركب مضاد للبكتيريا",
      en: "University team files a patent for a new antibacterial compound",
    },
    excerpt: {
      ar: "المركب مستخلص من نباتات محلية وأظهر فاعلية ضد سلالات مقاومة للمضادات الحيوية.",
      en: "Derived from local plants, the compound showed efficacy against antibiotic-resistant strains.",
    },
  },
  {
    id: "n4",
    type: "event",
    category: { ar: "أنشطة طلابية", en: "Student Life" },
    date: "2026-09-28",
    title: { ar: "أسبوع استقبال الطلاب الجدد 2026", en: "Freshman Orientation Week 2026" },
    excerpt: {
      ar: "فعاليات تعريفية وجولات بالحرم الجامعي ومعرض للأسر الطلابية.",
      en: "Orientation sessions, campus tours and a student union societies fair.",
    },
  },
  {
    id: "n5",
    type: "news",
    category: { ar: "شراكات", en: "Partnerships" },
    date: "2026-07-30",
    title: {
      ar: "بروتوكول تعاون مع المنطقة الصناعية بمدينة السادات",
      en: "Cooperation protocol with the Sadat City industrial zone",
    },
    excerpt: {
      ar: "يتيح البروتوكول تدريبًا صيفيًا لـ 900 طالب سنويًا ومشروعات بحثية مشتركة.",
      en: "The protocol provides summer training for 900 students yearly and joint research projects.",
    },
  },
  {
    id: "n6",
    type: "event",
    category: { ar: "رياضة", en: "Sports" },
    date: "2026-11-05",
    title: { ar: "دوري الكليات لكرة القدم", en: "Inter-Faculty Football League" },
    excerpt: {
      ar: "انطلاق منافسات الدوري بمشاركة 12 فريقًا على ملاعب المدينة الجامعية.",
      en: "The league kicks off with 12 teams competing on the campus fields.",
    },
  },
];

export const campusPlaces: { name: Bi; type: Bi; x: number; y: number }[] = [
  {
    name: { ar: "مبنى الإدارة العامة", en: "Main Administration" },
    type: { ar: "إداري", en: "Admin" },
    x: 26,
    y: 32,
  },
  {
    name: { ar: "المكتبة المركزية", en: "Central Library" },
    type: { ar: "خدمات", en: "Services" },
    x: 52,
    y: 24,
  },
  {
    name: { ar: "كلية الطب البيطري", en: "Veterinary Medicine" },
    type: { ar: "كليات", en: "Faculties" },
    x: 70,
    y: 44,
  },
  {
    name: { ar: "كلية الهندسة", en: "Engineering" },
    type: { ar: "كليات", en: "Faculties" },
    x: 38,
    y: 58,
  },
  {
    name: { ar: "المدينة الجامعية", en: "Student Housing" },
    type: { ar: "سكن", en: "Housing" },
    x: 16,
    y: 70,
  },
  {
    name: { ar: "الملاعب الرياضية", en: "Sports Fields" },
    type: { ar: "رياضة", en: "Sports" },
    x: 78,
    y: 74,
  },
  {
    name: { ar: "المستشفى الجامعي", en: "University Hospital" },
    type: { ar: "صحة", en: "Health" },
    x: 60,
    y: 66,
  },
];
