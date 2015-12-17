'use strict';

angular.module('furmanDealerApp').controller('OrderController', OrderController);

function OrderController($translate) {
    var rowHeight = 30;
    var vm = this;
    vm.tableHeight = tableHeight;

    vm.gridOptions = {
        rowHeight: rowHeight,
        columnDefs: [
            {
                displayName: "#",
                name: "lineNumber",
                enableCellEdit: false,
                enableColumnMenu: false,
                enableSorting: false,
                width: 30,
                pinnedLeft: true
            }
        ],
        data: [{name: "D1"},
            {name: "D1"},
            {name: "D1"},
            {name: "D1"},
            {name: "D1"},
            {name: "D1"},
            {name: "D1"},
            {name: "D1"},
            {name: "D1"},
            {name: "D1"},
            {name: "D1"},
            {name: "D1"},
            {name: "D1"},
            {name: "D1"},
            {name: "D1"},
            {name: "D1"},
            {name: "D1"},
            {name: "D1"},
            {name: "D1"},
            {name: "D1"},
            {name: "D1"},
            {name: "D1"},
            {name: "D1"},
            {name: "D1"},
            {name: "D1"},
            {name: "D1"},
            {name: "D1"},
            {name: "D1"},
            {name: "D1"},
            {name: "D1"},
            {name: "D1"},
            {name: "D1"},
            {name: "D1"},
            {name: "D1"},
            {name: "D1"},
            {name: "D1"},
            {name: "D1"},
            {name: "D1"},
            {name: "D1"},
            {name: "D1"},
            {name: "D1"},
            {name: "D1"},
            {name: "D1"},
            {name: "D1"},
            {name: "D1"},
            {name: "D1"},
            {name: "D1"},
            {name: "D1"},
            {name: "D1"},
            {name: "D1"},
            {name: "D1"},
            {name: "D1"},
            {name: "D1"}
        ]
    };
    var columns = ["name",
        "type",
        "texture",
        "length",
        "width",
        "count",
        "rotatable",
        "glueing",
        "milling",
        "drilling",
        "groove",
        "a45",
        "cutoff"];

    columns.forEach(function (column) {
        addColumnDef(column);
    })

    function addColumnDef(fieldName) {
        var keyName = "order.columnDefs." + fieldName + ".name";
        var keyWidth = "order.columnDefs." + fieldName + ".width";
        var keyPinned = "order.columnDefs." + fieldName + ".pinned";

        $translate([keyName, keyWidth, keyPinned]).then(function (translates) {
            var columnDef = {
                displayName: translates[keyName],
                field: fieldName,
                enableCellEdit: false,
                enableColumnMenu: false,
                enableSorting: false,
                width: translates[keyWidth]
            };
            if (translates[keyPinned] == "true") {
                columnDef.pinnedLeft = true;
            }
            vm.gridOptions.columnDefs.push(columnDef);
        });
    }

    function tableHeight() {
        return {
            height: (vm.gridOptions.data.length * rowHeight + rowHeight) + "px"
        };
    }
}
