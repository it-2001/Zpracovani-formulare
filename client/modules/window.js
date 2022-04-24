var windows = { order: [] };
class WindowMan {
    constructor(x, y, width, height, renderMode, drawing) {
        this.drawing = drawing;
        this.filter = "none";
        this.effects = {
            shaking: 0
        };
        this.afterEffects = {
            x: x,
            y: y
        }
        this.xDrawOrigin = 0.5;
        this.yDrawOrigin = 0.5;
        this.scale = 1;
        this.wScale = 1;
        this.hScale = 1;
        this.xOrigin = x;
        this.yOrigin = y;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.renderMode = renderMode;
        this.alpha = 1;
        this.bg = undefined;
    }
    draw(r) {
        c.save();
        c.beginPath();
        c.rect(this.x, this.y, this.width, this.height);
        c.clip();
        c.globalAlpha = this.alpha;
        if (this.bg != undefined) {
            c.fillStyle = this.bg;
            c.fillRect(this.x, this.y, this.width, this.height);
        }
        this.applyEffencts();

        for (var i in this.drawing) {
            try {
                for (var j in this.drawing[i])
                    this.drawing[i][j].draw();
            }
            catch {
                this.drawing[i].draw();
            }
        }
        c.restore();
        if (!r && this.effects.shaking > 0)
            this.draw(true)
    }
    getPos(x, y, w, h) {
        return { x: x + this.afterEffects.x - w * this.xDrawOrigin * this.wScale + this.xOrigin, y: y + this.afterEffects.y - h * this.yDrawOrigin * this.hScale + this.yOrigin }
    }
    getSize(w, h) {
        return { w: w * this.scale * this.wScale, h: h * this.scale * this.hScale }
    }
    rectangle(x, y, w, h, color) {
        c.fillStyle = color;
        c.filter = this.filter;
        c.fillRect(this.getPos(x, y, w, h).x, this.getPos(x, y, w, h).y, this.getSize(w, h).w, this.getSize(w, h).h);
    }
    arc(x, y, r, color) {
        c.fillStyle = color;
        c.filter = this.filter;
        c.beginPath();
        c.arc(this.getPos(x, y, 0, 0).x, this.getPos(x, y, 0, 0).y, (this.getSize(r, r).w + this.getSize(r, r).h) / 2, 0, Math.PI * 2, false);
        c.fill();
    }
    image(image, x, y, w, h) {
        c.filter = this.filter;
        c.drawImage(image, this.getPos(x, y, w, h).x, this.getPos(x, y, w, h).y, this.getSize(w, h).w, this.getSize(w, h).h);
    }
    applyEffencts() {
        for (var i in this.effects)
            switch (i) {
                case "shaking":
                    this.afterEffects.x = this.xOrigin + (Math.random() - 0.5) * this.effects.shaking;
                    this.afterEffects.y = this.xOrigin + (Math.random() - 0.5) * this.effects.shaking;
                    break;
            }
    }
    static create(name, x, y, width, height, renderMode, drawing) {
        windows[name] = (new WindowMan(x, y, width, height, renderMode, drawing));
        windows.order.push(name);
        return windows[name]
    }
    static drawAll() {
        for (var i of windows.order) {
            windows[i].draw();
        }
    }
    static destroy(name) {
        delete windows[name]
    }
}