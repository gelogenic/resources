"use strict";

function readDataFile(filename) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", filename, false);
    xmlHttp.send();
    return $.parseJSON(xmlHttp.responseText);
}

var enrollmentChild = {
    jsonData: readDataFile("/resources/data/enrollment-growth.json"),
    getData: function () {
        var data = new google.visualization.DataTable();
        var record = [];
        var index = 0;
        var numberOfMonths = 6;

        data.addColumn('string', 'Month');
        data.addColumn('number', 'Total Medicaid Child & CHIP Enrollment');
        data.addColumn({type: 'number', role: 'annotation'});

        //get last numberOfMonths of data
        var count = enrollmentChild.jsonData.length;
        if (count < numberOfMonths) {
            throw "Need at least 12 rows of enrollment data";
        }
        var begin = count - numberOfMonths;
        //charts need data in backwards order
        for (index = count - 1; index >= begin; index--) {
            record = enrollmentChild.jsonData[index];
            data.addRow([record.year_month_label, parseInt(record.enrollment_child), parseInt(record.states_reporting)]);
        }
        return data;
    },
    display: function () {
        var options = {
            chartArea: {left: "100", top: "40", right: 270},
            legend: 'bottom',
            colors: ['#066792', '#026666', '#d17d28'],
            //vAxis: {minValue: 0},
            hAxis: {
                direction: -1,
                slantedText: true,
                slantedTextAngle: 30
            },
            width: 800,
            height: 400
        };
        var chart = new google.visualization.ColumnChart(document.getElementById('enrollment_child'));
        var data = enrollmentChild.getData();
        var view = new google.visualization.DataView(data);
        view.setColumns([0, 1, 
            {
            calc: "stringify",
            sourceColumn: 2,
            align: "bottom",
            type: "string",             
            role: "annotation"
            }
        ]);
        chart.draw(view, options);
    }
};

google.charts.setOnLoadCallback(enrollmentChild.display);