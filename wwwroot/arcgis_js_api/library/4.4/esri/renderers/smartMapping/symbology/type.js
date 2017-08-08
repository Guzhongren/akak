// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.4/esri/copyright.txt for details.
//>>built
define("require exports dojo/_base/lang ../../../Color ./support/colors ./support/utils".split(" "),function(m,f,t,e,u,h){function p(b,a){return b.map(function(b){b=new e(b);null!=a&&(b.a=a);return b})}function q(b,a,c){var g;b=u[b];var d=p(b.stops);if(b)switch(c){case "point":case "multipoint":g={colors:d,noDataColor:new e(a.noDataColor),opacity:1,outline:{color:new e(a.outline.color),width:a.outline.width},size:a.size};break;case "polyline":g={colors:d,noDataColor:new e(a.noDataColor),opacity:1,
width:a.width};break;case "polygon":g={colors:d,noDataColor:new e(a.noDataColor),opacity:a.fillOpacity||1,outline:{color:new e(a.outline.color),width:a.outline.width}};break;case "mesh":g={colors:d,noDataColor:new e(a.noDataColor),opacity:a.fillOpacity||1}}return g}function v(b,a){var c=k["default"];a=h.getStorageType(a);return(c=c&&c[a])&&c[b]}m={color:[153,153,153,1],width:"1px"};f="tropical-bliss desert-blooms under-the-sea vibrant-rainbow ocean-bay prairie-summer pastel-chalk".split(" ");var l=
{"default":{name:"default",label:"Default",description:"Default theme for visualizing features by their type.",basemapGroups:{light:"streets gray topo terrain national-geographic oceans osm gray-vector streets-vector topo-vector streets-relief-vector streets-navigation-vector".split(" "),dark:["satellite","hybrid","dark-gray","dark-gray-vector","streets-night-vector"]},pointSchemes:{light:{common:{noDataColor:"#aaaaaa",outline:m,size:"8px"},primary:"cat-dark",secondary:["cat-light"].concat(f)},dark:{common:{noDataColor:"#aaaaaa",
outline:{color:[26,26,26,1],width:"1px"},size:"8px"},primary:"cat-light",secondary:["cat-dark"].concat(f)}},polylineSchemes:{light:{common:{noDataColor:"#aaaaaa",width:"2px"},primary:"cat-dark",secondary:["cat-light"].concat(f)},dark:{common:{noDataColor:"#aaaaaa",width:"2px"},primary:"cat-light",secondary:["cat-dark"].concat(f)}},polygonSchemes:{light:{common:{noDataColor:"#aaaaaa",outline:m,fillOpacity:.8},primary:"cat-dark",secondary:["cat-light"].concat(f)},dark:{common:{noDataColor:"#aaaaaa",
outline:{color:[51,51,51,1],width:"1px"},fillOpacity:.8},primary:"cat-light",secondary:["cat-dark"].concat(f)}}}},k={};(function(){for(var b in l){var a=l[b],c=a.basemapGroups,g=k[b]={basemaps:[].concat(c.light).concat(c.dark),point:{},polyline:{},polygon:{}},d;for(d in c)for(var r=c[d],e=0;e<r.length;e++){var f=r[e];a.pointSchemes&&(g.point[f]=a.pointSchemes[d]);a.polylineSchemes&&(g.polyline[f]=a.polylineSchemes[d]);a.polygonSchemes&&(g.polygon[f]=a.polygonSchemes[d])}}})();var n={getThemes:function(b){var a=
[],c;for(c in l){var g=l[c],d=k[c],e=h.getBasemapId(b,d.basemaps);e&&-1===d.basemaps.indexOf(e)||a.push({name:g.name,label:g.label,description:g.description,basemaps:d.basemaps.slice(0)})}return a},getSchemes:function(b){var a=b.geometryType,c="mesh"!==a&&b.worldScale,e=b.view;b=h.getBasemapId(b.basemap,k["default"].basemaps);var d=v(b,a),f;d&&(f=q(d.primary,d.common,a),f={primaryScheme:c?n.toWorldScale({scheme:f,view:e}):f,secondarySchemes:d.secondary.map(function(b){b=q(b,d.common,a);return c?n.toWorldScale({scheme:b,
view:e}):b}),basemapId:b});return f},cloneScheme:function(b){var a;b&&(a=t.mixin({},b),a.colors=p(a.colors),a.noDataColor&&(a.noDataColor=new e(a.noDataColor)),a.outline&&(a.outline={color:a.outline.color&&new e(a.outline.color),width:a.outline.width}));return a},toWorldScale:function(b){if(b.scheme&&b.view){var a=b.scheme,c=b.scheme;return a.hasOwnProperty("size")?(a.size&&(a.size=h.toWorldScale(a.size,b.view)),a):c.hasOwnProperty("width")?(c.width&&(c.width=h.toWorldScale(c.width,b.view)),c):b.scheme}}};
return n});