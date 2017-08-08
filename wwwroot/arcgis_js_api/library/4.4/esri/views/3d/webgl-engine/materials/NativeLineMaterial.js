// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.4/esri/copyright.txt for details.
//>>built
define("./internal/MaterialUtil ../lib/Util ../lib/gl-matrix ../lib/RenderSlot ../lib/DefaultVertexBufferLayouts ../lib/ComponentUtils ../../../webgl/Util".split(" "),function(r,w,x,y,E,F,G){var b=x.vec3d,z=x.vec2d,A=x.mat4d,H=w.VertexAttrConstants,e=b.create(),f=b.create(),m=b.create(),u=b.create(),p=z.create(),q=z.create(),B=b.create(),C=b.create(),k=function(D,n,c,h){"string"===typeof c&&(h=c,c=void 0);r.basicMaterialConstructor(this,h);this.lineType=c||k.LINES;var a=E.Pos3,t=G.getStride(a)/4;
this.canBeMerged=this.lineType===k.LINES;this.setColor=function(a){n=a;this.notifyDirty("matChanged")};this.getColor=function(){return n};this.dispose=function(){};this.getOutputAmount=function(a){a=a/2+1;if(this.lineType===k.STRIP)return a*t;if(this.lineType===k.LINES)return(2*a-2)*t};this.getVertexBufferLayout=function(){return a};this.fillInterleaved=function(a,d,b,h,c,e){a=a.vertexAttr[H.POSITION].data;if(d||this.lineType===k.LINES)for(h=a.length/3,b=0;b<h;b++){var f=3*b,g=a[f],v=a[f+1],l=a[f+
2];if(d)var f=g,m=v,g=d[0]*f+d[4]*m+d[8]*l+d[12],v=d[1]*f+d[5]*m+d[9]*l+d[13],l=d[2]*f+d[6]*m+d[10]*l+d[14];c[e++]=g;c[e++]=v;c[e++]=l;this.lineType===k.LINES&&0!==b&&b!==h-1&&(c[e++]=g,c[e++]=v,c[e++]=l)}else for(b=0;b<a.length;b++)c[e++]=a[b]};this.intersect=function(a,d,c,h,k,t,D){if(h.isSelection&&!F.isAllHidden(d.componentVisibilities,a.data.componentOffsets)){d=a.getData().getVertexAttr("position").position.data;a=Number.MAX_VALUE;var g,n;k=h.camera;t=h.point;for(var l=0;l<d.length-5;l+=3){e[0]=
d[l];e[1]=d[l+1];e[2]=d[l+2];A.multiplyVec3(c,e);f[0]=d[l+3];f[1]=d[l+4];f[2]=d[l+5];A.multiplyVec3(c,f);k.projectPoint(e,p);k.projectPoint(f,q);if(0>p[2]&&0<q[2])b.subtract(e,f,m),g=k.frustumPlanes,n=-(b.dot(g[4],e)+g[4][3]),g=n/b.dot(m,g[4]),b.scale(m,g,m),b.add(e,m,e),k.projectPoint(e,p);else if(0<p[2]&&0>q[2])b.subtract(f,e,m),g=k.frustumPlanes,n=-(b.dot(g[4],f)+g[4][3]),g=n/b.dot(m,g[4]),b.scale(m,g,m),b.add(f,m,f),k.projectPoint(f,q);else if(0>p[2]&&0>q[2])continue;g=w.projectVectorVector2D(p,
q,t);g<a&&(a=g,b.set(e,B),b.set(f,C))}c=h.p0;h=h.p1;2>a&&(a=w.linelineDistance3D(B,C,c,h),d=Number.MAX_VALUE,a[0]&&(b.subtract(a[2],c,u),a=b.length(u),b.scale(u,1/a),d=a/b.dist(c,h)),D(d,u))}};this.getGLMaterials=function(){return{color:I,depthShadowMap:void 0,normal:void 0,depth:void 0,highlight:J}};this.getAllTextureIds=function(){return[]}};k.STRIP=1;k.LINES=2;var I=function(b,e){r.basicGLMaterialConstructor(this,b);var c=e.get("simple"),h=b.getColor();this.beginSlot=function(a){return a===y.OPAQUE_MATERIAL};
this.getProgram=function(){return c};this.bind=function(a,b){a.bindProgram(c);c.setUniform4fv("color",h);a.setBlendingEnabled(1>h[3]);a.setBlendFunctionSeparate(a.gl.SRC_ALPHA,a.gl.ONE_MINUS_SRC_ALPHA,a.gl.ONE,a.gl.ONE_MINUS_SRC_ALPHA);a.setDepthTestEnabled(!0)};this.release=function(a){1>h[3]&&a.setBlendingEnabled(!1)};this.bindView=function(a,b){r.bindView(b.origin,b.view,c)};this.bindInstance=function(a,b){c.setUniformMatrix4fv("model",b.transformation)};this.getDrawMode=function(a){a=a.gl;return b.lineType===
k.STRIP?a.LINE_STRIP:a.LINES}},J=function(b,e){r.basicGLMaterialConstructor(this,b);var c=e.get("highlight");this.beginSlot=function(b){return b===y.OPAQUE_MATERIAL};this.getProgram=function(){return c};this.bind=function(b,a){b.bindProgram(c);b.setDepthTestEnabled(!0)};this.release=function(b){};this.bindView=function(b,a){r.bindView(a.origin,a.view,c)};this.bindInstance=function(b,a){c.setUniformMatrix4fv("model",a.transformation)};this.getDrawMode=function(c){c=c.gl;return b.lineType===k.STRIP?
c.LINE_STRIP:c.LINES}};return k});