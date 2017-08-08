// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.4/esri/copyright.txt for details.
//>>built
define("../core/lang ./Point ./Polygon ./support/geodesicUtils ./support/webMercatorUtils ./support/WKIDUnitConversion dojo/_base/lang".split(" "),function(l,q,k,r,m,h,t){var n={centimeters:.01,decimeters:.1,feet:.3048,inches:.0254,kilometers:1E3,meters:1,miles:1609.34,millimeters:.001,"nautical-miles":1852,yards:.9144,"decimal-degrees":111320},p=k.createSubclass({declaredClass:"esri.geometry.Circle",normalizeCtorArgs:function(a,b){var f;if(a&&a.center)f=a;else{if(a&&a.rings)return this.inherited(arguments);
f={center:a}}return t.mixin(this.inherited(arguments,[]),f,b)},initialize:function(){var a=this.center,b=this.numberOfPoints;this.hasZ=a&&a.hasZ;if(0===this.rings.length&&a){var f=this.radius*n[this.radiusUnit],c=a.spatialReference,d="geographic";if(c.isWebMercator)d="webMercator";else if(l.isDefined(h[c.wkid])||c.wkt&&0===c.wkt.indexOf("PROJCS"))d="projected";if(this.geodesic){var e;switch(d){case "webMercator":e=m.webMercatorToGeographic(a);break;case "projected":console.error("Creating a geodesic circle requires the center to be specified in web mercator or geographic coordinate system");
break;case "geographic":e=a}a=this._createGeodesicCircle(e,f,b);"webMercator"===d&&(a=m.geographicToWebMercator(a))}else{var g;"webMercator"===d||"projected"===d?g=f/this._convert2Meters(1,a.spatialReference):"geographic"===d&&(g=f/n["decimal-degrees"]);a=this._createPlanarCircle(a,g,b)}this.spatialReference=a.spatialReference;this.addRing(a.rings[0])}},properties:{center:{value:null,type:q},geodesic:!1,numberOfPoints:60,radius:1E3,radiusUnit:"meters"},clone:function(){return new p({rings:this.rings,
hasZ:this.hasZ,hasM:this.hasM,spatialReference:this.spatialReference})},_createGeodesicCircle:function(a,b,f){for(var c=0,d=Math.PI/180,e=[],g;c<2*Math.PI;)g=r._directGeodeticSolver(a.y*d,a.x*d,c,b),g=g.toArray(),this.hasZ&&g.push(a.z),e.push(g),c+=Math.PI/(f/2);e.push(e[0]);return new k(e)},_createPlanarCircle:function(a,b,f){for(var c=0,d=[],e,g;c<2*Math.PI;)e=a.x+Math.cos(-c)*b,g=a.y+Math.sin(-c)*b,e=[e,g],this.hasZ&&e.push(a.z),d.push(e),c+=Math.PI/(f/2);d.push(d[0]);return new k({spatialReference:a.spatialReference,
rings:[d]})},_convert2Meters:function(a,b){if(l.isDefined(h[b.wkid]))b=h.values[h[b.wkid]];else{b=b.wkt;var f=b.lastIndexOf(",")+1,c=b.lastIndexOf("]]");b=parseFloat(b.substring(f,c))}return a*b}});return p});