// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.4/esri/copyright.txt for details.
//>>built
define("require exports ../../../core/tsSupport/declareExtendsHelper ../../../core/tsSupport/decorateHelper ../../../core/accessorSupport/decorators ../../../layers/FeatureLayer ./GraphicLayerView3DBase ../../../layers/graphics/controllers/SnapshotController ../../../core/watchUtils ../../../core/Error ../../../core/promiseUtils".split(" "),function(a,r,k,f,e,l,m,n,p,g,h){a=c=function(a){function d(q){var b=a.call(this)||this;b.labelingEnabled=q.layer instanceof l;return b}k(d,a);d.prototype.initialize=
function(){this.addResolvingPromise(this.validateMaximumFeatureCount())};d.prototype.createController=function(){var a=this;return this.layer.createGraphicsController({layerView:this,options:{maxPageSize:300,extent:this.view.clippingArea}}).then(function(b){b instanceof n&&a._eventHandles.push(p.whenFalseOnce(a,"suspended",function(){b.startup()}));return b}).otherwise(function(a){return h.reject(new g("featurelayerview3d:create-controller",a.message))})};d.prototype.validateMaximumFeatureCount=function(){return 0>
c.maximumFeatureCount||!this.layer.url?h.resolve():this.layer.queryFeatureCount().then(function(a){if(a>c.maximumFeatureCount)throw new g("featurelayerview3d:maximum-feature-count-exceeded","The maximum number of allowed features (${maximumFeatureCount}) has been exceeded (layer has ${numberOfFeatures} features)",{maximumFeatureCount:c.maximumFeatureCount,numberOfFeatures:a});})};return d}(e.declared(m));a.maximumFeatureCount=-1;f([e.property()],a.prototype,"controller",void 0);a=c=f([e.subclass("esri.views.3d.layers.FeatureLayerView3D")],
a);var c;return a});