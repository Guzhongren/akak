// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.4/esri/copyright.txt for details.
//>>built
define("require exports dojo/string ../lib/ModelContentType ../lib/ModelDirtySet ../lib/RenderGeometry ../lib/Util ../lib/gl-matrix".split(" "),function(h,v,m,d,n,r,k,l){var g=k.assert,p=k.verify,q=l.vec3d,t=l.mat4d,u=k.logWithBase;h=function(){function e(){this.dirtySet=new n(this);this._uniqueIdx=0;this._id2origin={};this.content={};for(var a in d)this.content[d[a]]={}}e.prototype.getAll=function(a){a=this.content[a];g(void 0!==a);return a};e.prototype.get=function(a,b){return this.getAll(a)[b]};
e.prototype.add=function(a,b){var c=this.content[a];g(void 0!==c);var f=b.getId();g(null==c[f],"Model/Stage already contains object to be added");c[f]=b;a===d.LAYER&&this.notifyDirty(a,b,"layerAdded")};e.prototype.remove=function(a,b){var c=this.content[a];g(void 0!==c);var f=c[b];g(void 0!==f,"Model/Stage doesn't contain object to be removed");delete c[b];a===d.TEXTURE&&f.unload();a===d.LAYER&&this.notifyDirty(a,f,"layerRemoved");return f};e.prototype.getDirtySet=function(){return this.dirtySet};
e.prototype.notifyDirty=function(a,b,c,f){this.dirtySet.handleUpdate(b,c,f)};e.prototype.getOrigin=function(a,b,c){void 0===c&&(c=10);var f=0;b=b*c/1E4;1<b&&(f=Math.ceil(u(b,2)));b=1E4*Math.pow(2,f);c=Math.round(a[0]/b);var d=Math.round(a[1]/b);a=Math.round(a[2]/b);var f=f+"_"+c+"_"+d+"_"+a,e=this._id2origin[f];null==e&&(e={vec3:q.createFrom(c*b,d*b,a*b),id:f},this._id2origin[f]=e);return e};e.prototype.getGeometryRenderGeometries=function(a,b,c){var f=a.getId(),d=b.geometry,e=d.getData(),g=!!d.singleUse,
h=b.materials,k=b.instanceParameters,l=a.getCombinedStaticTransformation(b),m=t.maxScale(l),n=b.origin,d=d.getBoundingInfo(0),p=b.getId()+"#0",q=this._uniqueIdx++;a=new r(e,d,h[0],l,b.customTransformation,m,a.getCastShadow(),g,f,p,q);a.origin=n||this.getOrigin(a.center,a.bsRadius);a.instanceParameters=k;c.push(a)};e.prototype.updateRenderGeometryTransformation=function(a,b,c){a.getCombinedStaticTransformation(b,c.transformation);c.updateTransformation(c.transformation)};e.prototype.formatDebugInfo=
function(a){var b=[];if(a){b[0]="\x3ctable\x3e";for(var c in d)a=d[c],b[0]+="\x3ctr\x3e\x3ctd\x3e"+a+'\x3c/td\x3e\x3ctd style\x3d"text-align: right"\x3e'+Object.keys(this.getAll(a)).length+"\x3c/td\x3e\x3c/tr\x3e";b[0]+="\x3c/table\x3e";b[1]=this.dirtySet.formatDebugInfo(!0)}else{b[0]="";for(c in d)a=d[c],b[0]+=m.pad(String(Object.keys(this.getAll(a)).length),6," ")+" "+a+", ";b[1]=this.dirtySet.formatDebugInfo(!1)}return b};e.prototype.validateContent=function(){var a=this.getAll(d.OBJECT),b;for(b in a)this.validateObject(a[b]);
var a=this.getAll(d.LAYER),c;for(c in a)this.validateLayer(a[c]);c=this.getAll(d.MATERIAL);for(var f in c)this.validateMaterial(c[f])};e.prototype.validateObject=function(a){a=a.geometryRecords;for(var b=0;b<a.length;++b){var c=a[b];g(null!=this.get(d.GEOMETRY,c.geometry.id));var f=c.geometry.numGroups;g(f<=c.materials.length,"object materials do not match geometry groups");p(f===c.materials.length,"object materials do not match geometry groups");for(var e=0;e<f;++e)g(null!=this.get(d.MATERIAL,c.materials[e].getId()))}};
e.prototype.validateLayer=function(a){a=a.getObjects();for(var b=0;b<a.length;++b){var c=this.get(d.OBJECT,a[b].getId());g(null!=c)}};e.prototype.validateMaterial=function(a){a=a.getAllTextureIds();for(var b=0;b<a.length;++b){var c=this.get(d.TEXTURE,a[b]);g(null!=c)}};return e}();h.ContentType=d;return h});