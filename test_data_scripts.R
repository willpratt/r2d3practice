library(r2d3)

test_data <- data.frame(colour = c("red","red","blue","blue"), category = c("A","B","A","B"), number = c(1,2,3,4))

bars_data <- data.frame(Expt = rep(1,20), Run=(seq(1,20)), Speed =c(850,740,900,1070,930,850,950,980,980,880,1000,980,930,650,760,810,1000,1000,960,960))

r2d3(bars_data, "bars.js", options = list(x = 'Run', y = 'Speed'))

r2d3(test_data, "bars.js", options = list(x = 'colour', y = 'number'))
