class Game {
    constructor(difficulty) {
        this.difficulty = difficulty
        this.time = 0
        this.dialogue = new Dialogue()
        this.fight = false
        this.player = new Player()
        this.projectiles = []
        this.marks = []
        WindowMan.create("Ground", 800 - 400, 550 - 225, 800, 450, 0, [{ draw: this.drawGround }, this.marks, this.projectiles])
        windows.Ground.bg = "gray"
        windows.Ground.xOrigin = 400
        windows.Ground.yOrigin = 150
        this.enemy
        this.resources = {
            score: 0,
            hp: 3,
            hits: 0,
            continues: 0
        }
        this.images = ["hp.png", "crosshair.png"]
        for (var i in this.images) {
            let src = "./img/" + this.images[i]
            this.images[i] = new Image()
            this.images[i].src = src
        }
        this.dice = new Dice()
        this.enemy = 2
        this.spell = 0
        console.log(this.spell)
        this.dialogue.open()
        this.continue = false
        this.clear = false
    }
    cleared() {
        this.clear = true
    }
    startFight(delay) {
        this.delay = delay
        this.fight = true
        characters[this.enemy].t = 0
    }
    DIF(normal, hard) {
        return this.difficulty == "Normal" ? normal : hard
    }
    logic() {
        if (this.delay || this.continue) return false
        if (this.fight)
            characters[this.enemy].update(this.spell)
        this.player.move()
        for (var i in this.projectiles) {
            this.projectiles[i].update()
        }
        for (var i in this.marks) {
            this.marks[i].update()
        }
        clearArr(this.projectiles)
        clearArr(this.marks)
    }
    draw() {
        windows.Game.rectangle(800, 450, 1600, 900, "black")
        for (var i = 0; i < this.resources.hp; i++) {
            windows.Game.image(this.images[0], 200 + i * 60, 50, 48, 48)
        }

        buttons.Game[3].x = 7000
        if (this.fight) {
            windows.Game.rectangle(800, 550, 806, 456, "white")
            windows.Ground.draw()
            c.strokeStyle = "red"
            c.font = "50px calibri"
            c.textAlign = "left"
            var timeLeft = characters[this.enemy].remaining != undefined ? Math.round(characters[this.enemy].remaining / 6) / 10 : ""
            if (!this.clear) {
                c.strokeText(timeLeft, 450, 370)
                c.strokeText(Math.round(fps), 1150, 370)
            }
            c.fillStyle = "white"
            c.textAlign = "center"
            c.font = "30px calibri"
            c.fillText("Score: " + game.resources.score, 800, 310)
            if (this.clear) {
                buttons.Game[3].x = 700
                windows.Ground.rectangle(0, 0, 800, 550, "rgba(0,0,0,0.5)")
                c.font = "30px sans"
                c.textAlign = "center"
                c.strokeText("Congratulations on clearing " + (this.difficulty) + (this.resources.continues == 0 ? " without continues!" : "!"), 800, 380)
                c.strokeText("------------------------------------------------------------", 800, 400)
                c.font = "25px sans"
                c.strokeText("Score: " + this.resources.score, 800, 420)
                c.strokeText("Hits: " + this.resources.hits, 800, 460)
                c.strokeText("Continues: " + this.resources.continues, 800, 500)
                c.strokeStyle = "magenta"
                if (this.difficulty == "Normal") {
                    c.strokeText((this.resources.continues == 0 ? "Maybe you will be able to clear Hard now." : "Try to clear without using continues!"), 800, 540)
                    c.strokeText((this.resources.continues == 0 ? "Maybe..." : "You can do it."), 800, 580)
                } else if (this.difficulty == "Hard") {
                    c.strokeText((this.resources.continues == 0 ? "You sir, have earned my respect!" : "Now without continues!"), 800, 540)
                    c.strokeText((this.resources.continues == 0 ? "But you should try touching some grass." : "It is all about the practice."), 800, 580)
                }
            }
            else if (this.delay) {
                windows.Ground.rectangle(0, 0, 800, 550, "rgba(0,0,0,0.5)")
                c.textAlign = "center"
                c.strokeText("Right click to continue...", 800, 550)
            }
            else if (this.continue) {
                windows.Ground.rectangle(0, 0, 800, 550, "rgba(0,0,0,0.5)")
                c.textAlign = "center"
                c.strokeText("Right click to continue with 0 score...", 800, 550)
            }
        }
        const { x, y, width, height } = windows.Ground
        if (pointToRect({ x: mouse.movex, y: mouse.movey }, { x, y, w: width, h: height }) && !checkForButton()) {
            document.getElementById("canvas").style.cursor = "none"
            c.drawImage(this.images[1], mouse.movex - 10, mouse.movey - 10, 20, 20)
        } else if (document.getElementById("canvas").style.cursor == "none")
            document.getElementById("canvas").style.cursor = ""
        if (this.dice.opened) {
            this.dice.draw()
        }
        this.dialogue.draw()
    }
    drawGround() {
        windows.Ground.rectangle(0, 0, 800, 450, "black")
        game.player.draw()
    }
    update() {
        if (this.resources.hp <= 0)
            this.continue = true
        if (!this.dialogue.opened) {
            this.time += dt
        }
        if (this.fight)
            this.logic()
        this.draw()
    }
    lose(type) {
        switch (type) {
            case "hp":
                this.resources.hp--
                this.resources.hits++
                for (var i in this.projectiles)
                    if (distance(this.player.x, this.player.y, this.projectiles[i].x, this.projectiles[i].y) < 120)
                        this.projectiles[i].toDelete = true
                return true
        }
    }
    doContinue() {
        this.resources.hp = 3
        this.resources.score = 0
        for (var i in this.projectiles)
            this.projectiles[i].toDelete = true
        for (var i in this.marks)
            this.marks[i].destroy()
        this.continue = false
        this.resources.continues++
    }
    static start(diffi, part) {
        currentScreen = "Game"
        game = new Game(diffi)
    }
}
class Player {
    constructor() {
        this.x = 0
        this.y = 200
        this.r = 5
        this.s = 15
    }
    draw() {
        windows.Ground.arc(this.x, this.y, 5, "red")
    }
    move() {
        if (distance(this.x, this.y, mouse.movex - 800, mouse.movey - 550) < this.s * dt) {
            this.x = mouse.movex - 800
            this.y = mouse.movey - 550
        } else {
            var x = this.x + xxs(this.x, this.y, mouse.movex - 800, mouse.movey - 550) * this.s * dt
            var y = this.y + yys(this.x, this.y, mouse.movex - 800, mouse.movey - 550) * this.s * dt
            this.x = x
            this.y = y
        }
        this.border()
    }
    border() {/*
        this.x = Math.abs(this.x) > 395 ? this.x / Math.abs(this.x) * 395 : this.x
        this.y = Math.abs(this.y) > 220 ? this.y / Math.abs(this.y) * 220 : this.y*/
        this.x = Math.min(Math.max(this.x, -395), 395)
        this.y = Math.min(Math.max(this.y, -220), 220)
    }
}
/*
const x = windows.Ground.x
const {x, y, width, height} = windows.Ground
const config = {
    a: aaa || 1,
    b: bbb || 0,
}
doSomething(
    {x, y, w: width, h: height}
    //{...windows.Ground,w:windows.Ground.width,h:windows.Ground.height} // x y w = width h = height
    )
    */

let f = n => n <= 1 ? 1 : n * f(n - 1)