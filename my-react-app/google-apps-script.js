// ═══════════════════════════════════════════════════════════════
// GOOGLE APPS SCRIPT — paste this into script.google.com
// Handles Contact Inquiries + Career Applications
// ═══════════════════════════════════════════════════════════════

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet;

    if (data.formType === "contact") {
      // ── CONTACT FORM ──
      sheet = ss.getSheetByName("Contact Inquiries");
      if (!sheet) {
        sheet = ss.insertSheet("Contact Inquiries");
        sheet.appendRow([
          "Timestamp", "Name", "Email", "Phone", "Category", "Message", "Status"
        ]);
        sheet.getRange(1, 1, 1, 7).setFontWeight("bold").setBackground("#050505").setFontColor("#ffffff");
        sheet.setFrozenRows(1);
        sheet.setColumnWidth(6, 400);
      }
      sheet.appendRow([
        new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
        data.name || "",
        data.email || "",
        data.phone || "—",
        data.subject || "",
        data.message || "",
        "New"
      ]);

    } else if (data.formType === "career") {
      // ── CAREER APPLICATION ──
      sheet = ss.getSheetByName("Career Applications");
      if (!sheet) {
        sheet = ss.insertSheet("Career Applications");
        sheet.appendRow([
          "Timestamp",
          "Full Name",
          "Email",
          "Phone",
          "Date of Birth",
          "Applied From",
          "Position",
          "Years of Experience",
          "Availability",
          "Present City",
          "Present State",
          "Hometown",
          "Home State",
          "Present Salary (Lacs)",
          "Expected Salary (Lacs)",
          "Current Company / Designation",
          "Distance from Worli HQ",
          "Smoke",
          "Drink",
          "Resume / Portfolio Link",
          "Status"
        ]);
        sheet.getRange(1, 1, 1, 21).setFontWeight("bold").setBackground("#050505").setFontColor("#ffffff");
        sheet.setFrozenRows(1);
        sheet.setColumnWidth(20, 400);
      } else {
        // Rename the column header if this sheet was created before the
        // field was migrated from pasted CV text to a shareable URL.
        var headerCell = sheet.getRange(1, 20);
        if (headerCell.getValue() === "Resume / CV Text") {
          headerCell.setValue("Resume / Portfolio Link");
        }
      }
      sheet.appendRow([
        new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
        data.name || "",
        data.email || "",
        data.phone || "—",
        data.dob || "—",
        data.appliedFrom || "—",
        data.position || "",
        data.experience || "—",
        data.availability || "—",
        data.presentCity || "—",
        data.presentState || "—",
        data.hometown || "—",
        data.homeState || "—",
        data.presentSalary || "—",
        data.expectedSalary || "—",
        data.currentCompany || "—",
        data.distanceFromWorli || "—",
        data.smoke || "—",
        data.drink || "—",
        // Fall back to the legacy resumeText field if any older client still
        // sends it, so nothing is lost in transit during the rollout.
        data.resumeLink || data.resumeText || "—",
        "New"
      ]);
    }

    return ContentService
      .createTextOutput(JSON.stringify({ status: "success" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Run this once manually to create both sheets with headers
function setup() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();

  var contact = ss.insertSheet("Contact Inquiries");
  contact.appendRow(["Timestamp", "Name", "Email", "Phone", "Category", "Message", "Status"]);
  contact.getRange(1, 1, 1, 7).setFontWeight("bold").setBackground("#050505").setFontColor("#ffffff");
  contact.setFrozenRows(1);

  var career = ss.insertSheet("Career Applications");
  career.appendRow([
    "Timestamp", "Full Name", "Email", "Phone", "Date of Birth", "Applied From",
    "Position", "Years of Experience", "Availability", "Present City", "Present State",
    "Hometown", "Home State", "Present Salary (Lacs)", "Expected Salary (Lacs)",
    "Current Company / Designation", "Distance from Worli HQ", "Smoke", "Drink",
    "Resume / Portfolio Link", "Status"
  ]);
  career.getRange(1, 1, 1, 21).setFontWeight("bold").setBackground("#050505").setFontColor("#ffffff");
  career.setFrozenRows(1);
  career.setColumnWidth(20, 400);
}
