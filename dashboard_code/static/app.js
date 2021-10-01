// var data1;
// var data2;
// var invType;

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
    
    
    
    d3.json("../dashboard_code/etf_top100_1.json").then((etf_top100) => {
        
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
        createETForMFinfo(firstOption1,firstOption2);
    });
    
    
    
    
    
}

function createETForMFinfo(option1,option2){
    
    if(option1=="ETF"){
        var index=[];
        d3.json("../dashboard_code/etf_top100_1.json").then((etf_top100) => {  
           
            var tenYear=etf_top100;                        
            var result= tenYear.sort((a, b) => b.fund_return_10years - a.fund_return_10years);
            // console.log(result);
            var panel= d3.select("#sample-metadata");
            panel.html("");
            Object.entries(result[0]).forEach(([key, value])=>
                panel.append("h6").text(`${key}:${value}`))
        
        
        });    
    }
    if(option1=="Mutual Fund"){
        var index=[];
        d3.json("../dashboard_code/mutual_funds_top100_1.json").then((etf_top100) => {  
           
                                    
            var tenYear2= etf_top100;
            var result= tenYear2.sort((a, b) => b.fund_return_10years - a.fund_return_10years);
            // console.log(result);
            var panel= d3.select("#sample-metadata");
            panel.html("");
            Object.entries(result[0]).forEach(([key, value])=>
                panel.append("h6").text(`${key}:${value}`))
        
        
        });    
    }




}       



function createBarChart(option1,option2) {
    var fund_symbol = [];
    var fund_return_ytd = [];
    
    if(option1 == "ETF"){
        var index = [];
        d3.json("../dashboard_code/etf_top100_1.json").then((etf_top100) => {  
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
        d3.json("../dashboard_code/mutual_funds_top100_1.json").then((etf_top100) => {  
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
    createBarChart(option1,"Growth");
    createETForMFinfo(option1,"Growth"); 
}                         

function option2Changed(option2) {
//     var option1 = d3.select("#selDataset1").value;
//     var option1 = d3.select("selDataset1").values();
//         document.getElementById("selDataset1").values();
//     console.log(option1);
    createBarChart("ETF",option2);
    createETForMFinfo("ETF",option2);
}
// function option1Changed(option1){
//     createETForMFinfo(option1,"Growth");
// }
// function option2Changed(option2){
//     createETForMFinfo("ETF",option2);
// }
















 // var fund_name = etf_top100.map(function(fund, i){
            //     if(fund.investment_type == option2){
            //         return fund.fund_name;
            //     }
            // });
            // var inception_date = etf_top100.map(function(fund, i){
            //     if(fund.investment_type == option2){
            //         return fund.inception_date;
            //     }
            // });
            // var size_type = etf_top100.map(function(fund, i){
            //     if(fund.investment_type == option2){
            //         return fund.size_type;
            //     }
            // });
            // var net_asset_value = etf_top100.map(function(fund, i){
            //     if(fund.investment_type == option2){
            //         return fund.net_asset_value;
            //     }
            // });
            // var investment_type = etf_top100.map(function(fund, i){
            //     if(fund.investment_type == option2){
            //         return fund.investment_type;
            //     }
            // });