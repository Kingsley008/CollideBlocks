
var range = document.getElementById('myRange');
var fps = range.getAttribute('value');
range.addEventListener('input',function (e) {
    fps =  e.target.value;
})

var GuaGame = function (images, callback) {
    var g = {
        actions: {},
        keydowns: {},
        images:{},
        stage:null
    };
    var myCanvas = document.getElementById('myCanvas');
    //得到上下文 环境
    var ctx = myCanvas.getContext('2d');
    g.paused = false;
    g.canvas = myCanvas;
    g.ctx = ctx;
    g.drawImage = function (o) {
        g.ctx.drawImage(o.image, o.x, o.y);
    };
    window.addEventListener("keydown", function (event) {
        g.keydowns[event.key] = true;
    });
    window.addEventListener("keyup", function (event) {
        g.keydowns[event.key] = false;
    });

    g.update = function () {
        g.stage.update();
    };
    g.draw = function () {
        g.stage.draw();
    };
    //事件注册
    g.registerAction = function (key, callback) {
        g.actions[key] = callback;
    };
    //变化场景
    g.replaceStage = function (scence) {
        g.stage = scence;
    }

    //使得动画过渡平滑 1秒走30次
    g.loop = function () {
        setTimeout(function () {
            //event
            var actions = Object.keys(g.actions);
            for (var i in actions) {
                var key = actions[i];
                if (g.keydowns[key]) {
                    //如果存在该key 那么调用对应的函数
                    g.actions[key]();
                }
            }
            //update x and y
            g.update();
            g.draw();
            g.loop()
        }, 1000 / fps);
    }


    // 图片载入
    var loads = [];
    //returns an array of a given object's own enumerable properties, in the same order as that provided by a for...in loop
    var names = Object.keys(images);
    for(var i = 0; i < names.length; i++){
        var name = names[i]; // 使用let保存 当前块级作用域变量 或者用闭包 解决
        var path = images[name];
        var img = new Image();
        img.src = path;
        img.onload = (function(name, img){

            return function () {
                log(names);
                g.images[name] = img;
                // 所有图片载入后 调用run
                loads.push(1);
                // 判断是否全部加载完成
                log(g.images);
                if (loads.length === names.length) {
                    // 图片加载完成后 开始执行程序
                    g.run();
                }
            }
        })(name, img)

    }
    g.imageByName = function(name) {

        var img = g.images[name]
        var image = {
            w: img.width,
            h: img.height,
            image: img,
        }
        return image
    }

    g.run = function () {
        // 执行回调函数时 初始化 stage(g) 并且给 g.stage 传值
        callback(g);
        // 开始运行程序
        setTimeout(function(){
            g.loop()
        }, 1000/fps)
    }
    return g;
};
