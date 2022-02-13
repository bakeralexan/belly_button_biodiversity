function chartBuild(sample) {
  // 1. Use the D3 library to read in `samples.json`.
  d3.json("../../samples.json").then(data => {
    // console.log(data);
    // 2. Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
    let samples = data.samples;
    let arrayMain = samples.filter(item => item.id == sample);
    let array1 = arrayMain[0]
    let otuIds = array1.otu_ids;
    let otuLabels = array1.otu_labels;
    let sampleValues = array1.sample_values;
    let yBar = otuIds.map(yBar => `OTU ${yBar}`);
    let barGraph = [
      {
        x: sampleValues, // * Use `sample_values` as the values for the bar chart.
        y: yBar.slice(0,10), // * Use `otu_ids` as the labels for the bar chart.
        text: otuLabels, // * Use `otu_labels` as the hovertext for the chart.
        type: "bar",
        orientation: "h"
      }
    ];

    let layoutBar = {
      title:  `Top 10 OTU IDs for ${sample}`,
      margin: {
        t:20, 
        b: 20, 
        l: 100, 
        r: 100
    }};

    Plotly.newPlot("bar", barGraph, layoutBar);

    // 3. Create a bubble chart that displays each sample.
    let bubbleChart = [
      {
        x: otuIds, //* Use `otu_ids` for the x values.
        y: sampleValues, //* Use `sample_values` for the y values.
        text: otuLabels, //* Use `otu_labels` for the text values.
        orientation: "h",
        mode: "markers",
        marker: {
          size: sampleValues, //* Use `sample_values` for the marker size.
          color: otuIds //* Use `otu_ids` for the marker colors.
        }
      }
    ];
    let layoutBubble = {
      title: `Top 10 Bacteria Strains for Sample: ${sample}`
    };
    Plotly.newPlot("bubble", bubbleChart, layoutBubble);
    // 5. Display each key-value pair from the metadata JSON object somewhere on the page.
    function init() {
        let names = data.names;
        let selector = d3.select("#selDataset");
        names.forEach(sample => {
          selector.append("option").text(sample).property("value", sample);
        });
        let sampleOne = names[0];
        chartBuild(sampleOne);
    }
  });
  // 6. Update all of the plots any time that a new sample is selected.
  function optionChanged(sampleNew) {
    chartBuild(sampleNew);
    console.log(`This is new sample: ${sampleNew}`);
  }
  init();
};

