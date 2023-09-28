// Initial load of the page
function init() {
  d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then(data => {
      // Populate the dropdown with sample IDs
      let dropdown = d3.select("#selDataset");
      data.names.forEach(name => {
          dropdown.append("option").text(name).property("value", name);
      });

      // Load the first sample's data
      updatePlot(data.names[0], data);
      updateBubblePlot(data.names[0], data);

      // console.log(data)
  });
}

// Function to update the plot based on sampleID
function updatePlot(sampleID, data) {
  // Filter data based on sampleID
  const sample = data.samples.filter(s => s.id === sampleID)[0];
  // console.log(sample);

  // Get the top 10 OTUs
  const otuIds = sample.otu_ids.slice(0, 10).map(otu => `OTU ${otu}`).reverse();
  const sampleValues = sample.sample_values.slice(0, 10).reverse();
  const otuLabels = sample.otu_labels.slice(0, 10).reverse();

  // Create the bar chart
  const barData = [{
      type: 'bar',
      x: sampleValues,
      y: otuIds,
      text: otuLabels,
      orientation: 'h'
  }];

  const barLayout = {
      title: "Top 10 OTUs",
      xaxis: { title: "Sample Values" },
      yaxis: { title: "OTU ID" }
  };

  Plotly.newPlot('bar', barData, barLayout);
}

// Function to update the bubble chart based on sampleID
function updateBubblePlot(sampleID, data) {
  // Filter data based on sampleID
  const sample = data.samples.filter(s => s.id === sampleID)[0];
  console.log (sample)

  const otuIds = sample.otu_ids;
  const sampleValues = sample.sample_values;
  const otuLabels = sample.otu_labels;


// Create the bubble chart data
  const bubbleData = [{
      type: 'scatter',
      mode: 'markers',
      x: otuIds,
      y: sampleValues,
      marker: {
          size: sampleValues,
          color: otuIds,
      },
      text: otuLabels,
  }];

  const bubbleLayout = {
      xaxis: { title: "OTU ID" },
      yaxis: { title: "Sample Values" }
  };

  Plotly.newPlot('bubble', bubbleData, bubbleLayout);
}
// Function to handle the dropdown menu value change
function optionChanged(newSample) {
  d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then(data => {
      updatePlot(newSample, data);
      updateBubblePlot(newSample, data);
  });
}


// Initialize the dashboard
init();
