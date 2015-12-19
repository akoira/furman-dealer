'use strict';

angular.module('furmanDealerApp').directive('fmSelectEditor', FMSelectEditor);


function FMSelectEditor($timeout, $document, uiGridConstants, uiGridEditConstants, uiGridEditService) {
    var directive = {
        scope: true,
        require: ['?^uiGrid', '?^uiGridRenderContainer', 'ngModel'],
        compile: function () {
            return {
                pre: function ($scope, $elm, $attrs) {

                },
                post: post
            }
        }
    };

    function onSelect($item, $model) {
        stopEdit(null);
    }

    function post($scope, $elm, $attrs, controllers) {
        directive.$scope = $scope;
        directive.$elm = $elm;
        directive.$grid = $elm.parents('.ui-grid');
        if (controllers[0]) {
            directive.uiGridCtrl = controllers[0];
        }
        if (controllers[1]) {
            directive.renderContainerCtrl = controllers[1];
        }
        if (controllers[2]) {
            directive.ngModel = controllers[2];
        }

        //remove all listeners
        $elm.on('$destroy', function () {
            $elm.off();
            $document.off('click', stopEdit);
        });

        $scope.onSelect = onSelect;

        //register listeners
        $timeout(function () {
            $document.on('click', onClick);
            directive.$elm.children().on('keydown', onKeydown);
            directive.$scope.$on('cellNav', stopEdit);
        })
    }

    function onClick(evt) {
        if ($(evt.target).closest('.ui-select-container').size() === 0 && !$(evt.target).hasClass('ui-select-choices-row-inner')) {
            evt.stopPropagation();
            stopEdit(evt);
        }
    }

    function onKeydown(evt) {
        switch (evt.keyCode) {
            case uiGridConstants.keymap.LEFT:
            case uiGridConstants.keymap.RIGHT:
            case uiGridConstants.keymap.UP:
            case uiGridConstants.keymap.DOWN:
                evt.stopPropagation();
                break;
            case uiGridConstants.keymap.ESC:
                evt.stopPropagation();
                directive.$scope.$emit(uiGridEditConstants.events.CANCEL_CELL_EDIT);
                break;
            default :
                if (directive.uiGridCtrl && directive.uiGridCtrl.grid.api.cellNav) {
                    evt.uiGridTargetRenderContainerId = directive.renderContainerCtrl.containerId;
                    if (directive.uiGridCtrl.cellNav.handleKeyDown(evt) !== null) {
                        stopEdit(evt);
                    }
                }
        }
    }

    function stopEdit(evt) {
        $timeout(function () {
            directive.$scope.$emit(uiGridEditConstants.events.END_CELL_EDIT);
        });
    }

    return directive;
}
