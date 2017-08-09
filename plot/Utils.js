define([
], function () {
    let utils = {};
    /**
     * 将point插入points倒数第二个位置
     */
    utils.addVertex = function (/*点*/point, /*点集*/points) {
        if (!points) {
            points = [];
            points.push(point, point);
        } else {
            let length = points.length;
            let points1 = points.slice(0, length - 1);
            let points2 = points.slice(length - 1, length);
            points1.push(point);
            points = points1.concat(points2);
        }
        return points;
    };
    utils.updateVertex = function (/*点*/point, /*点集*/points) {
        if (points && points.length <= 2) {
            let points1 = points.slice(0, length - 1);
            let points2 = points.slice(length - 1, length);
            points1.push(point);
            points = points1.concat(points2);
        } else if (points && points.length > 2) {
            let tempPoints = points.splice(-1, 1, point);
        }
        return points;
    };

    return utils;
});