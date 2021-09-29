init()

// test data loading
// d3.csv("/jsonify/etf_top100.json").then(function(data) {
//     console.log(data);
// });

// d3.csv("/jsonify/mutual_funds_top100.json").then(function(data) {
//     console.log(data); 
// });

function init(){
     
    var selector1 = d3.select("#selDataset1");
    
    d3.csv("/jsonify/etf_top100_1.json").then((etf_top100) => {
        
        var fund_symbol = etf_top100.map(function(fund) {
            return fund.fund_symbol;
        }); 
//         var fund_symbol = etf_top100.fund_symbol;
        console.log(fund_symbol);
        const firstSymbol = fund_symbol[0];
        console.log(firstSymbol);
        Object.values(fund_symbol).forEach(symbol =>{
            selector1.append("option").text(symbol).property("value",symbol); 
            createBarChart(firstSymbol);
        });
    });
    
    
}

function createBarChart() {
    d3.csv("/jsonify/etf_top100_1.json").then((etf_top100) => {  
        var fund_symbol = etf_top100.fund_symbol;
        var fund_return_ytd = etf_top100.fund_return_ytd;
        var barchartData = [{
            x: fund_return_ytd,
            y: fund_symbol,
            orientation: 'h',
            type : "bar"
        }];
        var layout = {
            height: 600,
            width: 800,
            yaxis:{
                type: 'category'
            }
        };
        Plotly.newPlot("bar",barchartData,layout)
    });
}
// function optionChanged(input)
// function buildInformation(input)
// function buildCharts(input)
// runApp();

function optionChanged(input) {
// This function runs when option box is changed. It matches input and returns metadata information.
    
    sample_metadata = d3.select("#sample-metadata").remove();
    // Use *.html("") to clear any existing metadata
    sample_metadata.html(""); 
    
    var index =0; 
    d3.json("samples.json").then((categories) => {
        
        //define categories NAMES / METADATA / SAMPLES and other vars
        var names = categories.names;
        var metadata = categories.metadata;
        var samples = categories.samples;
        const firstSample = metadata[0];
        var inputID = input;
        
        //Search for index that matches input (input is metadata.id number)
        Object.values(metadata).forEach((md,i) => {
            if(md.id == inputID){
                index = i;
            }
        });
    
    // create constant that will send buildMetadata / buildCharts functions with metadata information that matches input
    const sample = metadata[index];
    
    // runs following functions with SAMPLE metadata information
    buildMetadata(sample);
    buildCharts(sample);
    });    
}                         