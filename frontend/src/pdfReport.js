import { jsPDF } from "jspdf";

export const generatePDF = (result, formData) => {
  const doc = new jsPDF();

  doc.setFontSize(22);
  doc.text("AquaSense AI", 20, 20);

  doc.setFontSize(14);
  doc.text("Water Quality Analysis Report", 20, 30);

  doc.setFontSize(11);

  doc.text(
    `Generated: ${new Date().toLocaleString()}`,
    20,
    40
  );

  let y = 55;

  doc.setFontSize(14);
  doc.text("Input Parameters", 20, y);

  y += 10;

  Object.entries(formData).forEach(([key, value]) => {
    doc.text(`${key}: ${value}`, 20, y);
    y += 8;
  });

  y += 5;

  doc.setFontSize(14);
  doc.text("Prediction", 20, y);

  y += 10;

  doc.setFontSize(11);

  doc.text(`Status: ${result.prediction}`, 20, y);
  y += 8;

  doc.text(`Confidence: ${result.confidence}%`, 20, y);
  y += 8;

  doc.text(
    `Water Quality Score: ${result.water_quality_score}/100`,
    20,
    y
  );
  y += 8;

  doc.text(`Risk Level: ${result.risk_level}`, 20, y);
  y += 12;

  doc.setFontSize(14);
  doc.text("Recommendations", 20, y);

  y += 10;

  doc.setFontSize(11);

  result.recommendations.forEach((item) => {
    doc.text(`• ${item}`, 25, y);
    y += 8;
  });

  doc.save("AquaSense_Report.pdf");
};