require([
    "esri/Map",
    "esri/views/MapView",

    "plot/Ploter",

    'dojo/dom',
    "dojo/on",
    "dojo/domReady!"],
    function (Map, MapView,
        Ploter,
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
            ploter = new Ploter(view);

        });

        // 不能将button的事件注册在view的on中，会导致button事件类型
        on(dom.byId("btnDrawer"), 'click', (evt) => {
            ploter.active("polygon");
        });
        on(dom.byId("btnClear"), "click", (evt) => {
            ploter &&  ploter.clear();
        });
    });