require([
    "esri/Map",
    "esri/views/MapView",

    "plot/Plot",

    'dojo/dom',
    "dojo/on",
    "dojo/domReady!"],
    function (Map, MapView,
        Plot,
        dom, on
    ) {
        let ploter = null;
        let map = new Map({
            basemap: "osm",
            copyright: "t",
        });

        let view = new MapView({
            container: "mapViewer",
            map: map,
            center: [106, 33],
            zoom: 10
        });

        view.on("layerview-create", () => {
            on(dom.byId("btnDrawer"), 'click', () => {
                ploter = new Plot(view, "polygon");
                ploter.beginDraw();
            });
        });
    });