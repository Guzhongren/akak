define([
    'dojo/_base/declare',
    "dojo/_base/lang",
    "dojo/json",
    "esri/layers/GraphicsLayer",
    "esri/geometry/Point",
    "esri/geometry/Polygon",
    "esri/Graphic",
    "esri/geometry/geometryEngine",
    "./PlotTypes", "./Symbols", "./Utils"
], function (declare, lang, JSON,
    GraphicsLayer, Point, Polygon, Graphic, geometryEngine,
    PlotTypes, Symbols, Utils
) {
        return clazz = declare([], {

            _view: null, // 地图
            _plotTypeString: null, // 标绘类型【字符串】
            _graphicsLayer: null,
            _pointerDownListener: null,
            _pointerMoveListener: null,
            _doubleClickListener: null,
            _graphicsCount: 0,
            // isDraw: false,
            _isNext: true, //是否为新建图形
            _isFinished: false,
            plotType: null, // 标绘类型
            activePolygon: null, // 标绘polygon
            activePolyline: null, // 标绘polygline
            activePoints: null,// 标绘点
            constructor: function (/*View*/view) {
                this._view = view;
                this._init();
            },

            // 初始化
            _init: function () {
                let _self = this;
                _self._addGraphicLayer();
                _self._isNext = true;
            },
            /**
             * 激活绘制功能
             * @param  {PlotType} plotTypeString  线画类型
             */
            active: function (/*线画类型*/plotTypeString) {
                let _self = this;
                _self._plotTypeString = plotTypeString;
                _self._setListenerToView();

                _self.activePoints = null;
                _self.activePolygon = new Polygon({
                    spatialReference: _self._view.spatialReference
                });
            },
            /**
             * 停止编辑
             */
            deactivate: function () {
                let _self = this;
                _self.activePolygon ? _self.activePolygon = null : null;
                _self._pointerDownListener.remove();
                _self._pointerMoveListener.remove();
                _self._doubleClickListener.remove();
            },
            /**
             * 移除最后一个graphic
             */
            removeLastGraphic: function () {
                let _self = this;
                _self._graphicsLayer.graphics.length > 0 && _self._graphicsLayer.graphics.pop();
            },
            /**
             * 清除画布
             */
            clear: function () {
                let _self = this;
                _self._graphicsLayer.removeAll();
            },
            /**
             * ==============================================添加事件监听=============================================
             */
            _setListenerToView: function () {
                let _self = this;
                //绘制完成后阻止继续绘制
                this._view.on('click', (evt) => {
                    evt.stopPropagation();
                });
                _self._pointerDownListener = _self._view.on("pointer-down", (evt) => {
                    evt.stopPropagation();
                    let point = _self._createPoint(evt);
                    _self.activePoints = Utils.addVertex(point, _self.activePoints);
                    _self.reDraw(_self._plotTypeString, _self.activePoints, false);
                });
                _self._pointerMoveListener = _self._view.on("pointer-move", (evt) => {
                    if (_self.activePoints) {
                        evt.stopPropagation();
                        _self._isNext = false;
                        let point = _self._createPoint(evt);
                        _self.activePoints = Utils.updateVertex(point, _self.activePoints);
                        _self.reDraw(_self._plotTypeString, _self.activePoints, false);
                    }
                });
                _self._doubleClickListener = _self._view.on("double-click", (evt) => {
                    evt.stopPropagation();
                    _self._isNext = false;
                    let point = _self._createPoint(evt);
                    _self.activePoints = Utils.addVertex(point, _self.activePoints);
                    _self.reDraw(_self._plotTypeString, _self.activePoints, true);
                    _self.deactivate();
                    _self._isNext = true;
                });

            },
            /**
             * ==============================================添加事件监听=============================================
             */

            reDraw: function (plotType, points, isFinish) {
                let _self = this;
                // _self._isNext = false;
                // let currentGeometry = null;
                // let graphicsCount=_self._graphicsLayer.graphics.length;
                switch (plotType) {
                    case PlotTypes.CIRCLE:
                        // currentGeometry = _self.activePolygon;
                        break;
                    default:
                        _self.activePolygon && _self.activePolygon.rings.length > 0 && _self.activePolygon.removeRing(_self.activePolygon.rings.length - 1);
                        _self.activePolygon.addRing(points);
                        let graphic = new Graphic({
                            geometry: isFinish ? geometryEngine.simplify(_self.activePolygon) : _self.activePolygon,
                            symbol: isFinish ? Symbols.POLYGONACTIVE : Symbols.POLYGONDEACTIVE
                        });
                        !_self._isNext && _self.removeLastGraphic();

                        _self._graphicsLayer.graphics.add(graphic);
                        graphic = null;
                }
            },


            /**
             * 根据鼠标点击或移动创建点
             * @param  {event} evt  鼠标点
             */
            _createPoint: function (evt) {
                let _self = this;
                return _self._view.toMap(evt);
            },

            /**
             * 添加graphicsLayer
             */
            _addGraphicLayer: function (callback) {
                let _self = this;
                if (!_self._view.map.findLayerById("plotGraphisLayer")) {
                    _self._graphicsLayer = new GraphicsLayer({
                        id: "plotGraphisLayer"
                    });
                    _self._view.map.add(_self._graphicsLayer);
                } else {
                    _self._graphicsLayer = _self._view.map.findLayerById("plotGraphisLayer");
                }

                if (callback) {
                    callback();
                }
            },
            /**
             * 获取标绘类型 
             * @param  {String} poltTypeString  标绘类型
             */
            getPlotType: function (plotTypeString) {
                return new Promise((resolve, reject) => {
                    let type = null;
                    switch (plotTypeString) {
                        case PlotTypes.CIRCLE:
                            type = PlotTypes.CIRCLE;
                            break;
                        default:
                            type = PlotTypes.POLYGON;
                            break;
                    }
                    if (type) {

                        this.plotType = type;
                        resolve(type);
                    } else {
                        reject({
                            error: "未匹配到该类型的标绘，请检查类型字符串！"
                        });
                    }
                });

            }
        });
    });