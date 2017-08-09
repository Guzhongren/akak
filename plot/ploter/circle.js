define([
    'dojo/_base/declare',
    "dojo/_base/lang",
    "dojo/json",
],function(declare, lang,json){

    return clazz= new declare([],{
        consturctor: function(){
            
        }
    });

});


//圆形/椭圆
//dot 圆点
//r 半径
//compressionRatio 垂直压缩比
function drawCircle(dot, r, compressionRatio, data){
    var pstart = [dot[0]+r, dot[1]]; //起点
    var pre = pstart; 
    for(var i=0; i < 360; i+=5){
        rad = i*Math.PI/180; //计算弧度
        //r*Math.cos(rad) 弧线的终点相对dot的水平偏移
        //r*Math.sin(rad) 弧线的终点相对dot的垂直偏移
        //compressionRatio 垂直压缩比例
        var cur = [r*Math.cos(rad)+dot[0], compressionRatio*r*Math.sin(rad)+dot[1]];
        drawLine(pre,cur);
        pre = cur; //保存当前点的坐标
    }
    drawLine(pre,pstart);//使闭合
    //描圆点
    drawPoint({
        pw:2,ph:2,color:'DarkRed',point:dot
    });
}