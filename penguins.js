
var drawPlot = function(penguins, screen, xScale, yScale)
    {
        d3.select("#plot")
            .selectAll("circle")
            .data(penguins)
            .enter()
            .append("circle")
            .attr("cx", function(penguin)
                    {
            return xScale(getFinal(penguin))
        })
            .attr("cy", function(penguin)
                    {
            return yScale(getHWmean(penguin))
        })
            .attr("r", 2)
    
            .on("mouseenter", function(penguin)
                    {
                var xPos = d3.event.pageX;
                var yPos = d3.event.pageY;
                
                    d3.select("#tooltip")
                    .classed("hidden", false)
                    .style("top", yPos+"px")
                    .style("left", xPos+"px")
                d3.select("img")
                    .attr("src", "imgs/" + penguin.picture)
        })
    }
            
var finalButton = function(penguins, screen, xScale, yScale)
    {
        console.log("click")
            d3.select("#banner")
            .on("click", function()
                {
                d3.selectAll("circle")
                .remove()
                drawPlot(penguins, screen, xScale, yScale)
                
                drawFinalBanner()
            
    
            })
    }

var drawQuizPlot = function(penguins, screen, xScale, yScale)
    {
        d3.select("#plot")
            .selectAll("circle")
            .data(penguins)
            .enter()
            .append("circle")
            .attr("cx", function(penguin)
                    {
            return xScale(getHWmean(penguin))
        })
            .attr("cy", function(penguin)
                    {
            return yScale(getQuizMean(penguin))
        })
            .attr("r", 2)
    
            .on("mouseenter", function(penguin)
                    {
                var xPos = d3.event.pageX;
                var yPos = d3.event.pageY;
                
                    d3.select("#tooltip")
                    .classed("hidden", false)
                    .style("top", yPos+"px")
                    .style("left", xPos+"px")
                d3.select("img")
                    .attr("src", "imgs/" + penguin.picture)
        })
    }

var quizButton = function(penguins, screen, xScale, yScale)
    {
        console.log("click")
            d3.select("#quizBanner")
            .on("click", function()
                {
                d3.selectAll("circle")
                .remove()
                drawQuizPlot(penguins, screen, xScale, yScale)
                
                drawQuizBanner();
                
            
                
                
    
            })
    }

var drawQuizBanner = function()
    {
        d3.selectAll("h2")
            .text("HW Mean vs Quiz Mean")
            
    }

var drawFinalBanner = function()
    {
        d3.selectAll("h2")
            .text("Final vs HW Mean")
        
    }


var initGraph = function(penguins)
    {
        var screen = {width:500, height:500}
        d3.select("#plot")
            .attr("width", screen.width)
            .attr("height", screen.height)
        var xScale = d3.scaleLinear()
            .domain([0,100])
            .range([0,screen.width]);
        var yScale = d3.scaleLinear()
            .domain([0,100])
            .range([screen.height,0])
        console.log("graph")
        
        drawPlot(penguins, screen, xScale, yScale);
        
        finalButton(penguins, screen, xScale, yScale);
        
        quizButton(penguins, screen, xScale, yScale);
        
        
        
    }





var penguinPromise = d3.json("classData.json");

    var successFCN = function(penguins)
        {
            console.log("The Data", penguins)
            getFinal(penguins[0]);
            getHWmean(penguins[0]);
            initGraph(penguins);
        }
    var failureFCN = function(penguins)
        {
            console.log("Error", penguins)
        }
    penguinPromise.then(successFCN,failureFCN);




var getFinal = function(penguin)
    {
        return penguin.final[0].grade
    }


var getHWmean = function(penguin)
    {
        var getHWgrade = function(homework)
            {
                return homework.grade
            }
        var mapHW = penguin.homework.map(getHWgrade)
        return d3.mean(mapHW)
    }


var getQuizMean = function(penguin)
    {
        var getQuizGrade = function(quiz)
            {
                return quiz.grade
            }
        var mapQuiz = penguin.quizes.map(getQuizGrade)
        return d3.mean(mapQuiz)
    }

