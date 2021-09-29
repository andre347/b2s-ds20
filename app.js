console.log("Hello from B2 School");

let viz;
const exportToPDF = document.getElementById("exportToPDF");
const exportToPowerPoint = document.getElementById("exportToPowerPoint");

// 1. Create a variable to store the dashboard url
const url =
  "https://public.tableau.com/views/LearnEmbeddedAnalytics/SalesOverviewDashboard?:language=en-US&:display_count=n&:origin=viz_share_link";
// 2. Create a list of options to send to the JS API (device, width and height of the dashboard)
const options = {
  device: "desktop",
  Category: ["Office Supplies", "Technology"],
};
// 3. Grab the container from the body of the page (vizContainer)
const vizContainer = document.getElementById("vizContainer");

// 4. Create a function that will create the viz on the page
function initViz() {
  viz = new tableau.Viz(vizContainer, url, options);
}

function exportPDF() {
  console.log("Going to export a PDF");
  viz.showExportPDFDialog();
}

function exportPowerPoint() {
  console.log("Going to export a PowerPoint");
  viz.showExportPowerPointDialog();
}

exportToPDF.addEventListener("click", exportPDF);
exportToPowerPoint.addEventListener("click", exportPowerPoint);

function getRangeValues() {
  // get the values from the input boxes
  const minValue = document.getElementById("minValue").value;
  const maxValue = document.getElementById("maxValue").value;
  // log out the values
  console.log({ minValue, maxValue });
  //  1.  get the workbook object
  const workbook = viz.getWorkbook();
  //   2. get the active sheet (dashboard, sheet, story)
  const activeSheet = workbook.getActiveSheet();
  //   3. from the dashboard, get the worksheets
  const sheets = activeSheet.getWorksheets();

  //   4. worksheet that we want to filter
  const sheetToFilter = sheets[1];
  sheetToFilter.applyRangeFilterAsync("SUM(Sales)", {
    min: minValue,
    max: maxValue,
  });
}

document.getElementById("filterButton").addEventListener("click", function () {
  getRangeValues();
});

document.addEventListener("DOMContentLoaded", initViz);
