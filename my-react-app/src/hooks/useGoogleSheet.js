/**
 * Submits form data to Google Sheets via Google Apps Script.
 * This is a fire-and-forget call — it doesn't block the UI.
 * The main form submission (EmailJS) handles success/error state.
 *
 * @param {object} data - Form data to send
 * @param {string} data.formType - "contact" or "career"
 */
export async function submitToGoogleSheet(data) {
  const url = import.meta.env.VITE_GOOGLE_SHEET_URL;
  if (!url) {
    console.warn("Google Sheet URL not configured. Skipping sheet submission.");
    return;
  }

  try {
    await fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
    });
  } catch (err) {
    // Silent fail — Google Sheet is a secondary backup, not primary
    console.warn("Google Sheet submission failed:", err);
  }
}
