"use strict";

//console.log("Initialize data");
//get quality measures
var allStatesQualityMeasures;
var qualityTotals;
var readDataFile;
var getQualityMeasuresData;
var displayQualityMeasures;

allStatesQualityMeasures = readDataFile("/resources/data/quality-measures.js");
qualityTotals = readDataFile("/resources/data/quality-totals.js");

//Get quality measures for the state
function getQualityMeasures(state) {
    var record = getQualityMeasuresData(state);
    displayQualityMeasures(record);
}

//get state record from allStatesQualityMeasures array
function getQualityMeasuresData(state) {
    //console.log("Getting state quality measures for " + state);
    var result = -1;
    var index;
    for (index = 0; index < allStatesQualityMeasures.length; index++) {
        if (allStatesQualityMeasures[index].state === state) {
            result = index;
            break;
        }
    }
    if (result === -1) {
        //console.log("quality measures data not found for " + state);
    } else {
        return allStatesQualityMeasures[result];
    }
}

//display quality measures data by adding a row to the table called "enrollmentTable" defined in the HTML file
function displayQualityMeasures(record) {
    if (record) {
        $(".quality_as_of_date").text(qualityTotals.as_of_date);
        $(".child_core_quality_reported").text(record.measures_reported_child);
        $(".child_core_quality_total").text(qualityTotals.child_measures);
        $(".adult_core_quality_reported").text(record.measures_reported_adult);
        $(".adult_core_quality_total").text(qualityTotals.adult_measures);
    }
}
