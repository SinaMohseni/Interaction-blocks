	   var height = 500;
	   var width; //  60000 / 500;	
	   var sigWidth = 350;
	   var Timescale = 40;
	   var focus1; 
	   var myCanvas;
	   var prevXposition = 0;
	   var x0,y0;
	   var sigNum = 0;
	   var soFar = 0;
	   var pieColor = ["#F15854", "#5DA5DA", "#FAA43A", "#60BD68"];
	   var legendData = ["Data Exploration Interactions","Elaborating Interactions", "Search and filter Interactions" , "Conclusion Interactions"];
       var rangeColor = d3.scaleOrdinal(d3.schemeCategory10);
       var legendNotDrawn = false;
        var source1;
		var source2;
		var array
 
	var yPos; 
	var xPos;
	const linewidth = 40; // box size
	const clearance = 1;
	var wichRow; 
	//var rowNum = new Array(300)
	var Row_fill = [];
	var Bar_position =[];
	var mycolor;
	//var color	
	var Opcty;
	var axis_end;

	var myAxis;
	var Axis_layer;
	var xScale;
	var yScale;
	
		var pieCount = 0;
	   var counter = 0;
	   var initStart = 0;
	   var startTime = 0;
	   var endTime = 0;
	   var rectX = 50;
	   var currData;
	   var coordinates;
	   var mouseX;
	   var mouseY;
	   var firstClick = false;
	   var endMouse;
	   var currRect;
	   var drawnRect;
	   var pieChart;
	   var bigPieChart;
	   var largeRect;
	   var rectangles = [];
	   var icons = [];
	   var errorText;
	   var circles = [];
	   var lines = [];
	   var allText = [];
	   var stars = [];
	   var circleCoords = [];
	   var readingCount = 0, searchCount = 0, draggingCount = 0, highlightCount = 0, mouseHoveCount = 0, connectionCount = 0, createNoteCount = 0, openDocCount = 0;
	   var elaborateCount = 0, exploreCount = 0, concludeCount = 0, findCount = 0;
	   var dataChunk = [];
	   var nodes;
	   var maxDuration = 200;
	   var mouseFirstClickPos;
	   var rectWidth = 0;
	   var colorNum = -1;

