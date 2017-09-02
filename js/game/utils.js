var log = console.log.bind(console);
// 代码优化
var imageFromPath = function (path) {
    var img = new Image(path);
    img.src = path;
    return img;
};

// 判断相撞
var reIntersect  = function (a, o) {
    if(a.y  > o.y && a.y < o.y + o.imgeH ){
        if (a.x > o.x && a.x < o.x + o.imgeW){
            return true;
        }
    }
    return false;
}