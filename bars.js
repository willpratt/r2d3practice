// !preview r2d3 data=data.frame(Expt = rep(1,20), Run=(seq(1,20)), Speed =c(850,740,900,1070,930,850,950,980,980,880,1000,980,930,650,760,810,1000,1000,960,960)), options = list(x = 'Run', y = 'Speed')
//
// r2d3: https://rstudio.github.io/r2d3
//
// Mostly copied from https://bl.ocks.org/caravinden/d04238c4c9770020ff6867ee92c7dac1
// It took me a while to understand what r2d3 was doing for me, and therefore how to port
// 'standard' d3 code into an r2d3 world, hopefully this might help others in the same boat.

// This is necessary in this setting since r2d3 by default won't pad the sides of the view so the axis won't be visible accounting for the translation below.
var margin = {
	top: 20,
	right: 30,
	bottom: 10,
	left: 20
}

globdatobj = data

width = width- margin.left - margin.right,
height = height - margin.top - margin.bottom,

g = svg.append("g")
  .attr("transform", "translate(" + 40 + "," + 10 + ")");

var parseTime = d3.timeParse("%d-%b-%y");

dummyFunc = function() {return "Hello Will"}


var x = d3.scaleBand()
	.rangeRound([0, width])
	.padding(0.1);

var y = d3.scaleLinear()
	.rangeRound([height, 0]);
	


x.domain(data.map(function (d) {
		return d[options.x];
	}));
y.domain([0, d3.max(data, function (d) {
			return Number(d[options.y]);
		})]);
		
var line = d3.line()
                .x(function(d) { return x(d[options.x]);})
                .y(function(d) { return y(d[options.y]); })


g.append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x))

g.append("g")
  .call(d3.axisLeft(y))
  .append("text")
  .attr("fill", "#000")
  .attr("transform", "rotate(-90)")
  .attr("y", 6)
  .attr("dy", "0.71em")
  .attr("text-anchor", "end")
  .text(options.y);

g.selectAll(".bar")
  .data(data)
  .enter()
  .append("rect")
  .attr("class", "bar")
  .attr("x", function (d) {
	  return x(d[options.x]);
  })
  .attr("y", function (d) {
	  return y(Number(d[options.y]));
  })
  .attr("width", x.bandwidth())
  .attr("height", function (d) {
	  return height - y(Number(d[options.y]));
  })
  .attr('fill', 'steelblue')
  .on("mouseover", function() {
      d3.select(this)
      	.attr("fill", "brown");
    })
  .on("click", function(d,i) {
    console.log([d,i])
  })
  .on("mouseout", function(d, i) {
    d3.select(this).attr("fill", function() {
        return "steelblue";
    });
  });
  
//g.append("path")
//  .datum(data)
//  .attr("class","line")
//  .attr("d", line)
//  .attr("fill", "none")
//  .attr("stroke", "red")