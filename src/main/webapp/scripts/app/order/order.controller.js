'use strict';

angular.module('furmanDealerApp').controller('OrderController', OrderController);
//angular.module('furmanDealerApp').directive('uiSelectWrap', UISelectWrapDirective);
//angular.module('furmanDealerApp').filter('type', TypeFilter)

function OrderController($scope, $q, $log, $translate, $filter) {
    var rowHeight = 25;
    var vm = this;
    vm.tableHeight = tableHeight;

    vm.states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Dakota', 'North Carolina', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];

    vm.gridOptions = {
        //rowHeight: rowHeight,
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

    vm.gridOptions.onRegisterApi = function (gridApi) {
        vm.gridApi = gridApi;
        vm.gridApi.rowEdit.on.saveRow($scope, saveRow);
    };


    function saveRow(rowEntity) {
        vm.gridApi.rowEdit.setSavePromise(rowEntity, testPromise(rowEntity));
    }

    vm.gridOptions.columnDefs = [
        {
            displayName: "#",
            name: "lineNumber",
            enableCellEdit: false,
            enableColumnMenu: false,
            enableSorting: false,
            width: 30,
            pinnedLeft: true
        },
        {
            field: "name",
            pinnedLeft: true,
            width: 150,
        },
        {
            field: "type",
            pinnedLeft: true,
            width: 150,
            editableCellTemplate: 'scripts/app/order/FMSelectEditor.html',
            editDropdownOptionsArray: [
                'ДСП 18',
                'ДСП 10',
                'ДВП 12'
            ]
        },
        {
            field: "texture",
            pinnedLeft: true,
            width: 150,
            editableCellTemplate: 'scripts/app/order/FMSelectEditor.html',
            editDropdownOptionsArray: [
                'Текстура 1',
                'Текстура 2',
                'Текстура 3'
            ]
        },
        {
            field: "length",
            width: 100,
            type: "number"
        },
        {
            field: "width",
            width: 100,
            type: "number"
        },
        {
            field: "count",
            width: 100,
            type: "number"
        },
        {
            field: "rotatable",
            width: 50,
            type: "boolean",
            cellTemplate: "<div class='ui-grid-cell-contents' style='text-align: center;' title=\"TOOLTIP\"><i class='fa' ng-class=\"{'fa-check': COL_FIELD}\"></i></div>"
        },
        {
            field: "glueing",
            width: 150
        },
        {
            field: "milling",
            width: 150
        },
        {
            field: "drilling",
            width: 150
        },
        {
            field: "groove",
            width: 150
        },
        {
            field: "a45",
            width: 150
        },
        {
            field: "cutoff",
            width: 150
        }
    ];

    vm.gridOptions.columnDefs.forEach(function (columnDef) {
        initColumnDef(columnDef);
    });

    function initColumnDef(columnDef) {
        var keyName = "order.columnDefs." + columnDef.field + ".name";

        $translate([keyName]).then(function (translates) {
            columnDef.displayName = translates[keyName];
            columnDef.enableCellEdit = true;
            columnDef.enableColumnMenu = false;
            columnDef.enableSorting = false;
        });
    }

    function tableHeight() {
        return {
            height: (vm.gridOptions.data.length * rowHeight + rowHeight) + "px"
        };
    }

    function testPromise(value) {
        var defer = $q.defer();
        $log.log(value);
        defer.resolve();
        return defer.promise;
    }
}

//function TypeFilter() {
//    var typeHash = {
//        1: 'ДСП 10',
//        2: 'ДСП 18'
//    };
//
//    return function(input) {
//        if (!input){
//            return '';
//        } else {
//            return typeHash[input];
//        }
//    };
//}

//function UISelectWrapDirective($log, $document, uiGridEditConstants) {
//    var d = {};
//
//    d.link = postLink
//    //d.compile = compile;
//
//    function postLink($scope, $elm, $attrs) {
//
//        var uiGridCtrl, renderContainerCtrl, ngModel;
//        if (controllers[0]) {
//            uiGridCtrl = controllers[0];
//        }
//        if (controllers[1]) {
//            renderContainerCtrl = controllers[1];
//        }
//        if (controllers[2]) {
//            ngModel = controllers[2];
//        }
//
//
//
//        $scope.$on(uiGridEditConstants.events.BEGIN_CELL_EDIT, function () {
//            //$($elm[0]).find('ui-select')[0].focus();
//            //$($elm[0]).find('ui-select')[0].click();
//            //$elm[0].style.width = ($elm[0].parentElement.offsetWidth - 1) + 'px';
//            $($elm[0]).on('blur', function (evt) {
//                //$scope.stopEdit(evt);
//                $log(evt);
//            });
//
//            //$($elm[0]).find('.ui-select-container')[0].on('blur', function (evt) {
//            //    $scope.stopEdit(evt);
//            //});
//        });
//
//
//        $log.log($scope);
//        $log.log($elm);
//        $log.log($attrs);
//    }
//    //function compile() {
//    //    return {
//    //        pre: function ($scope, $elm, $attrs) {
//    //
//    //        },
//    //        post: function ($scope, $elm, $attrs, controllers) {
//    //            var uiGridCtrl = controllers[0];
//    //            var renderContainerCtrl = controllers[1];
//    //
//    //            $log.log(uiGridCtrl);
//    //            $log.log(renderContainerCtrl);
//    //        }
//    //    }
//    //}
//
//    //d.link = link;
//
//    //function link($scope, $elm, $attr) {
//    //    $document.on('click', docClick);
//    //
//    //    function docClick(evt) {
//    //        if ($(evt.target).closest('.ui-select-container').size() === 0) {
//    //            $scope.$emit(uiGridEditConstants.events.END_CELL_EDIT);
//    //            $document.off('click', docClick);
//    //        }
//    //    }
//    //}
//    return d;
//}


//module.directive('uiGridEditDropdown',
//    ['uiGridConstants', 'uiGridEditConstants',
//        function (uiGridConstants, uiGridEditConstants) {
//            return {
//                require: ['?^uiGrid', '?^uiGridRenderContainer'],
//                scope: true,
//                compile: function () {
//                    return {
//                        pre: function ($scope, $elm, $attrs) {
//
//                        },
//                        post: function ($scope, $elm, $attrs, controllers) {
//                            var uiGridCtrl = controllers[0];
//                            var renderContainerCtrl = controllers[1];
//
//                            //set focus at start of edit
//                            $scope.$on(uiGridEditConstants.events.BEGIN_CELL_EDIT, function () {
//                                $elm[0].focus();
//                                $elm[0].style.width = ($elm[0].parentElement.offsetWidth - 1) + 'px';
//                                $elm.on('blur', function (evt) {
//                                    $scope.stopEdit(evt);
//                                });
//                            });
//
//
//                            $scope.stopEdit = function (evt) {
//                                // no need to validate a dropdown - invalid values shouldn't be
//                                // available in the list
//                                $scope.$emit(uiGridEditConstants.events.END_CELL_EDIT);
//                            };
//
//                            $elm.on('keydown', function (evt) {
//                                switch (evt.keyCode) {
//                                    case uiGridConstants.keymap.ESC:
//                                        evt.stopPropagation();
//                                        $scope.$emit(uiGridEditConstants.events.CANCEL_CELL_EDIT);
//                                        break;
//                                }
//                                if (uiGridCtrl && uiGridCtrl.grid.api.cellNav) {
//                                    evt.uiGridTargetRenderContainerId = renderContainerCtrl.containerId;
//                                    if (uiGridCtrl.cellNav.handleKeyDown(evt) !== null) {
//                                        $scope.stopEdit(evt);
//                                    }
//                                }
//                                else {
//                                    //handle enter and tab for editing not using cellNav
//                                    switch (evt.keyCode) {
//                                        case uiGridConstants.keymap.ENTER: // Enter (Leave Field)
//                                        case uiGridConstants.keymap.TAB:
//                                            evt.stopPropagation();
//                                            evt.preventDefault();
//                                            $scope.stopEdit(evt);
//                                            break;
//                                    }
//                                }
//                                return true;
//                            });
//                        }
//                    };
//                }
//            };
//        }]);


//$templateCache.put('ui-grid/cellEditor',
//    "<div><form name=\"inputForm\"><input type=\"INPUT_TYPE\" ng-class=\"'colt' + col.uid\" ui-grid-editor ng-model=\"MODEL_COL_FIELD\"></form></div>"
//);
