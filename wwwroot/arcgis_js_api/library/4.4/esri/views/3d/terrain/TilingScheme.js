// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.4/esri/copyright.txt for details.
//>>built
define(["../../../core/Error","../../../geometry/SpatialReference","../../../geometry/support/scaleUtils","../support/projectionUtils","../support/mathUtils"],function(h,p,u,q,g){var r=q.webMercator.x2lon,t=q.webMercator.y2lat,m=[0,0,0,0],e=function(a){var b=e._checkUnsupported(a);if(b)throw b;this.spatialReference=a.spatialReference;this._isWebMercator=this.spatialReference.isWebMercator;this._isWGS84=this.spatialReference.isWGS84;this.origin=[a.origin.x,a.origin.y];this.pixelSize=[a.size[0],a.size[1]];
var c=a.lods.reduce(function(a,b,c){b.level<a.min&&(a.min=b.level,a.minIndex=c);a.max=Math.max(a.max,b.level);return a},{min:Infinity,minIndex:0,max:-Infinity}),d=a.lods[c.minIndex],f=Math.pow(2,d.level),b=d.resolution*f,d=d.scale*f;this.levels=Array(c.max+1);for(c=0;c<this.levels.length;c++)this.levels[c]={resolution:b,scale:d,tileSize:[b*a.size[0],b*a.size[1]]},b/=2,d/=2};e.prototype={getExtent:function(a,b,c,d,f){d=d||Array(4);var e=this.levels[a];a=e.tileSize[0];e=e.tileSize[1];d[0]=this.origin[0]+
c*a;d[2]=d[0]+a;d[3]=this.origin[1]-b*e;d[1]=d[3]-e;f&&(this._isWebMercator?(f[0]=r(d[0]),f[1]=t(d[1]),f[2]=r(d[2]),f[3]=t(d[3])):this._isWGS84&&(f[0]=g.deg2rad(d[0]),f[1]=g.deg2rad(d[1]),f[2]=g.deg2rad(d[2]),f[3]=g.deg2rad(d[3])))},ensureMaxLod:function(a){for(;this.levels.length<=a;){var b=this.levels[this.levels.length-1],c=b.resolution/2;this.levels.push({resolution:c,scale:b.scale/2,tileSize:[c*this.pixelSize[0],c*this.pixelSize[1]]})}},capMaxLod:function(a){this.levels.length>a+1&&(this.levels.length=
a+1)},getMaxLod:function(){return this.levels.length-1},scaleAtLevel:function(a){return this.levels[0].scale/Math.pow(2,a)},levelAtScale:function(a){var b=this.levels[0].scale;return a>=b?0:Math.log(b/a)*Math.LOG2E},compatibleWith:function(a){if(!(a instanceof e)){if(e._checkUnsupported(a))return!1;a=new e(a)}if(!a.spatialReference.equals(this.spatialReference)||a.pixelSize[0]!==this.pixelSize[0]||a.pixelSize[1]!==this.pixelSize[1])return!1;var b=Math.min(this.levels.length,a.levels.length)-1,c=this.levels[b].resolution,
d=g.floatEqualAbsolute,f=.5*c;if(!d(a.origin[0],this.origin[0],f)||!d(a.origin[1],this.origin[1],f))return!1;f=.5*c/Math.pow(2,b)/Math.max(this.pixelSize[0],this.pixelSize[1])*12;return d(c,a.levels[b].resolution,f)},rootTilesInExtent:function(a,b,c){var d=this.levels[0].tileSize;e.computeRowColExtent(a,d,this.origin,m);a=m[1];var f=m[3],k=m[0],g=m[2],h=g-k,l=f-a;h*l>c&&(c=Math.floor(Math.sqrt(c)),l>c&&(a=a+Math.floor(.5*l)-Math.floor(.5*c),f=a+c),h>c&&(k=k+Math.floor(.5*h)-Math.floor(.5*c),g=k+c));
c=Array((g-k)*(f-a));h=0;for(l=a;l<f;l++)for(var n=k;n<g;n++)c[h++]=[0,l,n];b&&(b[0]=this.origin[0]+k*d[0],b[1]=this.origin[1]-f*d[1],b[2]=this.origin[0]+g*d[0],b[3]=this.origin[1]-a*d[1]);return c}};e.computeRowColExtent=function(a,b,c,d){var e=.001*(a[2]-a[0]+(a[3]-a[1]));d[0]=Math.floor((a[0]+e-c[0])/b[0]);d[2]=Math.ceil((a[2]-e-c[0])/b[0]);d[1]=Math.floor((c[1]-a[3]+e)/b[1]);d[3]=Math.ceil((c[1]-a[1]-e)/b[1])};e.isPowerOfTwo=function(a){a=a.lods;var b=a[0].resolution*Math.pow(2,a[0].level);return!a.some(function(a){return!g.floatEqualRelative(a.resolution,
b/Math.pow(2,a.level))})};e.hasGapInLevels=function(a){a=a.lods.map(function(a){return a.level});a.sort(function(a,b){return a-b});for(var b=1;b<a.length;b++)if(a[b]!==a[0]+b)return!0;return!1};e.tileSizeSupported=function(a){var b=a.size[1];return b===a.size[0]&&0===(b&b-1)&&128<=b&&512>=b};e._checkUnsupported=function(a){return a?1>a.lods.length?new h("tilingscheme:generic","Tiling scheme must have at least one level"):e.isPowerOfTwo(a)?null:new h("tilingscheme:power-of-two","Tiling scheme must be power of two"):
new h("tilingscheme:tile-info-missing","Tiling scheme must have tiling information")};e.checkUnsupported=function(a){var b=e._checkUnsupported(a);return b?b:e.hasGapInLevels(a)?new h("tilingscheme:gaps","Tiling scheme levels must not have gaps between min and max level"):e.tileSizeSupported(a)?null:new h("tilingscheme:tile-size","Tiles must be square and size must be one of [128, 256, 512]")};e.fromExtent=function(a,b){var c=a[2]-a[0],d=a[3]-a[1],f=u.getUnitValueForSR(b),g=1.2*Math.max(c,d);a=new e({size:[256,
256],origin:{x:a[0]-.5*(g-c),y:a[3]+.5*(g-d)},lods:[{level:0,resolution:g/256,scale:1/(256/96*.0254/(g*f))}],spatialReference:b});a.ensureMaxLod(20);return a};e.WebMercatorAuxiliarySphereTileInfo={size:[256,256],origin:{x:-2.0037508342787E7,y:2.0037508342787E7},spatialReference:p.WebMercator,lods:[{level:0,resolution:156543.03392800014,scale:5.91657527591555E8}]};e.makeWebMercatorAuxiliarySphere=function(a){a=a||19;var b=new e(e.WebMercatorAuxiliarySphereTileInfo);b.ensureMaxLod(a);return b};e.WebMercatorAuxiliarySphere=
e.makeWebMercatorAuxiliarySphere(19);e.makeWGS84WithTileSize=function(a,b){b=b||16;var c=256/a;a=new e({size:[a,a],origin:{x:-180,y:90},spatialReference:p.WGS84,lods:[{level:0,resolution:.703125*c,scale:2.95497598570834E8*c}]});a.ensureMaxLod(b);return a};return e});