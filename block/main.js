
    var timeStep = 1 / 10 / 60;

	   var height = 500;
	   var width = 800;
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

		dropdown_1.on("change", function(){init();});   // Triger drop downs on change
		dropdown_2.on("change", function(){init();});

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

	function mousemove(x0,focus1,axis_end) {    // What is this function aobut?
	
			// var x0 = timeScaled.invert(d3.mouse(this)[0])
			// var y0 = yScale.invert(d3.mouse(this1)[1])
			
			
			focus1.attr("transform", "translate(" + timeScaled(x0) + "," +  (height + 10) + ")");
			//x0 = xScale.invert(d3.mouse(this)[0] - xPos)
			// var x00 = x0 - 0.03332;
			if (x0 > 0){
			     focus1.select("text").text(parseInt(x0) + ":" + parseInt(60*((x0) - parseInt(x0))));   //function(){ return d3.time.format("%M x0*80");});
			}
	}


			function zoomed() {
		  xz = d3.event.transform.rescaleX(timeScaled);
		  Axis_layer.call(myAxis.scale(xz));

		  myCanvas.selectAll(".doc_blocks").attr("width", function(d,i) { 
		  	if (xz(d.duration * timeStep) < 0.1){
		  		// console.log(xz(d.duration))
		  		return xz(1);
		  	}else{
		  		// console.log(xz(d.duration * timeStep))
		  		return xz(d.duration * timeStep);	
		  	}
		  	
		  })
		  myCanvas.selectAll(".doc_blocks").attr("x", function(d,i) {
			if (xz(d.time * timeStep) < 0.1){
				// console.log(xz(d.time * timeStep))
		  		return xz(1);
		  	}else{
		  		// console.log(xz(d.time * timeStep))
		  		return xz(d.time * timeStep);
		  	}		   
 			});
		}
	  zoom = d3.zoom()
					.scaleExtent([1, 4])
					.translateExtent([[0, -Infinity], [width, Infinity]])
					.on("zoom", zoomed);


	var w_size = window,
    d_size = document,
    e_size = d_size.documentElement,
    g_size = d_size.getElementsByTagName('body')[0];
	
	d3.select(window).on('resize.updatesvg', updateWindow);


	function updateWindow(){
		// var chart_x = w_size.innerWidth || e_size.clientWidth || g_size.clientWidth;
		// var chart_y = w_size.innerHeight || e_size.clientHeight || g_size.clientHeight;
	
		// d3.select(".Canvas").attr("width",chart_x*0.9);  //myCanvas
		// d3.select(".overlay").attr("width", chart_x*0.8);

		// timeScaled = d3.scaleLinear()
		// 			.domain([0, axis_end])
		// 			.range([0, chart_x*0.79]);

		// myAxis = d3.axisBottom().scale(timeScaled);
		// Axis_layer.attr("transform","translate(0," + height + ")")  //" + xPos + " 
		// 			.call(myAxis);
		
		// // console.log("here ", chart_y , d3.selectAll(".doc_blocks").attr("y"))
		// // if ( chart_y - d3.selectAll(".doc_blocks").attr("y") < 0){
		// // 	d3.selectAll(".doc_blocks").attr("transform","translate(0, "+(100 + chart_y - d3.selectAll(".doc_blocks").attr("y"))+ ")");
		// // }

	 //    d3.selectAll(".doc_blocks").attr("width", function(d,i) { return timeScaled(d.duration * timeStep)});
	 //    d3.selectAll(".doc_blocks").attr("x", function(d,i) { return timeScaled(d.time * timeStep)});
		// d3.selectAll(".text-inside").attr("x",  function(d) { return (timeScaled(d.time * timeStep) + timeScaled(d.duration * timeStep)/2);})
		init();
	}

	init()                	  // Start the game! 
	// updateWindow();
	
    function init() {

	  	
		d3.select("svg").remove();   
		d3.select("myCanvas").remove();
		d3.selectAll(".doc_blocks").remove();
		d3.selectAll(".text-inside").remove();
		
	  	source1= dropdown_1.node().options[dropdown_1.node().selectedIndex].value;
		source2 = dropdown_2.node().options[dropdown_2.node().selectedIndex].value;
		array = JSON.parse("[" + source1 + "]");
        
	 jsonfile = "./block/Dataset_" + array[0] + "/UserInteractions/" + array[1] + "_" + source2 + "_InteractionsLogs.json"; // .toString()

	
	height = 0.8*(w_size.innerHeight || e_size.clientHeight || g_size.clientHeight);

	width = 1.4*(w_size.innerHeight || e_size.clientHeight || g_size.clientHeight);
	console.log(width)
	
	 yPos = height;
	
	 xPos = 50;

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
					.range([0, width*0.9]);
	

	myAxis = d3.axisBottom().scale(timeScaled);
					
    //myAxis.attr("transform","translate("+xPos+",10)");
	
					
	

	// Canvas group  	
	myCanvas = d3.select("#chartDiv")
						.append("svg:svg")
						.attr("class","Canvas")
						.attr("width", width)  // expand the canvas! 
						.attr("height", 1.2*height)     //  expand the canvas! 
						.append("g")
						.attr("transform","translate(10,10)");
						// .call(zoom);
    // Axis group over myCanvas
	Axis_layer = myCanvas.append("g")   // append a new group
						.attr("transform","translate(0," + height + ")")  //" + xPos + " 
						.call(myAxis);
		

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


  overlay = myCanvas.append("rect")
      .attr("class", "overlay")
      .attr("width", 0.9*width)
      .attr("height",1.2*height) // height - (height / 3))
	  .attr("fill", "none")
	  .attr("pointer-events","all")
      .on("mouseover", function() { focus1.style("display", null); })
      .on("mouseout", function() { focus1.style("display", "none"); })
      .on("mousemove", function(){
		   x0 = timeScaled.invert(d3.mouse(this)[0])
		   mousemove(x0,focus1,axis_end)
	  });
	  



	  
	var myBar = myCanvas.selectAll("doc_blocks")          // ---- bar group over myCanvas  -----
						.data(intrct_logs)
					 	.enter()
							.append("svg:rect")
							.attr("class", "doc_blocks")
							.attr("height", linewidth)
							.attr("width", function(d,i) { return timeScaled(d.duration * timeStep);})   //d.duration/Timescale;})
							.attr("x",  function(d) { return timeScaled(d.time * timeStep); } )
							.attr("y",function(d,i) {  			

								if ((d.InteractionType == "Reading")){
									
									Bar_position[i] = -1*(rowNum[parseIt(d.ID)])*(linewidth + clearance);
									
								}
								else if  (d.InteractionType == "Draging"){
									if (rowNum[parseIt(d.ID)] > 0){
									Bar_position[i] = -1*(rowNum[parseIt(d.ID)])*(linewidth + clearance);
									}else{
										wichRow = 1;
									while ( Row_fill[wichRow] > (timeScaled(d.time)) ){  // (d.time + xPos)
										wichRow ++;
									}
									Row_fill[wichRow] = (timeScaled(d.time)) + timeScaled(d.duration)
									Bar_position[i] = -1*(wichRow)*(linewidth + clearance);
									}
								}
								else if  (d.InteractionType == "Mouse_hover"){
									if (rowNum[parseIt(d.ID)] > 0){
									Bar_position[i] = -1*(rowNum[parseIt(d.ID)])*(linewidth + clearance);
									}else{
										
										wichRow = 1;
									while ( Row_fill[wichRow] > (timeScaled(d.time)) ){  // (d.time + xPos)
										wichRow ++;
									}
									Row_fill[wichRow] = (timeScaled(d.time)) + timeScaled(d.duration)
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
									while ( Row_fill[wichRow] > (timeScaled(d.time)) ){  // (d.time + xPos)
										wichRow ++;
									}
									Row_fill[wichRow] = (timeScaled(d.time)) + timeScaled(d.duration);
									Bar_position[i] = -1*(wichRow)*(linewidth + clearance);
									}
									//console.log(Bar_position[i]);							
									
								}
								else{
									
									wichRow = 1;
									while ( Row_fill[wichRow] > (timeScaled(d.time)) ){  
										wichRow ++;
									}
									if (d.InteractionType == "Doc_open"){
										rowNum[parseIt(d.ID)] = wichRow;
									}
									Row_fill[wichRow] = (timeScaled(d.time)) + timeScaled(d.duration);
									Bar_position[i] = -1*(wichRow)*(linewidth + clearance);
								}
							
							
 							return (Bar_position[i] + yPos);
							}) //   // console.log(i-total_intr/2);    //.attr("y",function(d,i) {  return ((i-total_intr/2)*(linewidth + clearance)) + yPos;}) // console.log(i-total_intr/2);
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
								.style("stroke", "red");
	
								x0 = timeScaled.invert(d3.mouse(this)[0])

								focus1.style("display", null); 
								focus1.attr("transform", "translate(" + timeScaled(x0) + "," +  (height + 10) + ")");

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
    var myLabel = layer_3.selectAll("text-inside")   // Write the labels 
						.data(intrct_logs)
					    .enter()
							.append("text")
							.text(function(d) { 
							if (d.InteractionType == "Doc_open" )  {//if ( ( (d.duration /Timescale)> 30) & (d.InteractionType != "Reading" ) )  {
							    if (timeScaled(d.duration * timeStep) > 60){
							    return "Document #" + parseIt(d.Text);//d.ID; //d.InteractionType + " " + d.ID ;
							    }
							    if (timeScaled(d.duration * timeStep) > 20){
							    return "#" + parseIt(d.Text);//d.ID; //d.InteractionType + " " + d.ID ;
						        }
							}})			
							.attr("class","text-inside")				
							.attr("font-family",  "sans-serif")
							.attr("fill", "black")    //.style("fill", "Black")
							.style("text-anchor","middle")
							.attr("x",  function(d) { return (timeScaled(d.time * timeStep) + timeScaled(d.duration * timeStep)/2);})
						    .style("font-size", function(d) {   fontSize  = Math.min(25, 15*(timeScaled(d.duration * timeStep) / this.getComputedTextLength())); return fontSize; })							
							.attr("y",function(d,i) { return (Bar_position[i]) + (yPos) + (linewidth/2);})//  + Math.max(6, fontSize/4);}) //   // console.log(i-total_intr/2);    //.attr("y",function(d,i) {  return ((i-total_intr/2)*(linewidth + clearance)) + yPos;}) // console.log(i-total_intr/2);							
							.attr("dy", ".35em");
			
	
	// --------- End of json logs readign loop
	});
   
   }
	

    //</script>