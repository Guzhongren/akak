// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.3/esri/copyright.txt for details.
//>>built
define("require exports ../lib/glMatrix ../../webgl/FramebufferObject ../../webgl/VertexArrayObject ../../webgl/Texture ../../webgl/BufferObject ../../webgl/Util ../webgl-engine/lib/DefaultVertexAttributeLocations ../webgl-engine/lib/DefaultVertexBufferLayouts ../../vectorTiles/VectorTileDisplayObject ../../vectorTiles/tileRendererHelper3D ./TerrainConst".split(" "),function(D,E,v,w,x,p,y,r,z,A,B,C,q){var m=v.vec2d,t=Array(20),u=[0,0];return function(){function l(c,a,d,b,g){this._gridTex=null;this.tileSize=
256;this._context=c;this.tileSize=a;this._resourceCounter=b;this._setNeedsRender=g;c.extensions.textureFilterAnisotropic&&(this._maxAnisotropy=Math.min(8,c.parameters.maxMaxAnisotropy));a=new Float32Array(20);a[0]=-1;a[1]=-1;a[2]=0;a[3]=0;a[4]=0;a[5]=1;a[6]=-1;a[7]=0;a[8]=1;a[9]=0;a[10]=-1;a[11]=1;a[12]=0;a[13]=0;a[14]=1;a[15]=1;a[16]=1;a[17]=0;a[18]=1;a[19]=1;this._vaoQuad=new x(c,z.Default3D,{geometry:A.Pos3Tex},{geometry:y.createVertex(c,35044,a)});this._blendLayersProgram=d.get("blendLayers")}
l.prototype.dispose=function(){this._fbo&&(this._fbo.dispose(),this._fbo=null);this._vaoQuad&&(this._vaoQuad.dispose(),this._vaoQuad=null);this._gridTex&&(this._gridTex.dispose(),this._gridTex=null);this._blendLayersProgram&&(this._blendLayersProgram.dispose(),this._blendLayersProgram=null);this._context=null};l.prototype.updateTileTexture=function(c){for(var a=q.LayerClass.MAP,d=c.layerInfo[a],b=0;b<d.length;b++)d[b].pendingUpdates&=~q.TileUpdateTypes.UPDATE_TEXTURE;if(c.renderData){var g,b=c.renderData,
f,e=0,h=!0;for(f=0;f<d.length;f++){g=d[f];var k=c.parentSurface.layerViewByIndex(f,a);t[f]=k.fullOpacity;if(g.data||g.upsampleFromTile)if(e++,!k.isTransparent){h=!1;break}}f===d.length&&f--;0===e&&this._gridTex?(b.textureReference=this._gridTex,m.set2(0,0,b.texOffset),b.texScale=1):1!==e||h?(this._composeMapLayers(c,d,f,h,t),b.textureReference=null,m.set2(0,0,b.texOffset),b.texScale=1):(g=d[f],g.data?(a=g,m.set2(0,0,b.texOffset),b.texScale=1):(c=g.upsampleFromTile,a=c.tile.layerInfo[a][f],m.set(c.offset,
b.texOffset),b.texScale=c.scale),a&&(a.data instanceof HTMLImageElement&&(a.data=this._buildTexture(a.data)),b.textureReference=a.data));this._setNeedsRender()}};l.prototype.setGridImage=function(c){this._gridTex=this._buildTexture(c)};l.prototype._buildTexture=function(c){var a={target:3553,pixelFormat:6408,dataType:5121,wrapMode:33071,samplingMode:9729,maxAnisotropy:this._maxAnisotropy,flipped:!0,hasMipmap:!0},d=this._context,b;if(c)try{b=new p(d,a,c)}catch(g){a.width=a.height=this.tileSize,b=new p(d,
a),console.warn("TerrainRenderer: failed to execute 'texImage2D', cross-origin image may not be loaded.")}else a.width=a.height=this.tileSize,b=new p(d,a);d.bindTexture(b);b.generateMipmap();return b};l.prototype._drawVectorData=function(c,a,d,b,g,f,e,h){void 0===h&&(h=1);C(this._context,d,c,a.renderer,a.schemeHelper,d[0],b,g,0,f,e,h)};l.prototype._drawRasterData=function(c,a,d,b){void 0===b&&(b=1);var g=this._context,f=this._blendLayersProgram,e=this._vaoQuad;g.bindProgram(f);g.bindVAO(e);r.assertCompatibleVertexAttributeLocations(e,
f);g.bindTexture(c,0);f.setUniform1i("tex",0);f.setUniform1f("scale",a);f.setUniform2f("offset",d[0],d[1]);f.setUniform1f("opacity",b);g.drawArrays(5,0,r.vertexCount(e,"geometry"))};l.prototype._composeMapLayers=function(c,a,d,b,g){var f=q.LayerClass.MAP,e=this._context;c.renderData.texture||(c.renderData.texture=this._buildTexture());var h=c.renderData.texture,k=this._fbo;k&&k.width===h.descriptor.width&&k.height===h.descriptor.height||(this._fbo=k=w.create(e,{colorTarget:0,depthStencilTarget:1,
width:h.descriptor.width,height:h.descriptor.height}));var l=e.gl;e.bindFramebuffer(k);e.setViewport(0,0,this.tileSize,this.tileSize);e.setClearColor(0,0,0,0);e.setClearDepth(1);e.clear(l.COLOR_BUFFER_BIT|l.DEPTH_BUFFER_BIT);e.setDepthTestEnabled(!1);e.setBlendFunctionSeparate(1,771,1,771);e.setBlendEquation(32774);e.setBlendingEnabled(!0);var m,n;for(b&&this._gridTex&&this._drawRasterData(this._gridTex,1,u);0<=d;d--)b=null,k=a[d],k.data?(b=k,m=u,n=1):k.upsampleFromTile&&(n=k.upsampleFromTile,b=n.tile.layerInfo[f][d],
m=n.offset,n=n.scale),b&&(b.data instanceof HTMLImageElement&&(b.data=this._buildTexture(b.data)),b.data instanceof B?(k=c.parentSurface.layerViewByIndex(d,f),this._drawVectorData(b.data,k,c.lij,h.descriptor.width,h.descriptor.height,n,m,g[d])):this._drawRasterData(b.data,n,m,g[d]));e.bindTexture(h);l.copyTexImage2D(e.gl.TEXTURE_2D,0,h.descriptor.pixelFormat,0,0,h.descriptor.width,h.descriptor.height,0);h.generateMipmap();e.bindFramebuffer(null);e.setBlendFunctionSeparate(770,771,1,771);e.setBlendingEnabled(!1);
this._resourceCounter.incrementNumTileTexturesComposited()};return l}()});