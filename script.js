const url = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json";

const width = 800;
const height = 400;
const margin = 100;
const padding = 40;

let yScale;
let xScale;
let xAxisScale;
let yAxisScale;

let svg = d3.select("svg");

const drawContainer = () => {
  svg.attr("height", height).attr("width", width);
};

const generateScale = (arr) => {
  //arr -> data array from json
  //y scale of canvas - bar size could be between 0 and to the max value in the array (domain)
  //then range is height for the canvas minus padding on 2 sides
  yScale = d3
    .scaleLinear()
    .domain([
      0,
      d3.max(arr, (item) => {
        return item[1];
      }),
    ])
    .range([0, height - padding * 2]);

  //domain from 0 to the length of array minus 1 (array starts from 0)
  xScale = d3
    .scaleLinear()
    .domain([0, arr.length - 1])
    .range([padding, width - padding]);

  //reformat the dates
  let dateArray = arr.map((item) => {
    return new Date(item[0]);
  });

  //x axis will be the listed earliest date to the latest date
  xAxisScale = d3
    .scaleTime()
    .domain([d3.min(dateArray), d3.max(dateArray)])
    .range([padding, width - padding]);

  //y axis determine by the max value of data
  yAxisScale = d3
    .scaleLinear()
    .domain([
      0,
      d3.max(arr, (item) => {
        return item[1];
      }),
    ])
    .range([height - padding, padding]);
};

const generateAxis = () => {
  //create variable to draw x, y axis depends on the axis scale calculated in former function
  let xAxis = d3.axisBottom(xAxisScale);
  let yAxis = d3.axisLeft(yAxisScale);

  //draw x, y axis and use transform attribute to adjust position
  svg
    .append("g")
    .call(xAxis)
    .attr("id", "x-axis")
    .attr("transform", "translate(0, " + (height - padding) + ")");

  svg
    .append("g")
    .call(yAxis)
    .attr("id", "y-axis")
    .attr("transform", "translate(" + padding + ", 0)");
};

async function drawBarChart() {
  const response = await fetch(url);
  const data = await response.json();
  console.log(data.data);
  drawContainer();
  generateScale(data.data);
  generateAxis();
}

drawBarChart();
