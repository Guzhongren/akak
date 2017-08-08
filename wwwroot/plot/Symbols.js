define([
    "esri/symbols/SimpleFillSymbol",
], function (
    SimpleFillSymbol) {
        var Symbols = {};
        // 面状
        Symbols.POLYGONACTIVE = new SimpleFillSymbol({
            color: [102, 0, 255, 0.15],
            outline: {
                color: "#6600FF",
                width: 2
            }
        });
        Symbols.POLYGONDEACTIVE = new SimpleFillSymbol({
            color: [102, 0, 255, 0.45],
            outline: {
                color: "#6600FF",
                width: 2
            }
        });



        return Symbols;

    });