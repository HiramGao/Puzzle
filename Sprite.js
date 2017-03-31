;!function () {
  //精灵类
  function Sprite(canvas, x, y, w, h, rotation) {
    if (!this instanceof Sprite) {
      return new Sprite()
    }
    //canvas
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    //坐标
    this.x = x;
    this.y = y;
    //大小
    this.w = w;
    this.h = h;
    //旋转角度
    this.rotation = rotation;
    this.DEG_TO_RAD/*CONST*/ = Math.PI / 180;  // 一角度多少弧度
    this._object = []; // 存放Sprite
    this.methods = [];
  }

  var SpriteFn = Sprite.prototype;

  //将锚点放到中心点
  SpriteFn._beforeDraw = function () {
    var ctx = this.ctx;

    ctx.translate(this.w / 2 + this.x, this.h / 2 + this.y);
    if (this.rotation % 360 !== 0) {
      ctx.rotate(this.DEG_TO_RAD * this.rotation);
    }
    ctx.translate(-this.w / 2 - this.x, -this.h / 2 - this.y);

    this.draw();   // 画的方法
    this._drawall(); // 画出所有子Sprite


    return this;
  };

  SpriteFn.draw = function () {
    //实现这个方法
  };
  //开始执行精灵
  SpriteFn.run = function () {
    var i = 0, method;
    for (; method = this.methods[i]; i++) {
      method.call(this);
    }
    return this._beforeDraw();
  };
  //添加执行函数，每次run都会执行这些方法
  SpriteFn.addRunMethod = function (method) {
    this.methods.push(method);
    return this;
  };
  //绘制所有子精灵
  SpriteFn._drawall = function () {
    var ctx = this.ctx;
    if (this._object.length > 0) {
      for (var i = 0, obj; obj = this._object[i]; i++) {
        ctx.save();
        obj.run();
        ctx.restore()
      }
    }
    return this;
  };
  //得到所有子精灵或者获取指定index的子精灵
  SpriteFn.child = function (index) {
    if (index !== void 0) {
      return this._object[index]
    } else {
      return this._object;
    }
  };
  //添加子精灵
  SpriteFn.addChild = function (obj) {
    this._object.push(obj);
    return this;
  };
  //移除子精灵
  SpriteFn.removeChild = function (obj) {
    if (this.child().indexOf(obj) !== void 0) {
      this._object.splice(this.child().indexOf(obj), 1)
    }
    return this;
  };
  SpriteFn.clearChild = function () {
    this._object.length = 0;
  };
  window.Sprite = Sprite;
}();