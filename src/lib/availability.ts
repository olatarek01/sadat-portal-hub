export const unavailable = {
  ar: "هذه الخدمة غير متاحة حاليًا. لم يتم إرسال أو حفظ أي بيانات. يُرجى التواصل مع الجامعة مباشرةً.",
  en: "This service is currently unavailable. No information has been sent or saved. Please contact the university directly.",
};
export async function rejectUnavailable(): Promise<never> {
  throw new Error("service_unavailable");
}
