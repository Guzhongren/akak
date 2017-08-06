require(["esri/Map", "esri/views/MapView", "dojo/domReady!"],
    function (Map, MapView, ) {
        let map = new Map({
            basemap: "streets",
            copyright:"t"
        });

        let view = new MapView({
            container: "mapViewer",
            map: map
        });
    });