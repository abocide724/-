class Tool {
  // random number.
  static randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  // random color rgb.
  static randomColorRGB() {
    return (
      "rgb(" +
      this.randomNumber(0, 255) +
      ", " +
      this.randomNumber(0, 255) +
      ", " +
      this.randomNumber(0, 255) +
      ")"
    );
  }
  // random color hsl.
  static randomColorHSL(saturation, lightness) {
    return (
      "hsl(" +
      this.randomNumber(0, 360) +
      ", " +
      saturation +
      "%, " +
      lightness +
      "%)"
    );
  }
}

let canvas;

class Canvas {
  constructor() {
    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.width = this.canvas.width = window.innerWidth;
    this.height = this.canvas.height = window.innerHeight;
    this.hearts = [];
    this.particles = [];
    this.heartNum = 1;
    this.startSize;
    this.mouseX = null;
    this.mouseY = null;
    if (this.width < 768) {
      this.startSize = 75;
    } else {
      this.startSize = 150;
    }
  }

  init() {
    for (let i = 0; i < this.heartNum; i++) {
      const s = new Heart(
        this.ctx,
        this.width / 2,
        this.height / 2,
        this.startSize
      );
      this.hearts.push(s);
    }
  }

  render() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    for (let i = 0; i < this.hearts.length; i++) {
      this.hearts[i].render(i);
    }
    for (let i = 0; i < this.particles.length; i++) {
      this.particles[i].render(i);
    }
  }

  resize() {
    this.width = this.canvas.width = window.innerWidth;
    this.height = this.canvas.height = window.innerHeight;
    if (this.width < 768) {
      this.startSize = 75;
    } else {
      this.startSize = 150;
    }
  }
}

class Heart {
  constructor(ctx, x, y, r) {
    this.ctx = ctx;
    this.init(x, y, r);
  }

  init(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r * 0.8;
    this.maxR = r;
    this.c = Tool.randomColorHSL(80, 60);
    this.a = 0;
    this.rad = (this.a * Math.PI) / 180;
    this.v = {
      r: 0
    };
    this.l = 50;
    this.hover = false;
  }

  draw() {
    const ctx = this.ctx;
    ctx.save();
    ctx.fillStyle = this.c;
    if (this.hover === true) {
      ctx.translate(this.x, this.y);
      ctx.rotate(Math.tan(this.rad));
      ctx.translate(-this.x, -this.y);
    }
    ctx.beginPath();
    ctx.moveTo(this.x, this.y + this.r);
    ctx.bezierCurveTo(
      this.x - this.r - this.r / 5,
      this.y + this.r / 1.5,
      this.x - this.r,
      this.y - this.r,
      this.x,
      this.y - this.r / 3
    );
    ctx.bezierCurveTo(
      this.x + this.r,
      this.y - this.r,
      this.x + this.r + this.r / 5,
      this.y + this.r / 1.5,
      this.x,
      this.y + this.r
    );
    ctx.closePath();
    ctx.fill();
    if (ctx.isPointInPath(canvas.mouseX, canvas.mouseY)) {
      this.hover = true;
    } else {
      this.hover = false;
    }
    ctx.restore();
  }

  stretch() {
    this.v.r += (this.maxR - this.r) * 0.1;
    this.v.r *= 0.9;
    this.r += this.v.r;
    if (this.l < 0) {
      this.l = 50;
      this.r = this.r * 0.8;
      this.c = Tool.randomColorHSL(80, 60);
      const num = Tool.randomNumber(12, 36);
      for (let i = 0; i < num; i++) {
        let p = new Particle(this.ctx, this.x, this.y, this.c);
        canvas.particles.push(p);
      }
    }
  }

  updateParams() {
    this.a += 5;
    this.rad = (this.a * Math.PI) / 180;
    this.l -= 1;
  }

  render() {
    this.updateParams();
    this.stretch();
    this.draw();
  }
}

class Particle {
  constructor(ctx, x, y, c) {
    this.ctx = ctx;
    this.init(x, y, c);
  }

  init(x, y, c) {
    this.x = x;
    this.y = y;
    this.c = c;
    this.r = 1;
    this.v = {
      x:
        Math.cos((Tool.randomNumber(0, 360) * Math.PI) / 180) *
        10 *
        Math.random(),
      y:
        Math.sin((Tool.randomNumber(0, 360) * Math.PI) / 180) *
        10 *
        Math.random()
    };
    this.ga = Math.random();
  }

  draw() {
    const ctx = this.ctx;
    ctx.save();
    ctx.fillStyle = this.c;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.restore();
  }

  updatePosition() {
    this.v.y += 0.05;
    this.x += this.v.x;
    this.y += this.v.y;
    this.r += 0.1;
  }

  deleteParticle(i) {
    if (this.y > canvas.height + this.r) {
      canvas.particles.splice(i, 1);
    }
  }

  render(i) {
    this.updatePosition();
    this.deleteParticle(i);
    this.draw();
  }
}

(function () {
  "use strict";
  window.addEventListener("load", function () {
    canvas = new Canvas();

    canvas.init();
    function render() {
      window.requestAnimationFrame(function () {
        canvas.render();
        render();
      });
    }

    render();

    // event
    window.addEventListener("resize", function () {
      canvas.resize();
      canvas.hearts = [];
      canvas.particles = [];
      canvas.init();
    }, false);
    
    window.addEventListener('mousemove', function (e) {
      canvas.mouseX = e.clientX;
      canvas.mouseY = e.clientY;
    }, false);
    
    canvas.canvas.addEventListener('touchmove', function (e) {
      let touch = e.targetTouches[0];
      canvas.mouseX = touch.pageX;
      canvas.mouseY = touch.pageY;
    });
    
  });
})();