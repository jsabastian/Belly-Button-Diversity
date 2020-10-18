
// js doesnt have a built-in initialize function

function init() {
    var selector = d3.select("#selDataset");
  
    d3.json("samples.json").then((data) => {
      console.log(data);
      var initid=data.names[0];
      buildMetadata(initid);
      buildCharts(initid);
      console.log(initid);
      var sampleNames = data.names;
      console.log(sampleNames);
      sampleNames.forEach((sample) => {
        selector
          .append("option")
          .text(sample)
          .property("value", sample);
      });
  })}
  
  init();
  function optionChanged(newSample) {
      console.log(newSample);
    buildMetadata(newSample);
    buildCharts(newSample);
  }
  function buildMetadata(sample) {
    d3.json("samples.json").then((data) => {
      var metadata = data.metadata;
      console.log(data);
      var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
      var result = resultArray[0];
      console.log(result);
      var PANEL = d3.select("#sample-metadata");
  
      PANEL.html("");
      Object.entries(result).forEach(([key, value]) => {
        PANEL.append("h6").text(`${key.toUpperCase()}:${value}`);
      })
    });
  }
   function buildCharts(sample) {
    // 2. Use d3.json to load and retrieve the samples.json file 
    d3.json("samples.json").then((data) => {
      // 3. Create a variable that holds the samples array. 
      var metadata = data.samples;
      var gaugedata=data.metadata;
      // 4. Create a variable that filters the samples for the object with the desired sample number.
      var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
      var gaugearray=gaugedata.filter(sampleObj => sampleObj.id == sample);
      var gaugeresult=gaugearray[0];
      console.log(gaugeresult);
      var wfreq=parseFloat(gaugeresult.wfreq);
      console.log(wfreq);
      
      //  5. Create a variable that holds the first sample in the array.
      var result = resultArray[0];
      console.log(result);
  
      // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
      var xlabel=result.sample_values.sort((a,b)=>b-a).slice(0,10).reverse();
      console.log(xlabel);
      var ylabel=result.otu_ids.sort((a,b)=>b-a).slice(0,10);
      console.log(ylabel);
      var xxlabel=result.otu_labels.sort((a,b)=>b-a);
      console.log(xxlabel);
  
      // 7. Create the yticks for the bar chart.
      // Hint: Get the the top 10 otu_ids and map them in descending order  
      //  so the otu_ids with the most bacteria are last. 
  
      var yticks = ylabel.map(num=> num).sort((a,b)=>a-b);
      console.log(yticks);
      var yylabels = yticks.map(num=> "OTU " + num).reverse();
        console.log(`OTU IDS: ${yylabels}`);
      /*var yyylabels=yylabels.sort((a,b)=>b-a);
      console.log(yyylabels);*/
  
      // 8. Create the trace for the bar chart. 
      //var barData = [trace];
      var trace={
        x: xlabel,
        y:yylabels,
        text:xxlabel,
        type: 'bar',
        orientation: 'h',
       
  
              };
      var layout={
        title:'<b>Top 10 Bactiria Cultures Found</b>',
             yaxis: {
          title: yylabels},
          width: 400,
      height: 400,
      plot_bgcolor: '#555',
      paper_bgcolor: '#eee'
              };
  
  
        
    
      // 9. Create the layout for the bar chart. 
      /*var barLayout = {
       
      };*/
      // 10. Use Plotly to plot the data with the layout. 
    Plotly.newPlot('bar',[trace], layout); 
    
    
  
  
    
  
      // 7. Create the yticks for the bar chart.
      // Hint: Get the the top 10 otu_ids and map them in descending order  
      //  so the otu_ids with the most bacteria are last. 
  
     
    /*var bubbleData = [bubblechart];*/
    var bubblechart={
      x: result.otu_ids,
      y: result.sample_values,
      text: result.otu_labels,
      hovertemplate:"(%{x}"+" ,"+"%{y})"+"<br><b>%{text}</b><extra></extra>",
      mode:"markers",
       marker:{
         size:result.sample_values ,
         color:result.otu_ids,
         colorscale: [[0, 'rgb(166,206,227)'], [0.25, 'rgb(31,120,180)'], [0.45, 'rgb(178,223,138)'], [0.65, 'rgb(51,160,44)'], [0.85, 'rgb(251,154,153)'], [1, 'rgb(227,26,28)']] 
          }
         /*type: "scatter"*/
            };
    var bubbleLayout={
      title:'<b>Bactiria Cultures Per Sample</b>',
          height: 600,
      width: 1100 ,
      paper_bgcolor:"#eee",
      plot_bgcolor:"#777",
        xaxis: {
        title:"<b>OTU ID</b>"}
         
           
            };
  
    // 2. Create the layout for the bubble chart.
    
    console.log(result.sample_values);
    console.log(result.otu_ids);
    console.log(result.otu_labels);
  
    // 3. Use Plotly to plot the data with the layout.
   Plotly.newPlot("bubble",[bubblechart],bubbleLayout);
  
    // 4. Create the trace for the gauge chart.
    /*var gaugeData = [trace3];*/
    var gaugeChart={ domain: { x: [0, 10], y: [0, 10] },
    value:gaugeresult.wfreq,
    title: { text: "<b> Belly Button Washing Frequency </b><br> Scrubs Per Week" },
    gauge: {
      axis: { range: [0, 10], tickwidth: 1, tickcolor: "grey"},
      bar: { color: "darkblue" },
      steps: [
        { range: [0, 2], color: "red" },
        { range: [2, 4], color: "Orange" },
        { range: [4, 6], color: "yellow" },
        { range: [6, 8], color: "green" },
        { range: [8,10], color: "darkgreen"}
      ],
      threshold: {
        value: wfreq,
        line: { color: "black", width: 4 },
        thickness: 0.75,
            },
    },
     type: "indicator",
     mode: "gauge+number"
         };
    // 5. Create the layout for the gauge chart.
    var gaugeLayout = { width: 500,
      height: 400,
       
            paper_bgcolor: "#eee",
      margin: { t: 0, b: 0 }
         };
    console.log(gaugeresult.wfreq);
   Plotly.newPlot("gauge",[gaugeChart],gaugeLayout); 
  });
  }