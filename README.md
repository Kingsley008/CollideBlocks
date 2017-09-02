#打砖块游戏编写总结

1. 事件代理机制处理键盘事件
```jsx harmony
    // 在guagame类中定义
    activities = {};
    keydowns = {};
    //编写事件注册
    function register(key, callback) {
      activities[key] = callback
    }
    //注册keydonws事件
    window.addEventListener('keydown',function(e) {
        keydowns[e.key] =  true;
    });
    //注册事件
    register('a',function() {
      console.log('move left')
    });

    //发射事件后重绘达到效果
    for(var i in activities){
    
        if(keydowns[i]){
            activities[i]();
        }
    }
    
```
2. 使用回调的方式处理图片加载
```jsx harmony
    // 由于js异步加载资源的关系，程序需要在资源加载完成后开始执行
        var imgs = [];
      function loop() {
          
        }
      function run() {
          setTimeout(loop,1000)
        }
      // 在初始化调用 init 即可
      function init() {
         var count = 0; 
         // 无序加载
         for(var i = 0; i < imgs.length; i++){
              var img = new Image();
              img.src = imgs[i].url;
              img.onload = (function(i) {
                      return function() {
                            // 处理图片数据的业务逻辑
                            count++;
                            if(count >= imgs.length){
                                  run();
                              }
                      }          
             })(i)
         }
         // 有序加载 
         function load() {
             img.src = imgs[count].url;
             img.onload = function() {
                count++;
          }    
             
          if(count >= imgs.length){
              run()
          } else {
              load();
          }
 
       } 
   }
      
```
3. setTimeOut循环调用动态改变fps
```jsx harmony
    // 
    function loop() {
      setTimeout(function() {
        //再次调用 fps 发生改变 即可改变
        loop()  
      },1000/window.fps)
    }
```
4. 点击球实现拖动功能
```jsx harmony
    // 涉及 mousedown mousemove mouseup 3个事件
    // 1. 判断是否点中目标  
    // 2. 点中后，设置 canMove boolean属性 true
    // 3. move过程中改变 x,y 
    // 4. mouseup 设置 canMove = false  
```
5. 使用面向对象进行重构
```jsx harmony
    // 利用es6 新特性 进行接口的设计 实现继承 * 注意在调用注册事件以及定时器this的引用指向问题
    // 1. 将场景逻辑抽离游戏逻辑 使用异步回调的方式给场景注入game; 再在game中注入stage
    // 2. 在game用使用代理的方式进行场景的更新，重绘
```
