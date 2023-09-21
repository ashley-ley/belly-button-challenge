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

const bubbleChart = (sample) => {
        
    // Assign variables to the data points needed 
    let sample_values = sample.sample_values;
    let otu_labels = sample.otu_labels;       
    let otu_ids = sample.otu_ids;
    
    let trace2 = {
        x: otu_ids,
        y: sample_values,
        text: otu_labels,
        mode: 'markers',
        marker: {
            size: sample_values,
            color: otu_ids,
            colorscale: 'Earth'
        }
    }
    
    let layout = {
        title: "Top 10 OTU IDs Bubble Chart",
        xaxis: { title: "OTU ID" },
        yaxis: { title: "Sample Value" }
    };
    
Plotly.newPlot("bubble", [trace2], layout);
    };
    
const metaData = (subjectID) => {
        let demographicInfo = getMetadata(subjectID, data.metadata);
        let demoSelect = d3.select("#sample-metadata");
    
        demoSelect.html(
        `id: ${demographicInfo.id} <br> 
        ethnicity: ${demographicInfo.ethnicity} <br>
        gender: ${demographicInfo.gender} <br>
        age: ${demographicInfo.age} <br>
        location: ${demographicInfo.location} <br>
        bbtype: ${demographicInfo.bbtype} <br>
        wfreq: ${demographicInfo.wfreq}`
        );
    }

// function to get metadata for a subject
const getMetadata = (subjectID, metadata) => {
    return metadata.find((entry) => {
        return entry.id === parseInt(subjectID);
    });
};

const optionChanged = (subjectID) => {
    if (data !== null) {
        let sample = getSample(subjectID, data.samples);
        barChart(sample);
        bubbleChart(sample);
        metaData(subjectID);
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

// Create a horizontal bar graph with the Top 10 OTUs in one individual
    let trace1 = {
        x: otuIds,
        y: sampleValues,
        type:'bar',
        orientation:"h"
    };

    let data1 = [trace1];

    let layout = {
        title: "Top 10 OTUs"
    }
    Plotly.newPlot("bar",data1, layout);




