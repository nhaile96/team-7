init()

function init(){
    
    //D3: Selectors 1 and 2
    var selector1 = d3.select("#selDataset1");
    var selector2 = d3.select("#selDataset2");
    
    //Selector 1 Options: ETF vs Mutual Fund
//     var option1 = d3.map({"option":['ETF','Mutual Fund']}).option.values();
    var option1 = ['ETF','Mutual Fund'];
    //Selector 2 Options: Growth, Value, Blend
    var option2 = ["Growth", "Value","Blend"];
    
    d3.json("/jsonfy/etf_top100_1.json").then((etf_top100) => {
        
        var fund_symbol = etf_top100.map(function(fund) {
            return fund.fund_symbol;
        }); 

        var investment_type = etf_top100.map(function(fund){
           return fund.investment_type; 
        });
//         const firstSymbol = fund_symbol[0];
//         const firstInvestType = investment_type[0];
        const firstOption1 = "ETF";
        const firstOption2 = "Growth";
        
        Object.values(option1).forEach(option =>{
            selector1.append("option").text(option).property("value",option); 
        });
        Object.values(option2).forEach(option =>{
                selector2.append("option").text(option).property("value",option);    
        });
        createBarChart(firstOption1,firstOption2);
    });
    
    
    
    
    
}

function createBarChart(option1,option2) {
    var fund_symbol = [];
    var fund_return_ytd = [];
    
    if(option1 == "ETF"){
        var index = [];
        d3.json("/jsonify/etf_top100_1.json").then((etf_top100) => {  
            var fund_symbol = etf_top100.map(function(fund, i){
                if(fund.investment_type == option2){
                    return fund.fund_symbol;
                }
            });
            
            var fund_return_ytd = etf_top100.map(function(fund,i){
                if(fund.investment_type == option2){
                    return fund.fund_return_ytd;
                }
            });


//                     var fund_symbol = etf_top100.map(function(fund) {
//                         return fund.fund_symbol;
//                     });
//                     var fund_return_ytd = etf_top100.map(function(fund) {                                 
//                         return fund.fund_return_ytd;
//                     });

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
//             });

        });
    }
    if(option1 == "Mutual Fund"){
        d3.json("/jsonify/mutual_funds_top100_1.json").then((etf_top100) => {  
            var fund_symbol = etf_top100.map(function(fund, i){
                if(fund.investment_type == option2){
                    return fund.fund_symbol;
                }
            });
            
            var fund_return_ytd = etf_top100.map(function(fund,i){
                if(fund.investment_type == option2){
                    return fund.fund_return_ytd;
                }
            });


//                     var fund_symbol = etf_top100.map(function(fund) {
//                         return fund.fund_symbol;
//                     });
//                     var fund_return_ytd = etf_top100.map(function(fund) {                                 
//                         return fund.fund_return_ytd;
//                     });

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
//             });

        });
    }
}
// function optionChanged(input)
// function buildInformation(input)
// function buildCharts(input)
// runApp();

function option1Changed(option1) {
    return createBarChart(option1,"Growth");  
}                         

function option2Changed(option2) {
//     var option1 = d3.select("#selDataset1").value;
//     var option1 = d3.select("selDataset1").values();
//         document.getElementById("selDataset1").values();
//     console.log(option1);
    return createBarChart("ETF",option2);
}