"use strict";

function readDataFile(filename) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", filename, false);
    xmlHttp.send();
    return $.parseJSON(xmlHttp.responseText);
}

var enrollmentStackedBar = {
    jsonData: readDataFile("/resources/data/enrollment-stacked-bar.json"),
    getData: function () {
        var data = new google.visualization.DataTable();
        var record = [];
        var index = 0;
        var label;

        data.addColumn('string', 'Month');
        data.addColumn('number', 'Expansion States');
        data.addColumn('number', 'Non-Expansion States');
        data.addColumn('number', 'Total');
        data.addColumn({type:'number', role:'annotation'});

        var count = enrollmentStackedBar.jsonData.length;
        if (count < 3) {
            throw "Need at least 3 rows of enrollment data";
        }
        for (index = 0; index < count; index++) {
            record = enrollmentStackedBar.jsonData[index];
            label = record.long_label;
            data.addRow([label, record.enrollment_expansion, record.enrollment_non_expansion, 0, record.enrollment_total]);
        }
        return data;
    },
    display: function () {
        var options = {
            isStacked: true,
            //title : 'Total Monthly Medicaid and CHIP Enrollment',
            //legend: 'top',
            colors: ['#066792','#026666', 'black'],
            seriesType: 'bars',
			vAxis: {maxValue: 75000000},
            series: {2: {visibleInLegend: false}},
            backgroundColor: 'transparent',
            width: 700,
            height: 400
        };

       var chart = new google.visualization.ComboChart(document.getElementById('enrollment_stacked_bar'));
       var data = enrollmentStackedBar.getData();
       if (data) {
            // view is needed to display values within bars
            var view = new google.visualization.DataView(data);
            view.setColumns([0, 1,
                {
                calc: "stringify",
                sourceColumn: 1,
                type: "string",
                role: "annotation"
                },
                2,
                {
                calc: "stringify",
                sourceColumn: 2,
                type: "string",
                role: "annotation"
                },
                3,
                4
            ]);
            chart.draw(view, options);
       }
    }
};

google.charts.setOnLoadCallback(enrollmentStackedBar.display);
