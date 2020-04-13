library(shiny)
library(r2d3)

ui <- fluidPage(
  inputPanel(
    shiny::selectInput("category", label = "Category:",
                choices = c("A","B"), selected = "A")
  ),
  d3Output("d3")
)

server <- function(input, output) {
  output$d3 <- renderD3({
    test_data <- data.frame(colour = c("red","red","blue","blue"), category = c("A","B","A","B"), number = c(1,2,3,4))
    r2d3(
      test_data[test_data$category==input$category,],
      script = "bars.js",
      options = list(x = 'colour', y = 'number')
    )
  })
}

shinyApp(ui = ui, server = server)