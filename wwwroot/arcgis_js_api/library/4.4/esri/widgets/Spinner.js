// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.4/esri/copyright.txt for details.
//>>built
define("require exports ../core/tsSupport/declareExtendsHelper ../core/tsSupport/decorateHelper ./support/widget ../core/accessorSupport/decorators ./Widget ../core/promiseUtils ../core/watchUtils ./support/AnchorElementViewModel".split(" "),function(c,n,h,e,f,d,k,l,m,g){c=function(c){function b(a){a=c.call(this)||this;a._animationDelay=500;a._animationPromise=null;a.location=null;a.view=null;a.visible=!1;a.viewModel=new g;return a}h(b,c);b.prototype.postInitialize=function(){var a=this;this.own([m.watch(this,
"visible",function(c){return a._visibleChange(c)})])};b.prototype.destroy=function(){this._cancelAnimationPromise()};b.prototype.show=function(a){var c=this,b=a.location;a=a.promise;b&&(this.viewModel.location=b);this.visible=!0;a&&a.always(function(){return c.hide()})};b.prototype.hide=function(){this.visible=!1};b.prototype.render=function(){var a=this.visible,c=!!this.viewModel.screenLocation,a=(b={},b["esri-spinner--start"]=a&&c,b["esri-spinner--finish"]=!a&&c,b),b=this._getPositionStyles();return f.tsx("div",
{class:"esri-spinner",classes:a,styles:b});var b};b.prototype._cancelAnimationPromise=function(){this._animationPromise&&(this._animationPromise.cancel(),this._animationPromise=null)};b.prototype._visibleChange=function(a){var b=this;a?this.viewModel.screenLocationEnabled=!0:(this._cancelAnimationPromise(),this._animationPromise=l.after(this._animationDelay).then(function(){b.viewModel.screenLocationEnabled=!1;b._animationPromise=null}))};b.prototype._getPositionStyles=function(){var a=this.viewModel.screenLocation;
return a?{left:a.x+"px",top:a.y+"px"}:{}};return b}(d.declared(k));e([d.aliasOf("viewModel.location")],c.prototype,"location",void 0);e([d.aliasOf("viewModel.view")],c.prototype,"view",void 0);e([d.property(),f.renderable()],c.prototype,"visible",void 0);e([d.property({type:g}),f.renderable(["viewModel.screenLocation","viewModel.screenLocationEnabled"])],c.prototype,"viewModel",void 0);return c=e([d.subclass("esri.widgets.Spinner")],c)});