const url = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json";

const width = 800;
const height = 400;
const margin = 100;
let dataArr;

let svg = d3.select("#svgContainer");

const drawContainer = () => {
  svg.append('svg').attr("height", height + margin).attr("width", width + margin);
};

async function drawBarChart() {
  const response = await fetch(url);
  const data = await response.json();
  drawContainer();
}

drawBarChart();
