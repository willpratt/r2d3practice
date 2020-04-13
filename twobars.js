// !preview r2d3 data=data.frame(formation = c('Permian','Others','Cana Woodford','Eagle Ford'),changem = c(3,-4,1,3),changey=c(150,38,36,25))
//
// r2d3: https://rstudio.github.io/r2d3
//

// Taken from https://bl.ocks.org/seasmith/10bd767bd8785929e116bae18e7356eb
margin = {top: 30, right: 10, bottom: 60, left: 10},
width = (width/ 2.25) - margin.left - margin.right,
height = (height / 1) - margin.top - margin.bottom;

var x = d3.scaleLinear()
          .range([0, width]);

var y = d3.scaleBand()
          .rangeRound([0, height])
          .padding(0.1);

var gContainer = svg.append("g")
          .attr("transform", "translate(0, 30)")
          .classed("weekly-container", true);

var g = gContainer.append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

x.domain(d3.extent(data, function(d) { return d.changem; })).nice();
y.domain(data.map(function(d) { return d.formation;}));

g.append("g")
    .attr("class", "axis axis-x")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x).ticks(6));

var tickNegative = g.append("g")
    .attr("class", "axis axis--y")
    .attr("transform", "translate(" + x(0) + ",0)")
    .call(d3.axisLeft(y))
  .selectAll(".tick")
  .filter(function(d, i) { return data[i].changem < 0; });

tickNegative.select("line")
    .attr("x2", 6);

tickNegative.select("text")
    .attr("x", 9)
    .style("text-anchor", "start");

g.selectAll(".bar")
    .data(data)
    .enter().append("rect")
      .attr("class", function(d) { return "bar bar--" + (d.changem < 0 ? "negative" : "positive"); })
      .attr("x", function(d) { return x(Math.min(0, d.changem)); })
      .attr("y", function(d) { return y(d.formation); })
      .attr("width", function(d) { return Math.abs(x(d.changem) - x(0)); })
      .attr("height", y.bandwidth());

g.selectAll(".value")
    .data(data)
    .enter().append("text")
  .attr("class", "value")
  .attr("x", function(d){
    if (d.changem < 0){
            return (x(d.changem * -1) - x(0)) > 20 ? x(d.changem) + 2 : x(d.changem) - 1;
            } else {
                return (x(d.changem) - x(0)) > 20 ? x(d.changem) - 2 : x(d.changem) + 1;
                }})
      .attr("y", function(d){ return y(d.formation); })
  .attr("dy", y.bandwidth() - 8)
  .attr("text-anchor", function(d){
          if (d.changem < 0){
              return (x(d.changem * -1) - x(0)) > 20 ? "start" : "end";
              } else {
                  return (x(d.changem) - x(0)) > 20 ? "end" : "start";
                  }})
      .style("fill", function(d){
          if (d.changem < 0){
              return (x(d.changem * -1) - x(0)) > 20 ? "#fff" : "#3a403d";
              } else {
                  return (x(d.changem) - x(0)) > 20 ? "#fff" : "#3a403d";
                  }})
      .text(function(d){ return d.changem; });


function type(d) {
  d.changem = +d.changem;
  return d;
}

var margin2 = {top: 30, right: 60, bottom: 60, left: 20},
    width2 = (+svg.attr("width") / 1.75) - margin2.left - margin2.right,
    height2 = (+svg.attr("height") / 1) - margin2.top - margin2.bottom;

var x2 = d3.scaleLinear()
          .range([0, width2]);

var y2 = d3.scaleBand()
          .rangeRound([0, height2])
          .padding(0.1);
          
var translation = "translate(" + width/2 +", 30)";

var gContainer2 = svg.append("g")
          .attr("transform", translation)
          .classed("yearly-container", true);

var g2 = gContainer2.append("g")
          .attr("transform", "translate(" + margin2.left + "," + margin2.top + ")");

x2.domain(d3.extent(data, function(d) { return d.changey; })).nice();
y2.domain(data.map(function(d) { return d.formation;}));

g2.append("g")
    .attr("class", "axis axis-x")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x2).ticks(6));

var tickNegative = g2.append("g")
    .attr("class", "axis axis--y")
    .attr("transform", "translate(" + x2(0) + ",0)")
    .call(d3.axisLeft(y2))
  .selectAll(".tick")
  .filter(function(d, i) { return data[i].changey < 0; });

tickNegative.select("line")
    .attr("x2", 6);

tickNegative.select("text")
    .attr("x", 9)
    .style("text-anchor", "start");

g2.selectAll(".bar")
    .data(data)
    .enter().append("rect")
      .attr("class", function(d) { return "bar bar--" + (d.changey < 0 ? "negative" : "positive"); })
      .attr("x", function(d) { return x2(Math.min(0, d.changey)); })
      .attr("y", function(d) { return y2(d.formation); })
      .attr("width", function(d) { return Math.abs(x2(d.changey) - x2(0)); })
      .attr("height", y2.bandwidth());


g2.selectAll(".value")
    .data(data)
    .enter().append("text")
  .attr("class", "value")
  .attr("x", function(d){
    if (d.change < 0){
            return (x2(d.changey * -1) - x2(0)) > 20 ? x2(d.changey) + 2 : x2(d.changey) - 1;
            } else {
                return (x2(d.changey) - x2(0)) > 20 ? x2(d.changey) - 2 : x2(d.changey) + 1;
                }})
      .attr("y", function(d){ return y2(d.formation); })
  .attr("dy", y2.bandwidth() - 4)
  .attr("text-anchor", function(d){
          if (d.change < 0){
              return (x2(d.changey * -1) - x2(0)) > 20 ? "start" : "end";
              } else {
                  return (x2(d.changey) - x2(0)) > 20 ? "end" : "start";
                  }})
      .style("fill", function(d){
          if (d.change < 0){
              return (x2(d.changey * -1) - x2(0)) > 20 ? "#fff" : "#3a403d";
              } else {
                  return (x2(d.changey) - x2(0)) > 20 ? "#fff" : "#3a403d";
                  }})
      .text(function(d){ return d.changey; });

function type(d) {
  d.changey = +d.changey;
  return d;
}