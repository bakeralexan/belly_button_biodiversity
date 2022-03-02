function init() {
  // Use the D3 library to read in `samples.json`.
  d3.json("../../samples.json").then(data => {
    // Create dropdown selection 
    let names = data.names;
    let selector = d3.select("#selDataset");
    names.forEach(sample => {
      selector.append("option").text(sample).property("value", sample);
    });
      chartBuild(sample);
      demographicBuild(sample);
      gaugeBuild(sample);
      console.log(`This is new sample: ${sample}`);
    };
  });
};
init();

function chartBuild(sample) {
  
  d3.json("../../samples.json").then(data => {
    console.log(data);
    // Create a horizontal bar chart with a dropdown menu
    // to display the top 10 OTUs found in that individual.  
    let samples = data.samples;
    let arrayChart = samples.filter(item => item.id == sample);
    let array1 = arrayChart[0]
    let otuIds = array1.otu_ids;
    let otuLabels = array1.otu_labels;
    let sampleValues = array1.sample_values;
    let yBar = otuIds.map(yBar => `OTU ${yBar}`);
    let barGraph = [
      {
        x: sampleValues.slice(0,10), // Use `sample_values` as the values for the bar chart.
        y: yBar, // Use `otu_ids` as the labels for the bar chart.
        text: otuLabels, // Use `otu_labels` as the hovertext for the chart.
        type: "bar",
        orientation: "h"
      }
    ];

    let layoutBar = {
      title:  `Top 10 OTU IDs for ${sample}`,
      margin: {
        t:35, 
        b: 35, 
        l: 100, 
        r: 100
    }};

    Plotly.newPlot("bar", barGraph, layoutBar);

    // Create a bubble chart that displays each sample.
    let bubbleChart = [
      {
        x: otuIds, //Use `otu_ids` for the x values.
        y: sampleValues, // Use `sample_values` for the y values.
        text: otuLabels, // Use `otu_labels` for the text values.
        orientation: "h",
        mode: "markers",
        marker: {
          size: sampleValues, // Use `sample_values` for the marker size.
          color: otuIds // Use `otu_ids` for the marker colors.
        }
      }
    ];
    let layoutBubble = {
      title: `Top 10 Bacteria Strains for Sample: ${sample}`
    };
    Plotly.newPlot("bubble", bubbleChart, layoutBubble);
  });
};
// Display the sample metadata, i.e., an individual's demographic information.
function demographicBuild(sample) {
  // Use the D3 library to read in `samples.json`.
  d3.json("../../samples.json").then(data => {
    let demographics = data.metadata;
    console.log(demographics);
    let arrayDemo = demographics.filter(item => item.id == sample);
    let array2 = arrayDemo[0];
    let ethnicity = `Ethnicity: ${array2.ethnicity}`;
    let gender = `Gender: ${array2.gender}`;
    let age = `Age: ${array2.age}`;
    let location = `Location: ${array2.location}`;
    let bbtype = `Belly Button Type: ${array2.bbtype}`;
    let wfreq = `Wash Frequency: ${array2.wfreq}`;
    
    let demographicList = [
      ethnicity, 
      gender,
      age, 
      location, 
      bbtype, 
      wfreq
    ];
    let demoSelector = d3.select("#sample-metadata"); // Display each key-value pair from the metadata JSON object somewhere on the page.
    demoSelector.html("");
    for(let i =0; i< demographicList.length; i++){
      demoSelector.append("p").text(demographicList[i])
    };
  });
};

function gaugeBuild(sample) {
  d3.json("../../samples.json").then(data => {
    let gaugeData = data.metadata;
    let gaugeArray = gaugeData.filter(item => item.id == sample);
    let gaugeArray1 = gaugeArray[0];
    let wash = gaugeArray1.wfreq;
    let gaugeGraph = [
      {
        type: "indicator",
        mode: "gauge", 
        value: wash,
        title: { text: "Belly Button Washes per Week", font: { size: 24 }},

        gauge: {
          axis: { range: [0, 9], tickwidth: 1, tickcolor: "black" },
          borderwidth: 2,
          bordercolor: "white",
          bar: {color: "red" },
          text: ['0-1','1-2','2-3','3-4','4-5','5-6','6-7','7-8','8-9'],
          textinfo: 'text',
          textposition: 'inside',
          steps: [
            { range: [0, 1], color: "#e6ffe6", label:"0-1" },
            { range: [1, 2], color: "#d3ffd3" },
            { range: [2, 3], color: "#bfffbf" },
            { range: [3, 4], color: "#acffac" },
            { range: [4, 5], color: "#98ff98" },
            { range: [5, 6], color: "#84ff84" },
            { range: [6, 7], color: "#71ff71" },
            { range: [7, 8], color: "#5dff5d" },
            { range: [8, 9], color: "#4aff4a", label:"8-9" }
          ]
        }
      }
    ];
    
    let layoutGauge = {
      width: 500,
      height: 400,
      margin: { t: 25, r: 25, l: 25, b: 25 }
    };
    Plotly.newPlot("gauge", gaugeGraph, layoutGauge);
  });
};

// Update all of the plots any time that a new sample is selected.
function optionChanged(sampleNew) {
  chartBuild(sampleNew);
  demographicBuild(sampleNew);
  gaugeBuild(sampleNew);
  console.log(`This is new sample: ${sampleNew}`);
};