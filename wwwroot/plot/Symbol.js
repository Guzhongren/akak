define([
    'dojo/_base/declare',
    "esri/symbols/SimpleFillSymbol",
], function (declare, SimpleFillSymbol) {
    return clazz = declare([], {
        PolygonActiveSymbol: new SimpleFillSymbol({
            color: [102, 0, 255, 0.15],
            outline: {
                color: "#6600FF",
                width: 2
            }
        }),
        PolygonDeactiveSymbol: new SimpleFillSymbol({
            color: [102, 0, 255, 0.45],
            outline: {
                color: "#6600FF",
                width: 2
            }
        }),
        // constructor: function () {

        // },

    });

});