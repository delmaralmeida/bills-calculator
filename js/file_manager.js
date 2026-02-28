/**
 * File Manager
 * 
 * Handles the logic for loading and extracting user files
*/

console.log("File Manager loaded");

const fileInput = document.getElementById("fileInput");
const output = document.getElementById("output");

fileInput.addEventListener("change", () => {
  const file = fileInput.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (event) => {
    const text = event.target.result;

    if (!text.trim()) {
      output.textContent = "The file is empty.";
      return;
    }

    try {
      const data = JSON.parse(text);
      output.textContent = JSON.stringify(data, null, 2);
    } catch (error) {
      output.textContent = "Not a valid JSON file.";
      console.error("JSON parse error:", err);
    }
  };

  // TODO: Feed output into Storage (use for Chart.js data)
  reader.readAsText(file);
});
