// Initial load of the page
function init() {
  d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then(data => {
      // Populate the dropdown with sample IDs
      const dropdown = d3.select("#selDataset");
      data.names.forEach(name => {
          dropdown.append("option").text(name).property("value", name);
      });

      // Load the first sample's data
      updatePlot(data.names[0], data);
  });
}

// Function to update the plot based on sampleID
function updatePlot(sampleID, data) {
  // Filter data based on sampleID
  const sample = data.samples.filter(s => s.id === sampleID)[0];

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

// Function to handle the dropdown menu value change
function optionChanged(newSample) {
  d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then(data => {
      updatePlot(newSample, data);
  });
}

// Initialize the dashboard
init();
