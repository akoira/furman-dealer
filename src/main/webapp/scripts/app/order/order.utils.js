'use strict';

angular.module('furmanDealerApp').factory('orderUtils', OrderUtils);

function OrderUtils() {
    var factory = this;
    factory.createSVGRectHtml = createSVGRectHtml;

    function createSVGRectHtml(lines) {
        var html = "<svg>\n";
        lines.forEach(function (line) {
            html += sprintf("<line x1=\"%d\" y1=\"%d\" x2=\"%d\" y2=\"%d\" stroke-dasharray = '%s' style=\"stroke: %s;stroke-width:1;\" />\n",
                line.p1.x, line.p1.y, line.p2.x, line.p2.y, line.dashArray, line.stroke)
        });
        html += "</svg>"
        return html;
    }

    return factory
}

