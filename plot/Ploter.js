define([
    'dojo/_base/declare',
    "dojo/_base/lang",
    "dojo/json",
    "esri/layers/GraphicsLayer",
    "esri/geometry/Polygon",
    "esri/Graphic",
    "esri/geometry/geometryEngine",
    "./PlotTypes", "./Symbols"
], function (declare, lang, JSON,
    GraphicsLayer, Polygon, Graphic, geometryEngine,
    PlotTypes, Symbols,
    ) {
        return clazz = declare([], {

            _view: null, // 地图
            _plotTypeString: null, // 标绘类型【字符串】
            _graphicsLayer: null,
            _pointerDownListener: null,
            _pointerMoveListener: null,
            _doubleClickListener: null,
            // isDraw: false,
            _isFinished: false,
            plotType: null, // 标绘类型
            activePolygon: null, // 标绘polygon
            activePolyline: null, // 标绘polygline
            activePoints:null,// 标绘点
            constructor: function (/*View*/view) {
                this._view = view;
                this._init();
            },

            // 初始化
            _init: function () {
                let _self = this;
                _self._addGraphicLayer();
            },
            /**
             * 激活绘制功能
             * @param  {PlotType} plotTypeString  线画类型
             */
            active: function (/*线画类型*/plotTypeString) {
                let _self = this;
                _self._plotTypeString = plotTypeString;
                _self._setListenerToView();

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
             * 清除画布
             */
            clear: function () {
                let _self = this;
                _self._graphicsLayer.removeAll();
            },
            /**
             * 添加事件监听
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
                    _self._addVertex(point);
                });
                _self._pointerMoveListener = _self._view.on("pointer-move", (evt) => {
                    if (_self.activePolygon) {
                        evt.stopPropagation();
                        let point = _self._createPoint(event);
                        _self._updateFinalVertex(point);
                    }
                });
                _self._doubleClickListener = _self._view.on("double-click", (evt) => {
                    evt.stopPropagation();
                    _self._addVertex(evt.mapPoint, true);
                    _self.deactivate();
                });

            },


            _updateFinalVertex: function (point) {
                let _self = this;
                var polygon = _self.activePolygon.clone();
                var ringLength = polygon.rings[0].length;
                polygon.insertPoint(0, ringLength - 1, point);
                _self._redrawPolygon(polygon);
            },
            
            _redrawPolygon: function (polygon, finished) {
                let _self = this;
                // simplify the geometry so it can be drawn accross
                // the dateline and accepted as input to other services
                var geometry = finished ? geometryEngine.simplify(polygon) :
                    polygon;

                if (!geometry && finished) {
                    console.log(
                        "Cannot finish polygon. It must be a triangle at minimum. Resume drawing..."
                    );
                    return null;
                }

                _self.clear();

                var polygonGraphic = new Graphic({
                    geometry: geometry,
                    symbol: finished ? Symbols.POLYGONACTIVE : Symbols.POLYGONDEACTIVE
                });

                _self._graphicsLayer.graphics.add(polygonGraphic);
                return geometry;
            },

            _addVertex: function (point, isFinished) {
                let _self = this;
                var polygon = _self.activePolygon;
                var ringLength;

                if (!polygon) {
                    polygon = new Polygon({
                        spatialReference: _self._view.spatialReference
                    });
                    polygon.addRing([point, point]);
                } else {
                    ringLength = polygon.rings[0].length;
                    polygon.insertPoint(0, ringLength - 1, point);
                }
                _self.activePolygon = polygon;
                return _self._redrawPolygon(polygon, isFinished);
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
                let isSuccess = false;
                // return new Promise((resolve, reject) => {
                if (!_self._graphicsLayer) {
                    _self._graphicsLayer = new GraphicsLayer({
                        id: "plotGraphisLayer"
                    });
                    _self._view.map.add(_self._graphicsLayer);
                    isSuccess = true;
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