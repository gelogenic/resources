"use strict";

// get state enrollment 
var allStatesEnrollment;
var nationalTotals;
var readDataFile;
var getEnrollmentData;
var displayEnrollmentResult;

allStatesEnrollment = readDataFile("/resources/data/enrollment-by-state.js");
nationalTotals = readDataFile("/resources/data/enrollment-national-totals.js");

//Get enrollment for the state
function getStateEnrollment(state) {
    var record = getEnrollmentData(state);
    displayEnrollmentResult(record);
}

//get state record from allStatesEnrollment array
function getEnrollmentData(state) {
    //console.log("Getting state enrollment for " + state);
    var result = -1;
    var index;
    for (index = 0; index < allStatesEnrollment.length; index++) {
        if (allStatesEnrollment[index].state === state) {
            result = index;
            break;
        }
    }
    if (result === -1) {
        //console.log("enrollment data not found for " + state);
    } else {
        return allStatesEnrollment[result];
    }
}

//display enrollment data by adding a row to the table called "enrollmentTable" defined in the HTML file
function displayEnrollmentResult(record) {
    if (record) {
        $(".enrollmentRow").remove();
        $("#enrollmentTable").append(
            "<tr class='enrollmentRow' ><td>" + record.state + " </td>" +
                "<td align=\"right\">" + (record.total_medicaid_and_chip_enrollment_current_month || "Not Available") + "</td>" +
                "<td align=\"right\">" + (record.net_change_pre_open_enrollment_to_current_month || "Not Available") + "</td>" +
                "<td align=\"right\">" + (record.percent_change_pre_open_enrollment_to_current_month || "Not Available") + "</td>" +
                "</tr>"
        );
        $("#enrollmentTable").append(
            "<tr class='enrollmentRow' ><td>National Totals </td>" +
                "<td align=\"right\">" + nationalTotals.total_enrollment + "</td>" +
                "<td align=\"right\">" + nationalTotals.net_increase + "</td>" +
                "<td align=\"right\">" + nationalTotals.percent_increase + "</td>" +
                "</tr>"
        );
    }
}

function setCurrentMonth() {
    $(".currentMonth").each(function (index, element) {
        element.innerHTML = nationalTotals.current_month;
    });
}
