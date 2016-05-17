jQuery(document).ready(function ($) {
    // initialize DataTable #
    var tablePrice = $("#nadacdatatable").DataTable({
        "ajax": {"url": "/resources/data/pharmacy-pricing.json", "dataSrc": "aaData"},
        "columns": [
            { "data": "Type" },
            { "data": "Year" },
            { "data": "Month" },
            { "data": "Date" }
        ],
        "columnDefs": [{
            //make col 0 text a link
            "render": function (data, type, row) {
                return '<a href="' + row.Link + '"  target="_blank">' + data + '</a>';
            },
            "targets": 0
        }],
        "order": [[ 3, "desc" ]],
        "pageLength": 10,
        initComplete: function () {
            this.api().columns().every(function () {
                var column = this;
                var selectText = '<select class="dropdown"><option value="">All</option></select>';
                var select = $(selectText)
                    .appendTo($(column.footer()).empty())
                    .on('change', function () {
                        var val = $.fn.dataTable.util.escapeRegex(
                            $(this).val()
                        );
                        column
                            .search(val ? '^' + val + '$' : '', true, false)
                            .draw();
                    });
                // add values to dropdown filters   
				column.data().unique().sort().each(function (data) {
					select.append('<option value="' + data + '">' + data + '</option>');
				});
            });
            var row = $('#nadacdatatable tfoot tr');
            row.find('th').each(function () {
                $(this).css('padding', 8);
            });
            $('#nadacdatatable thead').append(row);
        }
    });
    //Filter data, just show one type of record
    tablePrice.column(0).search('NADAC').draw();

    // initialize DataTable #
    var tableComparison = $("#nadac-comparison-table").DataTable({
        "ajax": {"url": "/resources/data/pharmacy-pricing-compare.json", "dataSrc": "aaData"},
        "columns": [
            { "data": "Type" },
            { "data": "Year" },
            { "data": "Month" },
            { "data": "Date" }
        ],
        "columnDefs": [{
            //make col 0 text a link
            "render": function (data, type, row) {
                return '<a href="' + row.Link + '"  target="_blank">' + data + '</a>';
            },
            "targets": 0
        }],
        "order": [[ 3, "desc" ]],
        "pageLength": 10,
        initComplete: function () {
            this.api().columns().every(function () {
                var column = this;
                var selectText = '<select class="dropdown"><option value="">All</option></select>';
                var select = $(selectText)
                    .appendTo($(column.footer()).empty())
                    .on('change', function () {
                        var val = $.fn.dataTable.util.escapeRegex(
                            $(this).val()
                        );
                        column
                            .search(val ? '^' + val + '$' : '', true, false)
                            .draw();
                    });
                // add values to dropdown filters   
				column.data().unique().sort().each(function (data) {
					select.append('<option value="' + data + '">' + data + '</option>');
				});
            });
            var row = $('#nadac-comparison-table tfoot tr');
            row.find('th').each(function () {
                $(this).css('padding', 8);
            });
            $('#nadac-comparison-table thead').append(row);
        }
    });
	
    //Filter data, just show one type of record
    tableComparison.column(0).search('NADAC Comparison').draw();

    // initialize DataTable #
    var tableUpperLimits = $("#federal-upper-limits-table").DataTable({
        "ajax": {"url": "/resources/data/federal-upper-limits.json", "dataSrc": "aaData"},
        "columns": [
            { "data": "Type" },
            { "data": "Year" },
            { "data": "Month" },
            { "data": "Date" }
        ],
        "columnDefs": [{
            //make col 0 text a link
            "render": function (data, type, row) {
                return '<a href="' + row.Link + '"  target="_blank">' + data + '</a>';
            },
            "targets": 0
        }],
        "order": [[ 3, "desc" ]],
        "pageLength": 10,
        initComplete: function () {
            this.api().columns().every(function () {
                var column = this;
                var selectText = '<select class="dropdown"><option value="">All</option></select>';
                var select = $(selectText)
                    .appendTo($(column.footer()).empty())
                    .on('change', function () {
                        var val = $.fn.dataTable.util.escapeRegex(
                            $(this).val()
                        );
                        column
                            .search(val ? '^' + val + '$' : '', true, false)
                            .draw();
                    });
                // add values to dropdown filters   
				column.data().unique().sort().each(function (data) {
					select.append('<option value="' + data + '">' + data + '</option>');
				});
            });
            var row = $('#federal-upper-limits-table tfoot tr');
            row.find('th').each(function () {
                $(this).css('padding', 8);
            });
            $('#federal-upper-limits-table thead').append(row);
        }
    });
	
    //Filter data, just show one type of record
    tableUpperLimits.column(0).search('Federal Upper Limits').draw();
});
