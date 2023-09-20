// 
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

let data = null;

d3.json(url).then(function(json) {
    data = json;
    populateDropdown(json.metadata);
    optionChanged(data.samples[0].id);
});

const populateDropdown = (metadata) => {
    let ids = metadata.map(person => person.id);
    let dropdown = document.getElementById("selDataset");
    // Creating a task for each array
    // Populate the dropdown with test subject id numbers
    ids.forEach((id => {
        let el = document.createElement("option");
        el.textContent = id;
        el.value = id;
        dropdown.appendChild(el);
    }))
};

const optionChanged = (subjectID) => {
    if (data !== null) {
        let sample = getSample(subjectID, data.samples);
        barChart(sample);
        // bubbleChart(sample);
    };
};

const getSample = (subjectID, samples) => {
    return samples.find((sample) => {
        return sample.id === subjectID;
    });
}

const barChart = (sample) => {
    // Create variables to hold information about 
    otuIDs = sample.otu_ids.slice(0,10)
    yTicks = otuIDs.map(id => `OTU ${id}`).reverse();
    sampleValues = sample.sample_values.slice(0,10).reverse();
    otuLabels = sample.otu_labels

    // Create a horizontal bar graph with the Top 10 OTUs in one individual
    let trace1 = {
        x: sampleValues,
        y: yTicks,
        type:'bar',
        orientation:"h"
    };

    let data1 = [trace1];

    let layout = {
        title: "Top 10 OTUs"
    }
    Plotly.newPlot("bar",data1, layout)
};





