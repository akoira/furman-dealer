'use strict';

angular.module('furmanDealerApp').directive('svgRectangle', SVGRectangle);

function SVGRectangle() {
    var directive = {};
    directive.restrict = 'AE';
    directive.scope = {
        lines: '=lines'
    };
    directive.templateUrl = 'scripts/app/order/SVGRectangle.html';
    return directive;
}
