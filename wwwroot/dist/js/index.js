require([
    "esri/Map",
    "esri/views/MapView",

    "plot/plot",

 "dojo/domReady!"],
    function (Map, MapView, 
        plot
    ) {
        let map = new Map({
            basemap: "streets",
            copyright:"t"
        });

        let view = new MapView({
            container: "mapViewer",
            map: map
        });

        let plot= new plot();
    });