//	   var negMov = false;

	   var currFrame;
	   var manualRect = 0;
	   var connectLines = [];
		var pieLines = [];
		var autoBoxXData = [];
		var autoBoxWidthData = [];

	   var n = 50, // total number of nodes
       cluster_num = 4; // number of distinct clusters 
		
		var w = 300,                        //width
    	h = 300,                            //height
        radius = 100;
		var legendRectSize = 30;
		var legendSpacing = 3;
		var pieData = [10, 20, 100];
		
		
		// The largest node for each cluster.
		var clusters = new Array(cluster_num);

     
		//  ------------------ Drop down menues ----------------------------
	    var dropdown_1 = d3.select("#sources_dataset")   // Drop down for dataset name
		var dropdown_2 = d3.select("#json_sources")      // Drop down for participant number

		dropdown_1.on("change", function(){init(Timescale);});   // Triger drop downs on change
		dropdown_2.on("change", function(){init(Timescale);});

		//  ------------------ Slider ----------------------------
		d3.select("#Timescale").on("input", function() {
   		init(+this.value);
		});
		
		//  ------------------ Pie chart ----------------------------

		var arc = d3.arc()
		    .outerRadius(radius - 10)
		    .innerRadius(0);
		    
		var labelArc = d3.arc()
		    .outerRadius(radius - 40)
		    .innerRadius(radius - 40);
		   
		var pie = d3.pie()
		    .sort(null)
		    .value(function(d) { return d; });
      
	  function parseIt(dataSetName){
		dataSetName = dataSetName.split(' ')
		return dataSetName[1];
      }

	function iconPositions(){
		
		var	howManyIcons = dataChunk.length;
		soFar = soFar + howManyIcons;
		//console.log("How many?: ", howManyIcons)
		
		 
        nodes = d3.range(dataChunk.length).map(function(count) {
        		
        		var i = 0;
        			if (dataChunk[count].InteractionType == "Doc_open")   // Group 1: Elaboration
					{
						i=1;    
					}
					else if ((dataChunk[count].InteractionType == "Draging")  & (dataChunk[count].duration > 0.8) )   // Group 1: Elaborate
					{
						i= 1 + 0.7;      
					}			
					else if ((dataChunk[count].InteractionType == "Mouse_hover") & (dataChunk[count].duration > 0.9) )  // Group 1: Elaboration
					{
						i=2.4;   
					}			
					else if (dataChunk[count].InteractionType == "Reading")   // Group 1: Elaboration
					{
						i= 4.1;    
					}					
					else if (dataChunk[count].InteractionType == "Highlight")   // Group 2: Finding
					{
						i= 3.4;    
					}
					else if (dataChunk[count].InteractionType == "Connection")  // Group 2 : Finding
					{
						i=6.8;    	
					}
					else if (dataChunk[count].InteractionType == "Search")   // Group 3: Exploration
					{    
						i=5.1;     
					}
					else if (dataChunk[count].InteractionType == "Add note")   // Group 4 : Conclusion
					{
						i=6.1;      
					}
					else if (dataChunk[count].InteractionType == "Create Note")   // Group 4  : Conclusion
					{
						i=6.1;    
					}

					else if (dataChunk[count].InteractionType == "Topic_change")  // Group 4 no groups for you!! 
					{
						i= 0;    	
					}


			  var xPosition;

			   if ((i != 0)) {
			   		// ------------ A test to shrink the icons ---------------
			   		
				   	//if (soFar <= 20){   
				   	//xPosition = prevXposition + (40 * (20/(60 - soFar)));
				   	//}else if ((soFar >= 20) & (soFar <= 22)) {
				   	//xPosition = prevXposition + 40; 
				   	//}else{  											//console.log("so far: ", soFar)
				   	//xPosition = prevXposition + (40 * (22/soFar));
				   	//}


				   	xPosition = prevXposition + 30; 
				   	prevXposition = xPosition;
			   }
			   if (prevXposition == 0) {xPosition = 0}
				
			   de = {
					type:dataChunk[count].InteractionType,  										
			        x: (xPosition + 30)   , 
			        y: (sigNum * sigWidth) + (height + 40) + (i * 40)
			   };

			  if (i > 0) { 
			  	stars.push([de.x + 20 , de.y + 20]); 
			  	rectWidth += 1;
			  }

			  return de;
			  
			});
        

      }
      
    function dragstarted(d) {

		  d3.select(this).raise().classed("active", true);
		  stars = [];
		  prevXposition = 0;
		  currFrame.remove();
		  rectWidth = 0;
		  
		  
		  
		  icons.forEach(function(ic){
			ic.remove();
		  });
		  lines.forEach(function(l){
			l.remove();
		  });
		  allText.forEach(function(t){
			t.remove();
		  });
		  connectLines.forEach(function(cl){
			cl.remove();
		  });
		}

	function dragged(d) {
		  d3.select(this).attr("x", function(){return d3.event.x;});

		  
	}
	
	function dragended(d) {
		  d3.select(this).classed("active", false);
		  startTime = ((parseInt(d3.select(this).attr("x")) - xPos) / 1500) * 60 * axis_end;
		  
		  //x0 = xScale.invert(d3.mouse(this)[0])   
		  // parseInt(x0*axis_end) + ":" + parseInt(60*((x0*axis_end) - parseInt(x0*axis_end)   // 
		  
  		  endTime = ((((parseInt(d3.select(this).attr("x"))) - xPos)+ parseInt(d3.select(this).attr("width"))) / 1500) * 60 * axis_end;
		  initStart = startTime;
		  parseData(startTime, endTime);
		  iconPositions();
		  drawIcons();
		  drawLines();
		  
		  removePie();
		  updatePieData();
  		  drawPie(drawnRect);
  		  drawLegend();
		  //printCount();
		  
	}
	  
	function mousemove(x0, y0,focus1,axis_end) {    // What is this function aobut?
		if(firstClick){
			coordinates = [0, 0];
			// coordinates = d3.mouse(this1);
			coordinates = [x0, y0]
			mouseX = x0; //coordinates[0];
			mouseY = y0; // coordinates[1];
			endMouse = mouseX - rectX;
			
			removeBigPie();
			
			if(currRect){
				
				currRect.remove();
				if (errorText)
					errorText.remove();
			}	

			currRect = myCanvas.append("rect")
					.attr("class","currRect")
					.attr("width", endMouse*width)
					.attr("height", height/2)//300)
					.attr("x", rectX*width - 2)
					.attr("y", 50)  //.attr("y", (height/2 + 50))
					.attr("stroke", function(d) {return rangeColor(colorNum)})
					.attr("fill", function(d) {return rangeColor(colorNum)})
					//.attr("fill", "none")
					.style("fill-opacity", "0.05")
					.call(d3.drag()
				        .on("start", dragstarted)
				        .on("drag", dragged)
				        .on("end", dragended));
					
					//drawIcons();
					
					endTime = 60 * x0 * axis_end;
					// parseInt(x0*axis_end) + ":" + parseInt(60*((x0*axis_end) - parseInt(x0*axis_end)

					parseData(startTime, endTime);
					//refreshCircles(x0);
					iconPositions();
					
					
					
					drawIcons();
					
					//printCount();
					

					//drawLines();
					//}
		}

			// var x0 = xScale.invert(d3.mouse(this1)[0])
			// var y0 = yScale.invert(d3.mouse(this1)[1])
			
			
			focus1.attr("transform", "translate(" + x0*width + "," +  (height / 2 + 10) + ")");
			//x0 = xScale.invert(d3.mouse(this)[0] - xPos)
			console.log(x0)
			var x00 = x0 - 0.1666;
			if (x00 > 0){
			     focus1.select("text").text(parseInt(x00 *axis_end) + ":" + parseInt(60*((x00*axis_end) - parseInt(x00*axis_end))));   //function(){ return d3.time.format("%M x0*80");});
			}
	}

	function printCount(){

		console.log("Reading :"+readingCount);
		console.log("Searching :"+searchCount);
		console.log("Highlight :"+highlightCount);
		console.log("Mouse Hover :"+mouseHoveCount);
		console.log("Connection:"+connectionCount);
		console.log("Create Note :"+createNoteCount);
		console.log("Doc Open :"+openDocCount);
	}

	function mouseclick(x0,y0,focus1,axis_end){  
		if(manualRect < 2){
			if(firstClick){
				//endTime = (60 * (parseInt(x0*axis_end))) + (parseInt(60*((x0*axis_end) - parseInt(x0*axis_end))));
				//if (endTime > startTime){
					//parseData(startTime, endTime);
					drawnRect = currRect;
					rectangles.push(drawnRect);
					currRect = null;		
	
					//drawLargeRect();
	
					//rectX += endMouse + 10;  <-- What is this??
				
				firstClick = false;
				manualRect += 1;
				//console.log("color code: ", sigNum)
				drawLines();
				//console.log("color code: ", sigNum)
				//sigNum = sigNum + 1;
				soFar = 0;
				
				updatePieData();
  				drawPie(drawnRect);
  				drawLegend();
			}
			else{
				if (manualRect > 0){
					colorNum = colorNum + 1;
					
					myCanvas.append("rect")
						.attr("class","currRect")
						.attr("width", drawnRect.attr("width"))
						.attr("height", drawnRect.attr("height"))
						.attr("x", drawnRect.attr("x"))
						.attr("y", drawnRect.attr("y"))
						.attr("stroke", drawnRect.attr("stroke"))
						.attr("fill", drawnRect.attr("fill"))
						.style("fill-opacity", "0.05");
				
					drawnRect.remove();
				}
				
				//myCanvas.selectAll(".myFrame").attr("transform", "translate(0, "+sigWidth+")");
			//	clearRects();
				rectWidth = 0;
				
				if(currFrame)
					currFrame.attr("transform", "translate(0," + sigWidth + ")");
				
				icons.forEach(function(ic){
					ic.attr("transform", "translate(0," + sigWidth + ")");
				});
				lines.forEach(function(l){
					l.attr("transform", "translate(0," + sigWidth + ")");
				});
				allText.forEach(function(t){
					t.attr("transform", "translate(0," + sigWidth + ")");  
				});
				connectLines.forEach(function(cl){
					cl.remove();
				});
				
				icons= [];
				lines = [];
				stars = [];
				allText = [];
				prevXposition = 0;
				coordinates = [0, 0];
				//coordinates = d3.mouse(this1);
				coordinates[x0,y0];
				mouseX = x0; 
				mouseY = y0; 
				rectX = mouseX;
				mouseFirstClickPos = mouseX;
				
				startTime = 60 * x0 * axis_end;
				initStart = startTime;
				
				firstClick = true;
			}
		}
	}
   
	function mouseenter1(sd,x0,y0) {   // What is this function aobut?
  
	focus1.style("display", null);
    focus1.attr("transform", "translate(" + x0*width + "," +  (height / 2 + 10) + ")");
    focus1.select("text").text(sd);   //function(){ return d3.time.format("%M x0*80");});	
  }			

	window.Autosegmentation = function(){ 
		
		manualRect = 3;
		
	  var segmentsFile = "./Dataset_" + array[0] + "/UserInteractions/" + array[1] + "_" + source2 + "_segments.json"; // .toString()
	   var segmentation_json;
	d3.json(segmentsFile, function(error, segmentation_json) {    // reading the json file 
		if (error) {
			return console.warn(error);
		} else {
			console.log("segmentsFile is loaded: ", segmentsFile, "\n", segmentation_json);
			
		var segmentaion_rects = myCanvas.append("g").selectAll("segmentaion_rects")
			.data(segmentation_json).enter().append("rect")
					.each(function(d){
						if ((d.end - d.start) < 1800){
							console.log("remove it ----------------------")
							d3.select(this).remove();
						}					
						
					})
					.attr("class","segmentaion_rects")
					.attr("width", function(d,i){
						var width_ = (d.end - d.start)/Timescale
						if (width_ < 0){
							width_ = 0;
							console.log("didn't remove it ----------------------")
						}
						if ((d.end - d.start) > 1800)
						{
						loadBoxWidth(width_);
						}
						return width_;
						
					})
					.attr("height", height/2)   //300)
					.attr("x", function(d,i){if((d.end - d.start) > 1800){loadBoxStart(d.start/Timescale);} return (d.start/Timescale + xPos) })
					.attr("y", 20)  //.attr("y", (height/2 + 50))
					.attr("stroke", "red") // function(d) {return rangeColor(colorNum)});
					.attr("fill","red") //  function(d) {return rangeColor(colorNum)})
					.style("fill-opacity", "0.05")
					.on("click", function(){
						  dataChunk = [];
						  stars = [];
						  prevXposition = 0;
						  if(currFrame)
							currFrame.remove();
							rectWidth = 0;
						  
						  icons.forEach(function(ic){
							ic.remove();
						  });
						  lines.forEach(function(l){
							l.remove();
						  });
						  allText.forEach(function(t){
							t.remove();
						  });
						
						startTime = ((parseInt(d3.select(this).attr("x")) - xPos) / 1500) * 60 * axis_end;
						endTime = ((((parseInt(d3.select(this).attr("x"))) - xPos) + parseInt(d3.select(this).attr("width"))) / 1500) * 60 * axis_end;
						console.log(startTime);
						console.log(endTime);
						initStart = startTime;
						parseData(startTime, endTime);
						iconPositions();
						drawIcons();
						drawLines();
						
					});
		drawLegend();
		removeBigPie();
		removePie();
		drawPieLines();
		pieCount = 0;
		var multiplePies = myCanvas.append("g").selectAll("mpies")
			.data(segmentation_json).enter()
			.each(function (d,i)
			{	//console.log(i);
				if ((d.end - d.start) > 1800)
				{
					pieCount ++;
					parseData(d.start/10, d.end/10);
					updatePieData();
					
					drawMultiplePies(i, pieCount);
				}
			});

		
		
		}
	});
	
	// lets draw rectangles here :D 
	
	//tags.selectAll("tag")
	//				.data(new_json).enter().append("g").attr("class", "tag");
	

	}
	
	
	function drawPieLines()
	{
		
		
		autoBoxXData.forEach(function(d,i){
		pieLines.push(myCanvas.append("line")  
	    		.attr("class","pieLine")
			    .style("stroke", "black")  
			    .attr("x1", (autoBoxXData[i]+ (autoBoxWidthData[i]/2) + xPos) )     
			    .attr("y1", 270)     
			    .attr("x2", (i * 200)+100)     
			    .attr("y2", (height / 2) + 100))
			    
			    
			    //pieLines.push(myCanvas.append("line")  
	    		//.attr("class","pieLine")
			    //.style("stroke", "black")  
			    //.attr("x1", (autoBoxXData[i] + (autoBoxWidthData[i]) + xPos) )     //+ (autoBoxWidthData[i]/2) + xPos) )     
			    //.attr("y1", 270)     
			    //.attr("x2", (i * 200)+180)     
			    //.attr("y2", (height / 2) + 200))
			    
			    
			    
			    
		;})
		
	
		
		autoBoxWidthData = [];
		autoBoxXData = [];
	}
	
	
	function loadBoxStart(autoXStart)
	{
		//console.log("Box X: "+autoXStart);
		autoBoxXData.push(autoXStart);
	}
	
	function loadBoxWidth(autoXWidth)
	{

		//console.log("Box Width: "+autoXWidth);
		autoBoxWidthData.push(autoXWidth);
	}
	
	window.clearRects = function(){

		myCanvas.selectAll(".largeRect").remove();  
		myCanvas.selectAll(".currRect").remove();
		myCanvas.selectAll(".circles").remove(); 
		myCanvas.selectAll(".nodes").remove(); 
		myCanvas.selectAll(".link").remove(); // myFrame
		myCanvas.selectAll(".myFrame").remove(); // 
		myCanvas.selectAll(".txt").remove();
		myCanvas.selectAll(".myLine").remove();
		myCanvas.selectAll(".segmentaion_rects").remove();
		myCanvas.selectAll(".arc").remove();
		myCanvas.selectAll(".legend").remove();
		myCanvas.selectAll("line").remove();
		//pieChart.remove();
		manualRect = 0;
		sigNum = 0; //Restarts the signum so it starts from the top again
		colorNum = 0;
		legendNotDrawn = false;
		autoBoxWidthData = [];
		autoBoxXData = [];
	}
	
	Mousetrap.bind('z', function(){
		firstClick = false;
		currRect.remove();
		icons.forEach(function(ic){
			ic.remove();	
		});
		rectWidth = 0;
	});
	
	function printArray(){
		dataChunk.forEach(function(d) {
			console.log(d.InteractionType);
		});
	}

	var Star = function(id, x, y) {
    this.parent = parent;
    this.id = id;
    this.x = x || 0;
    this.y = y || 0;
	}
    // Draw Lines and rectangles 
	function drawLines(){

     // Draw a curvy thread to connect icons in time manner
     lines.push(myCanvas.append('path')
     .datum(stars)
              .attr("d", d3.line()
				   .curve(d3.curveMonotoneX)   // curveMonotoneX
                  .x(function(d) { return d[0]; })
				  .y(function(d) { return d[1]; })
               )
             .attr("class", "link")
             .style("stroke", rangeColor(colorNum) ) // "lightblue")
             .attr("stroke-width", 14));
      
      
    	sMin = Math.round(initStart / 60);
		sSecond = Math.round(startTime % 60);
		sSec = "0";
		if (sSecond > 10){
			sSec = sSecond.toString();
		}
		else{
			sSec += sSecond.toString();
		}
		
		eMin = Math.round(endTime / 60);
		eSecond = Math.round(endTime % 60);
		eSec = "0";
		if (eSecond > 10){
			eSec = eSecond.toString();
		}
		else{
			eSec += eSecond.toString();
		}
    	
      // Draw a frame for my threads
    	allText.push(myCanvas.append("text")
    		.attr("class","txt")
    		.attr("x", 25)
    		.attr("y", 570 + (sigNum * sigWidth))
    		.text(sMin + ":" + sSec));
      
      	currFrame = myCanvas.append("rect")
					.attr("class","myFrame")
					.attr("width", rectWidth * 30)                  //Making the width of the rectangle big enough for the icons to fit
					.attr("height",  sigWidth - 20 )//300)
					.attr("x", 60)
					.attr("y", 570 + (sigNum * sigWidth))  // (sigNum * 200) + (600 + 40) + (i * 40)
					.attr("fill", function(d) {return rangeColor(colorNum)})//"none");
					//.attr("opacity", ".1")
					.attr("stroke", "black")//function(d) {return rangeColor(sigNum)});
					.style("fill-opacity", "0.1")
					.on("mouseover", function(){console.log(d3.select(this).attr("class"))});
            		//.attr("opacity", ".9");
            		

		allText.push(myCanvas.append("text")
			.attr("class","txt")
    		.attr("x", (rectWidth * 30) + 60)

    		.attr("y", (570 + (sigNum * sigWidth)))
    		.text(eMin + ":" + eSec));     
    		
    	if(manualRect != 3){
	    	connectLines.push(myCanvas.append("line")  
	    		.attr("class","myLine")
			    .style("stroke", "black")  
			    .attr("x1", drawnRect.attr("x"))     
			    .attr("y1", parseInt(drawnRect.attr("y")) + parseInt(drawnRect.attr("height")))     
			    .attr("x2", currFrame.attr("x"))     
			    .attr("y2", currFrame.attr("y")));   
		    
			connectLines.push(myCanvas.append("line")     
				.attr("class","myLine")
			    .style("stroke", "black")  
			    .attr("x1", parseInt(drawnRect.attr("x")) + parseInt(drawnRect.attr("width")))     
			    .attr("y1", parseInt(drawnRect.attr("y")) + parseInt(drawnRect.attr("height")))
			    .attr("x2", parseInt(currFrame.attr("x")) + parseInt(currFrame.attr("width")))   
			    .attr("y2", currFrame.attr("y")));   
    	}
            		

//    		.attr("y", 660 + (sigNum * 200))
 //   		.text(eMin + ":" + eSec));            		
           		

		//myCanvas.selectAll(".myFrame").moveToFront();   // Move svg back, so you can mouse objects behind it! 
             
	}
	
	function drawLegend()
	{
		if(!legendNotDrawn)
		{
			legendNotDrawn = true;
		var legend = myCanvas.append("g").selectAll('.legend')
        		.data(legendData)
        		.enter()
        		.append('g')
        		.attr('class', 'legend')
		        .attr('transform', function(d, i) {
		            var lheight = legendRectSize + legendSpacing;
		            var offset =  lheight * legendData.length / 2;
		            var horz = (-3 * legendRectSize) + 1900;
		            var vert = (i * lheight - offset) + 180;
		            return 'translate(' + horz + ',' + vert + ')';
		        });

		    	legend.append('rect')
			        .attr('width', legendRectSize)
			        .attr('height', legendRectSize)
			        .style('fill', function (d,i) {return pieColor[i]})
			        .style('stroke', function (d,i) {return pieColor[i]});
		
		    	legend.append('text')
		        .attr('x', legendRectSize + legendSpacing)
		        .attr('y', legendRectSize - legendSpacing - 8)
		        .text(function(d) { return d; });
		}
	}
	
	function removePie()
	{
		console.log("called");
			if (pieChart)
			{
				console.log("removed");
				pieChart.remove();
			}
	}
	
	function removeBigPie()
	{
		console.log("called");
			if (bigPieChart)
			{
				console.log("removed");
				bigPieChart.remove();
			}
	}

	
	function drawMultiplePies(value, count)	{
			
			//console.log(value);
			
				radius = 100;
				
				arc = d3.arc()
			    .outerRadius(radius - 10)
			    .innerRadius(0);
			    
				labelArc = d3.arc()
			    .outerRadius(radius - 40)
			    .innerRadius(radius - 40);
			
				var xPosition = count * 200;
				var xWidth = radius * 2 ;
				var centerPosition = parseInt(xPosition - 100);
			
			
			pieChart = myCanvas.append("g").selectAll(".arc")
				.data(pie(pieData))
				.enter().append("g")
					.attr("class","arc")
					.attr("transform", "translate(" + centerPosition + "," + ( (height / 2) + 180)+ ")");
					
					
			pieChart.append("path")
	    		.attr("d", arc)
	    		.attr("fill", function(d,i) { return pieColor[i]; });
			
			

			pieChart.append("text")
	    		.attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
	    		.attr("dy", "0.35em")
	    		.text(function(d) {if(d.data > 0)
	    			{
	    				return d.data;
	    			}
	    			else
	    			{
	    				return "";
	    			}
	    		 });

	}
	
	
	function drawPie(rectRef)	{
			
			radius = 100;
			
			arc = d3.arc()
		    .outerRadius(radius - 10)
		    .innerRadius(0);
		    
			labelArc = d3.arc()
		    .outerRadius(radius - 40)
		    .innerRadius(radius - 40);
			
			var xPosition = parseInt(rectRef.attr("x"));
			var xWidth = parseInt(rectRef.attr("width"));
			var centerPosition = parseInt(xPosition + xWidth/2);
			
			
			pieChart = myCanvas.append("g").selectAll(".arc")
				.data(pie(pieData))
				.enter().append("g")
					.attr("class","arc")
					.attr("transform", "translate(" + centerPosition + "," + ( (height / 2) + 180)+ ")");
					
					
			pieChart.append("path")
	    		.attr("d", arc)
	    		.attr("fill", function(d,i) { return pieColor[i]; });

			pieChart.append("text")
	    		.attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
	    		.attr("dy", "0.35em")
	    		.text(function(d) { 
	    			if(d.data > 0)
	    			{
	    				return d.data;
	    			}
	    			else
	    			{
	    				return "";
	    			}
	    			});

	}
	
	function drawFirstPie()	{
			
			radius = 150;
			
			arc = d3.arc()
		    .outerRadius(radius - 10)
		    .innerRadius(0);
		    
			labelArc = d3.arc()
		    .outerRadius(radius - 40)
		    .innerRadius(radius - 40);
		   
	
			
			var xPosition = 800;
			
			bigPieChart = myCanvas.append("g").selectAll(".arc")
				.data(pie(pieData))
				.enter().append("g")
					.attr("class","arc")
					.attr("transform", "translate(" + xPosition + "," + ( (height / 2)+ 300)+ ")");
					
					
			bigPieChart.append("path")
	    		.attr("d", arc)
	    		.attr("fill", function(d,i) { return pieColor[i]; });

			bigPieChart.append("text")
	    		.attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
	    		.attr("dy", "0.35em")
	    		.text(function(d) { return d.data; });

	}

	function drawIcons(){

		//circles.push(myCanvas.selectAll("nodes")
		icons.push(myCanvas.append("g").selectAll(".nodes")
				.data(nodes)
				.enter().append('image')
      			.attr("class", "nodes")
				.each(function(d){  
					if (d.type == "Topic_change"){   // || d.type == "Add note" || d.type =="Highlight"  || d.type =="Doc_open"  || d.type =="Search" ) {
							d3.select(this).remove();    // 
						}
				})
				.attr('xlink:href',function(d){return "./styles/"+ d.type + ".svg";}) 
      			.attr("x", function (d) {  return d.x; })
                .attr("y", function (d) {  return d.y; })
                .attr('height', '30')
				.attr('width', '30')
				);
				
				
				
		icons.push(myCanvas.append("g").selectAll(".nodes")
				.data(nodes)
				.enter().append('rect')
      			.attr("class", "nodes")
				.each(function(d){  
					if (1){//d.type != "Topic_change"){   // || d.type == "Add note" || d.type =="Highlight"  || d.type =="Doc_open"  || d.type =="Search" ) {
							d3.select(this).remove();    // 
						}
				})
				.attr("width", 2)
				.attr("height", sigWidth - 50)
				.attr("x", function (d) {  return d.x; })
            	.attr("y", function (d) {  return d.y; })
				.attr("stroke", "red")
				.attr("fill", "red")
				);
			
				
	//	rectWidth += dataChunk.length;
		dataChunk = [];

	}

	function randomcolor(){
	return "#" + Math.random().toString(16).slice(2, 8) + "";
}
	// Move d to be adjacent to the cluster node.
	
	function cluster(alpha) {
  return function(d) {
    var cluster = clusters[d.cluster];
    if (cluster === d) return;
    var x = d.x - cluster.x,
        y = d.y - cluster.y,
        l = Math.sqrt(x * x + y * y),
        r = d.radius + cluster.radius;
    if (l != r) {
      l = (l - r) / l * alpha;
      d.x -= x *= l;
      d.y -= y *= l;
      cluster.x += x;
      cluster.y += y;
    }
  };
}
			
	function drawLargeRect(){
	//This should only happen once, and the next time we come to this function it should draw the new data
		largeRect = myCanvas.append("rect")
			.attr("class", "largeRect")
			.attr("width", width/2)
			.attr("height", width/2)
			.attr("x", 50)
			.attr("y", 1500)
			.attr("stroke", "green")
			.attr("fill", "none");
	}
	
	function updatePieData()
	{
		//console.log("pie data updated");
		pieData = [];
		pieData.push(elaborateCount);
		pieData.push(exploreCount);
		pieData.push(findCount);
		pieData.push(concludeCount);
		
		//console.log(parseInt(exploreCount) + " " + exploreCount + " " + findCount+ " " +concludeCount);
		elaborateCount = exploreCount = findCount = concludeCount =0;
		
		
	}

	function parseData(t1, t2){   // t1 start time, t2 end tine
			//console.log(t1 +"," + t2);
			//console.log("parsed data");
			
			currData.forEach(function(d) {
				if ( ((d.time/10) < t2) && ((d.time/10) > t1) ){  // 
					
					dataChunk.push(d);
					//console.log(d)
					if (d.InteractionType == "Reading" || d.InteractionType == "Draging" || d.InteractionType == "Mouse_hover" )
					{
						elaborateCount ++;
					}
					if (d.InteractionType == "Highlight" || d.InteractionType == "Connection")
					{
						
						findCount ++;
					}
					if (d.InteractionType == "Search")
					{
						exploreCount++;
					}

					if (d.InteractionType == "Create Note" || d.InteractionType == "Add note")
					{
						
						concludeCount++;
					}
				
				}
				
			});
			startTime = endTime;
		}
		
	function parseWholeDataset(comData)
	{
		comData.forEach(function(d) {
			  // 
					
					
					//console.log(d.InteractionType);
					if (d.InteractionType == "Reading" || d.InteractionType == "Draging" || d.InteractionType == "Mouse_hover" )
					{
						elaborateCount ++;
					}
					if (d.InteractionType == "Highlight" || d.InteractionType == "Connection")
					{
						
						findCount ++;
					}
					if (d.InteractionType == "Search")
					{
						exploreCount ++;
					}

					if (d.InteractionType == "Create Note" || d.InteractionType == "Add note")
					{
						
						concludeCount ++;
					}
		});
				
				
	}

	   init(Timescale)                	  // Start the game! 
	
    function init(Timescale) {

	  	
		d3.select("svg").remove();    // clrea everything 
		d3.select("svg").remove();
		d3.select("svg").remove(); 
		
	  	source1= dropdown_1.node().options[dropdown_1.node().selectedIndex].value;
		source2 = dropdown_2.node().options[dropdown_2.node().selectedIndex].value;
		array = JSON.parse("[" + source1 + "]");
        
	 jsonfile = "./Dataset_" + array[0] + "/UserInteractions/" + array[1] + "_" + source2 + "_InteractionsLogs.json"; // .toString()
     // console.log(jsonfile)
	  
	d3.json(jsonfile, function(error, json) {
		if (error) {
			return console.warn(error);
		} else {
			currData = json;
			parseWholeDataset(currData);
			drawLegend();
			updatePieData();
			drawFirstPie();
			console.log("JSON 1 loaded");
		}
	});
	
	
	width = 60000 / Timescale;	
	
	 yPos = height / 2 ;
	
	 xPos = 250;
	// linewidth = 40; // box size
	 //clearance = 1;
	 wichRow = 1;
	 var rowNum = new Array(300)
	 Row_fill = [];
	 Bar_position =[];
	Row_fill[1] = 0;
	mycolor=0;

	
    
	color = d3.scaleLinear()
				.domain([0, 250, 500, 750, 10000])
				.range(["red", "yellow", "green" , "blue" , "orange"]);
				
	Opcty = d3.scaleLinear()
	Opcty = d3.scaleLinear()
				.domain([0, .25, .5, .75, 1])
				.range([0, .25, .5, .75, 1]);			
	axis_end = 100
	timeScaled = d3.scaleLinear()
							.domain([0, axis_end])
							.range([0, width]);
	

	myAxis = d3.axisBottom()
					.scale(timeScaled);
					
    //myAxis.attr("transform","translate("+xPos+",10)");
					
     
	// Canvas group  	
	myCanvas = d3.select("#chartDiv")
						.append("svg:svg")
						.attr("class","Canvas")
						.attr("width", 5 * width + 500)  // expand the canvas! 
						.attr("height", 5*height)     //  expand the canvas! 
						.append("g")
						.attr("transform","translate(10,10)");

	
    // Axis group over myCanvas
	Axis_layer = myCanvas.append("g")   // append a new group
						.attr("transform","translate(" + xPos + " ," + height / 2 + ")")  //25
						.call(myAxis);
						//MyAxis.ticks(d3.timeMinute.every(15));		

		clearRects();  // clear 
						
		
	xScale = d3.scaleLinear()
			.range([0, width]);

   yScale = d3.scaleLinear()
    .range([height, 0]);
	

	d3.json(jsonfile, function(intrct_logs){		
    
	total_intr = intrct_logs.length; 	 // myArray.length; 	
	

	
  focus1 = myCanvas.append("g")
       .data(intrct_logs)
      .attr("class", "focus1")
      .style("display", "none");

  focus1.append("circle")
      .attr("r", 4.5)
	  .attr("fill", "orange");

  focus1.append("text")
      .attr("x", 0)
	  .attr("y", 17)
      .attr("dy", ".35em")
	  .style("text-anchor","middle");

  myCanvas.append("rect")
      .attr("class", "overlay")
      .attr("width", width)
      .attr("height",height) // height - (height / 3))
	  .attr("fill", "none")
	  .attr("pointer-events","all")
      .on("mouseover", function() { focus1.style("display", null); })
      .on("mouseout", function() { focus1.style("display", "none"); })
      .on("mousemove", function(){
		   x0 = xScale.invert(d3.mouse(this)[0])
		   y0 = yScale.invert(d3.mouse(this)[1])
		   mousemove(x0,y0,focus1,axis_end)
	  })
	  .on("click",  function(){
		   x0 = xScale.invert(d3.mouse(this)[0])   // widthScaled
		   y0 = yScale.invert(d3.mouse(this)[1])
		   mouseclick(x0,y0,focus1,axis_end)
	  });
	  
	var myBar = myCanvas.selectAll("rect")          // ---- bar group over myCanvas  -----
						.data(intrct_logs)
					 	.enter()
							.append("svg:rect")
							.attr("height", linewidth)
							.attr("width", function(d,i) { return d.duration/Timescale;})
							.attr("y",function(d,i) {  
						

								if ((d.InteractionType == "Reading")){
									
									Bar_position[i] = -1*(rowNum[parseIt(d.ID)])*(linewidth + clearance);
									
								}
								else if  (d.InteractionType == "Draging"){
									if (rowNum[parseIt(d.ID)] > 0){
									Bar_position[i] = -1*(rowNum[parseIt(d.ID)])*(linewidth + clearance);
									}else{
										wichRow = 1;
									while ( Row_fill[wichRow] > (d.time / Timescale  + xPos) ){  // (d.time + xPos)
										wichRow ++;
									}
									Row_fill[wichRow] = (d.time/Timescale + xPos) + d.duration/Timescale;  							// console.log(Row_fill[wichRow]);  // console.log(i);
									Bar_position[i] = -1*(wichRow)*(linewidth + clearance);
									}
								}
								else if  (d.InteractionType == "Mouse_hover"){
									if (rowNum[parseIt(d.ID)] > 0){
									Bar_position[i] = -1*(rowNum[parseIt(d.ID)])*(linewidth + clearance);
									}else{
										
										wichRow = 1;
									while ( Row_fill[wichRow] > (d.time / Timescale  + xPos) ){  // (d.time + xPos)
										wichRow ++;
									}
									Row_fill[wichRow] = (d.time/Timescale + xPos) + d.duration/Timescale;  							// console.log(Row_fill[wichRow]);  // console.log(i);
									Bar_position[i] = -1*(wichRow)*(linewidth + clearance);
									}
									//console.log(Bar_position[i]);							
									
								}
								else if  (d.InteractionType == "Highlight"){
									if (rowNum[parseIt(d.ID)] > 0){
									Bar_position[i] = -1*(rowNum[parseIt(d.ID)])*(linewidth + clearance);
								//	console.log("hereeeeeeeeeeeeeeeeeeeee", d.ID)
									}else{
										
										wichRow = 1;
									while ( Row_fill[wichRow] > (d.time / Timescale  + xPos) ){  // (d.time + xPos)
										wichRow ++;
									}
									Row_fill[wichRow] = (d.time/Timescale + xPos) + d.duration/Timescale;  							// console.log(Row_fill[wichRow]);  // console.log(i);
									Bar_position[i] = -1*(wichRow)*(linewidth + clearance);
									}
									//console.log(Bar_position[i]);							
									
								}
								else{
									
									wichRow = 1;
									while ( Row_fill[wichRow] > (d.time / Timescale  + xPos) ){  
										wichRow ++;
									}
									if (d.InteractionType == "Doc_open"){
										rowNum[parseIt(d.ID)] = wichRow;
									}
									Row_fill[wichRow] = (d.time/Timescale + xPos) + d.duration/Timescale;  							// console.log(Row_fill[wichRow]);  // console.log(i);
									Bar_position[i] = -1*(wichRow)*(linewidth + clearance);
								}
							
							
 							return (Bar_position[i] + yPos);
							}) //   // console.log(i-total_intr/2);    //.attr("y",function(d,i) {  return ((i-total_intr/2)*(linewidth + clearance)) + yPos;}) // console.log(i-total_intr/2);
							.attr("x",  function(d) { return (d.time/Timescale + xPos); } )
							.attr("fill", function(d,i) {  
							if (d.InteractionType == "Doc_open"){
							return "purple";
							}
							else if (d.InteractionType == "Reading"){
							return "purple";
							}
							else if (d.InteractionType == "Highlight"){
							return "yellow";
							}
							else if (d.InteractionType == "Mouse_hover"){
							return "blue";
							}
							else if (d.InteractionType == "Draging"){
							return "green";
							}							
							else{
							return "blue";
							}
							})//function(d,i) { return color( (d.time)  - Bar_position[i]);})
							.style("fill-opacity",function(d,i) {  
							if (d.InteractionType == "Reading"){
							return "0.3";
							}
							else if (d.InteractionType == "Highlight"){
							return "1";
							}
							if (d.InteractionType == "Mouse_hover"){
							return "0.8";
							}
							if (d.InteractionType == "Draging"){
							return "0.9";
							}							
							else{
							return "0.2";
							}
							})
							.attr("rx", function(d) {
											if (d.InteractionType == "Reading"){
											return 0;
										}else{
											return 6;
										}})
							.attr("ry",  function(d) {
										if (d.InteractionType == "Reading"){
										return 0;
										}
										else{
										return 6;
										}})
							.style("stroke",function(d,i) {  
							if (d.InteractionType == "Doc_open"){
							return "purple";
							}
							else if (d.InteractionType == "Reading"){
							return "none";
							}
							else if (d.InteractionType == "Highlight"){
							return "yellow";
							}
							else if (d.InteractionType == "Mouse_hover"){
							return "blue";
							}
							else if (d.InteractionType == "Draging"){
							return "green";
							}			
							else{
							return "blue";
							}
							})

							.on("mouseover", function() {       //  --- On mouse over boxes
								d3.select(this)
								.attr("fill", "red")
								.style("stroke", "red")
							})
							.on("mouseout", function(d, i) {       // --- On mouse out of the boxes
							
							focus1.style("display", "none")
								d3.select(this)
									.attr("fill", function(d) {
										if (d.InteractionType == "Doc_open"){
										return "purple";
										}
										else if (d.InteractionType == "Reading"){
										return "purple";
										}
										else if (d.InteractionType == "Highlight"){
										return "yellow";
										}
										else if (d.InteractionType == "Mouse_hover"){
										return "blue";
										}
										else if (d.InteractionType == "Draging"){
										return "green";
										}							
										else{
										return "blue";
										}
									})
									.style("stroke",function(d,i) {  
							if (d.InteractionType == "Doc_open"){
							return "purple";
							}
							else if (d.InteractionType == "Reading"){
							return "none";
							}
							else if (d.InteractionType == "Highlight"){
							return "yellow";
							}
							else if (d.InteractionType == "Mouse_hover"){
							return "blue";
							}
							else if (d.InteractionType == "Draging"){
							return "green";
							}							
							else{
							return "blue";
							}
							})
							
							})
							.on("mouseover", function(d,i){
							d3.select(this)
								.attr("fill", "red")
								.style("stroke", "red")
	
	x0 = xScale.invert(d3.mouse(this)[0])
	y0 = yScale.invert(d3.mouse(this)[1])
	
	focus1.style("display", null); 
	focus1.attr("transform", "translate(" + x0*width + "," +  (height / 2 + 10) + ")");
    if (d.InteractionType == "Doc_open"){
	focus1.select("text").text("Document #" + parseIt(d.Text) + " is open");
	} else if (d.InteractionType == "Reading"){
	focus1.select("text").text("Reading Doc: " + (d.Text));
	} else if (d.InteractionType == "Search"){
	focus1.select("text").text("Searching : " + (d.Text));
	}
	else if (d.InteractionType == "Draging"){
	focus1.select("text").text("Moving Doc: " + parseIt(d.Text));
	}
	else if (d.InteractionType == "Mouse_hover"){
	focus1.select("text").text("Looking at title: #" + parseIt(d.Text));
	}
	else if (d.InteractionType == "Highlight"){
	focus1.select("text").text("Highlighting: " + (d.Text));
	}
	else if (d.InteractionType == "Create Note"){
	focus1.select("text").text("Writing notes: " + (d.Text));
	}
	else if (d.InteractionType == "Connection"){
	focus1.select("text").text("Making a connectiong: " + (d.Text));
	}
	else{
	focus1.select("text").text((d.Text));
	}
	
							});
 
 
		
    // Labels over Canvas (Text group)
 	var layer_3 = myCanvas.append("g");											
    var myLabel = layer_3.selectAll("text")   // Write the labels 
						.data(intrct_logs)
					    .enter()
							.append("text")
							.text(function(d) { 
							if (d.InteractionType == "Doc_open" )  {//if ( ( (d.duration /Timescale)> 30) & (d.InteractionType != "Reading" ) )  {
							    if ((d.duration / Timescale) > 60){
							    return "Document #" + parseIt(d.Text);//d.ID; //d.InteractionType + " " + d.ID ;
							    }
							    if ((d.duration / Timescale) > 20){
							    return "#" + parseIt(d.Text);//d.ID; //d.InteractionType + " " + d.ID ;
						        }
							}})							
							.attr("font-family",  "sans-serif")
							.attr("fill", "black")    //.style("fill", "Black")
							.style("text-anchor","middle")

							.attr("x",  function(d) { return (d.time/Timescale + xPos + (d.duration / (Timescale*2))); })
						    .style("font-size", function(d) {   fontSize  = Math.min(25, 15*((d.duration / Timescale) / this.getComputedTextLength())); return fontSize; })							
							.attr("y",function(d,i) { return (Bar_position[i]) + (yPos) + (linewidth/2);})//  + Math.max(6, fontSize/4);}) //   // console.log(i-total_intr/2);    //.attr("y",function(d,i) {  return ((i-total_intr/2)*(linewidth + clearance)) + yPos;}) // console.log(i-total_intr/2);							
							.attr("dy", ".35em");
			
	
	// --------- End of json logs readign loop
	});
   
   }
	

    //</script>