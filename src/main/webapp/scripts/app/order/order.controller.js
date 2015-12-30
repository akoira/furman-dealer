'use strict';

angular.module('furmanDealerApp').controller('OrderController', OrderController);
//angular.module('furmanDealerApp').directive('uiSelectWrap', UISelectWrapDirective);
//angular.module('furmanDealerApp').filter('type', TypeFilter)

function OrderController($scope, $q, $log, $translate, $filter, orderUtils) {

    var glueingRendersCache = new Map();

    var rowHeight = 25;
    var vm = this;
    vm.tableHeight = tableHeight;
    vm.getGlueingHtml = getGlueingHtml;
    vm.getGlueingLines = getGlueingLines;
    vm.getGlueingClass = getGlueingClass;

    vm.states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Dakota', 'North Carolina', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];

    vm.gridOptions = {
        appScopeProvider: vm,
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
            width: 150,
            //rect x='0' y='0' width=\"{{vm.getWidth(rowRenderIndex)}}\" height=\"vm.getHeight(rowRenderIndex)\" style='fill:blue;stroke:pink;stroke-width:5;fill-opacity:0.1;stroke-opacity:0.9'/>
            //<svg rect x="0" y="0" width="149" height="30" style="fill:blue;stroke:pink;stroke-width:5;fill-opacity:0.1;stroke-opacity:0.9"></svg>
            //cellTemplate: "<div class='ui-grid-cell-contents' style='text-align: center;' title=\"TOOLTIP\">{{grid.appScope.getGlueingHtml(rowRenderIndex, col)}}</div>"
            //cellTemplate: "<div class='ui-grid-cell-contents' style='text-align: center;' title=\"TOOLTIP\"><svg-rectangle lines=\"grid.appScope.getGlueingLines(rowRenderIndex, col)\"/></div>"
            cellTemplate: "<div class='ui-grid-cell-contents' style='text-align: center;' title=\"TOOLTIP\"><div class=\"{{grid.appScope.getGlueingClass(rowRenderIndex, col)}}\"></div>"
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

    function getGlueingHtml(rowRenderIndex, col) {
        $timeout(function () {
            var key = rowRenderIndex + '-' + col.uid + '-cell';
            var html = glueingRendersCache.get(key);
            var cellElem = $("[id$=-" + key + "]").children(".ui-grid-cell-contents");
            if (!html) {
                var x = 1;
                var y = 1;
                var width = cellElem.width() - 1;
                var height = cellElem.height() - 1;
                var stroke = "black";
                var strokeWidth = 1;
//        var html = sprintf("<svg><rect x='1' y='1' width='%d' height='%d' stroke-dasharray = '3,5' style=\"fill:blue;stroke: %s; stroke-width:%d;fill-opacity:0.1;stroke-opacity:0.9\"/></svg>", width, height, stroke, strokeWidth);
//        var html = "<svg>" +
//            sprintf("<line x1=\"%d\" y1=\"%d\" x2=\"%d\" y2=\"%d\" stroke-dasharray = '3,5' style=\"stroke: %s;stroke-width:1;\" />", x, y, x + width, y, stroke) + //top
//            sprintf("<line x1=\"%d\" y1=\"%d\" x2=\"%d\" y2=\"%d\" stroke-dasharray = '3,5' style=\"stroke: %s;stroke-width:1;\" />", x + width, y, x + width, y + height, stroke) + //right
//            sprintf("<line x1=\"%d\" y1=\"%d\" x2=\"%d\" y2=\"%d\" style=\"stroke: %s;stroke-width:1;\" />", x + width, y + height, x, y + height, "black") + //bottom
//            sprintf("<line x1=\"%d\" y1=\"%d\" x2=\"%d\" y2=\"%d\" style=\"stroke: %s;stroke-width:1;\" />", x, y + height, x, y, "black") + //left
//            "</svg>"

                var points = [{
                    x: x,
                    y: y
                }, {
                    x: x + width,
                    y: y
                }, {
                    x: x + width,
                    y: y + height
                }, {
                    x: x,
                    y: y + height
                }];
                var lines = [{
                    p1: points[0],
                    p2: points[1],
                    dashArray: "3,5",
                    stroke: "black"
                }, {
                    p1: points[1],
                    p2: points[2],
                    dashArray: "3,5",
                    stroke: "black"
                }, {
                    p1: points[2],
                    p2: points[3],
                    dashArray: "3,5",
                    stroke: "black"
                }, {
                    p1: points[3],
                    p2: points[0],
                    dashArray: "3,5",
                    stroke: "black"
                }];
                html = orderUtils.createSVGRectHtml(lines);
                glueingRendersCache.set(key, html);
            }
            //cellElem.html(html);
        });
    }

    function getGlueingLines(rowRenderIndex, col) {
        var cellElem = $("[id$=-" + rowRenderIndex + '-' + col.uid + '-cell' + "]").children(".ui-grid-cell-contents");
        var x = 1;
        var y = 1;
        var width = cellElem.width() - 1;
        var height = cellElem.height() - 1;
        var stroke = "black";

        var lines = [{
            x1: x,
            y1: y,
            x2: x + width,
            y2: y,
            stroke: {
                dashArray: "3,5"
            },
            style: {
                stroke: "black"
            }
        }];

        return [];
    }

    function getGlueingClass(rowRenderIndex, col) {
        return "glueing-empty-top glueing-right glueing-empty-left glueing-bottom";
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
