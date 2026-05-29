/**
 * شناسایی صحنهٔ انیمه با ارسال تصویر به trace.moe
 * @param {File} file - فایل تصویر انتخاب‌شده توسط کاربر
 * @returns {Promise<Object>} نتیجهٔ جستجو شامل result و error
 */
export async function searchAnimeScene(file) {
  const formData = new FormData();
  formData.append("image", file);

  const response = await fetch("https://api.trace.moe/search", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`trace.moe API error: ${response.status}`);
  }

  return response.json();
}
