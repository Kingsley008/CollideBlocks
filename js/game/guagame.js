class GuaGame {

    constructor(fps, images, callback) {
        window.fps = fps;
        this.images = images;
        this.callback = callback;
        this.stage = null;
        this.actions = {};
        this.keydowns = {};
        this.myCanvas = document.getElementById('myCanvas');
        this.ctx = myCanvas.getContext('2d');
        // 监听键盘事件
        var self = this;
        window.addEventListener("keydown", function () {
                self.keydowns[event.key] = true;
            }
        );

        window.addEventListener("keyup", function (event) {
            self.keydowns[event.key] = false;
        });

        this.init();

    }
    // 创建一个单例
    static instance(...args){
        this.i = this.i || new this(...args)
        return this.i;
    }

    init() {
        // 图片载入
        var g = this;
        var loads = [];
        //returns an array of a given object's own enumerable properties, in the same order as that provided by a for...in loop
        var names = Object.keys(g.images);

        for (var i = 0; i < names.length; i++) {
            var name = names[i]; // 使用let保存 当前块级作用域变量 或者用闭包 解决
            var path = g.images[name];
            var img = new Image();
            img.src = path;
            img.onload = (function (name, img) {

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
    };

    drawImage(o) {
        this.ctx.drawImage(o.image, o.x, o.y);
    };

    // 避免在settimeout函数中 this发生改变
    update() {
        this.stage.update();
    };

    draw() {
        this.stage.draw();
    };

    //事件注册
    registerAction(key, callback) {
        this.actions[key] = callback;
    };

    //变化场景
    replaceStage(scence) {
        this.stage = scence;
    };

    imageByName(name) {
        var g = this;
        var img = g.images[name];
        var image = {
            w: img.width,
            h: img.height,
            image: img,
        }
        return image
    }

    loop() {
        var g = this;
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
        }, 1000 / window.fps);
    };

    run() {
        // 执行回调函数时 初始化 stage(g) 并且给 g.stage 传值
        var g = this;
        this.callback(g);
        // 开始运行程序
        setTimeout(function () {
            g.loop()
        }, 1000 / window.fps)

    }


}