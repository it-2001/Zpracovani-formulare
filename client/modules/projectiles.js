class Ball {
    constructor(x, y, r, data) {
        this.x = x
        this.y = y
        this.origR = r
        this.r = r
        this.xs = 0
        this.ys = 0
        this.s = 0
        this.time = 0
        this.toDelete = false
        for (var i in data) {
            this[i] = data[i]
        }
    }
    draw() {
        windows.Ground.arc(this.x, this.y, this.r, this.r < 8 ? "white" : "rgba(255,255,255,0.5)")
    }
    move() {
        this.x += this.xs * this.s * dt
        this.y += this.ys * this.s * dt
    }
    update() {
        this.time += dt
        this.move()
        this.collision()
        if (this.toDelete || this.x > 400 || this.x < -400 || this.y > 225 || this.y < -225)
            this.destroy()
    }
    collision() {
        if (distance(this.x, this.y, game.player.x, game.player.y) < (this.r * 0.7) + game.player.r && !this.toDelete) {
            if (game.lose("hp"))
                this.toDelete = true
        }
        if(distance(this.x,this.y, game.player.x, game.player.y) < this.r * 4 + game.player.r)
            game.resources.score += 10
    }
    destroy() {
        this.r -= (this.origR / 15) * dt
        if(this.r < 0)
            this.destroyMe = true
    }
}

class Mark {
    constructor(x, y, detonation, time) {
        this.x = x
        this.y = y
        this.detonation = detonation
        this.time = time
        this.maxTime = time
        this.r = 40
    }
    draw() {
        windows.Ground.arc(this.x, this.y, Math.abs(this.r * (this.time / this.maxTime)), "rgba(0,200,200,0.5)")
    }
    update() {
        this.time -= dt
        if (this.time < 0) {
            this.destroy()
            this.detonation(this)
        }
    }
    destroy(){
        this.destroyMe = true
    }
}