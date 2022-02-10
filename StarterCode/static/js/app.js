// 1. Use the D3 library to read in `samples.json`.

const url = "../../samples.json";

// Promise Pending
// const dataPromise = d3.json(url);
// console.log("Data Promise: ", dataPromise);

// Fetch the JSON data and console log it
d3.json(url).then(function(data) {
    console.log(data);
    let sortedData = data.sort((a, b) => b.samples - a.samples);
    slicedData = sortedData.slice(0, 10);
    reversedData = slicedData.reverse();
    let trace1 = {
      x: reversedData.map(object => object.sample_values), // * Use `sample_values` as the values for the bar chart.
      y: reversedData.map(object => object.otu_ids), // * Use `otu_ids` as the labels for the bar chart.
      text: reversedData.map(object => object.otu_labels), // * Use `otu_labels` as the hovertext for the chart.
      name: "OTUs",
      type: "bar",
      orientation: "h"
    };
    let traceData = [trace1];
    let layout = {
      title: "Belly Button Bacteria Strains search results",
      margin: {
        l: 100,
        r: 100,
        t: 100,
        b: 100
      }
    };
    Plotly.newPlot("plot", traceData, layout);
    d3.selectAll("#selDataset").on("change", updatePlotly);
    function updatePlotly() {
      // Use D3 to select the dropdown menu
      let dropdownMenu = d3.select("#selDataset");

  //     // Assign the value of the dropdown menu option to a variable
  //     var dataset = dropdownMenu.property("value");
    
  //     // Initialize x and y arrays
  //     var x = [];
  //     var y = [];
    
  //     if (dataset === 'dataset1') {
  //       x = [1, 2, 3, 4, 5];
  //       y = [1, 2, 4, 8, 16];
  //     }
    
  //     else if (dataset === 'dataset2') {
  //       x = [10, 20, 30, 40, 50];
  //       y = [1, 10, 100, 1000, 10000];
  //     }
    
  //     // Note the extra brackets around 'x' and 'y'
  //     Plotly.restyle("plot", "x", [x]);
  //     Plotly.restyle("plot", "y", [y]);
  //   }
    
  //   init();
  });
  function optionChanged (sample) {
    let value = dropdownMenu.property("value");
    console.log(value);
  };
// 2. Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.



// 3. Create a bubble chart that displays each sample.
// let trace2 = {
//   x: reversedData.map(object => object.sample_values), // * Use `sample_values` as the values for the bar chart.
//   y: reversedData.map(object => object.otu_ids), // * Use `otu_ids` as the labels for the bar chart.
//   text: reversedData.map(object => object.otu_labels), // * Use `otu_labels` as the hovertext for the chart.
//   mode: 'markers',
//   marker: {
//     size: [40, 60, 80, 100]
//   }
// };

// let data = [trace2];

// let layout2 = {
//   title: 'Belly Button Bacteria Strains search results by Marker Size',
//   showlegend: false,
//   height: 600,
//   width: 600
// };

// Plotly.newPlot('plot', data, layout2);
// * Use `otu_ids` for the x values.

// * Use `sample_values` for the y values.

// * Use `sample_values` for the marker size.

// * Use `otu_ids` for the marker colors.

// * Use `otu_labels` for the text values.

// 4. Display the sample metadata, i.e., an individual's demographic information.

// 5. Display each key-value pair from the metadata JSON object somewhere on the page.

// ![hw](Images/hw03.png)

// 6. Update all of the plots any time that a new sample is selected.

