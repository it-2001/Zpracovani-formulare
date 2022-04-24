class Character {
    constructor(name, title, image, spells, requiredSpells, data) {
        this.name = name
        this.title = title
        this.image = new Image()
        this.image.src = (image == null) ? "./img/characters/blankImage.png" : "./img/characters/" + image
        if (image == null)
            this.image = null
        this.spells = spells
        this.requiredSpells = requiredSpells
        this.t = 0
        this.dialogue = null
        this.limit = 0
        for (var i in data)
            this[i] = data
    }
    timeOut(limit) {
        this.remaining = limit - this.t
        if (this.remaining < 0) {
            game.spell++
            game.startFight()
        }
        return this.remaining
    }
    update(spell) {
        this.t += dt
        switch (spell) {
            case 0:
                this.timeOut(1000)
                if (this.t == dt)
                    game.marks.push(new Mark(0, 0, me => { }, 60))
                if (this.t % 1 < dt && this.t > 60) {
                    game.projectiles.push(new Ball(0, 0, 5, { xs: (Math.random() - 0.5) * 2, ys: (Math.random() - 0.5) * 2, s: game.DIF(2, 5) }))
                }
                break
            case 1:
                this.timeOut(700)
                if (this.t % 3 < dt && this.t > 100)
                    game.projectiles.push(new Ball(game.player.x, -(this.t % 225), 5, { ys: (Math.random() * 0.5) + 0.5, s: game.DIF(5, 4) }))
                break
            case 2:
                this.timeOut(1000)
                if (this.t % game.DIF(3, 1.8) < dt)
                    game.projectiles.push(new Ball((this.t % 100) * 8 - 400, -225 + Math.floor((this.t % 500) / 100) * 110, 5, { s: game.DIF(1, 1) }))
                if (this.t % 30 < dt && this.t < 300 && game.DIF(false, true)) {
                    game.projectiles.push(new Ball(this.t - 400, -225, 50, { s: 5, ys: 1 }))
                    game.projectiles.push(new Ball(400 - this.t, -225, 50, { s: 5, ys: 1 }))
                }
                if (this.t % 500 < dt)
                    for (var i in game.projectiles) {
                        game.projectiles[i].xs = (Math.random() - 0.5) * 2
                        game.projectiles[i].ys = (Math.random() - 0.5) * 2
                        windows.Ground.effects.shaking = 6
                        setTimeout(() => {
                            windows.Ground.effects.shaking = 0
                        }, 150);
                    }
                break
            case 3:
                this.timeOut(800)
                if (this.t % 13 < dt) {
                    game.marks.push(new Mark(((this.t % 80) * 10 - 400), Math.floor(this.t / 80) * 50 - 225, me => {
                        for (var i = 0; i < game.DIF(5, 10); i++) {
                            game.projectiles.push(new Ball(me.x, me.y, 5, { xs: (Math.random() - 0.5) * 2, ys: (Math.random() - 0.5) * 2, s: game.DIF(Math.random() * 4, Math.random() * 3) }))
                        }
                    }, 60))
                }
                break
            case 4:
                this.timeOut(400)
                break
            case 5:
                this.timeOut(400)
                if ((this.t + 1) % 5 < dt) {
                    for (var i in game.projectiles) game.projectiles[i].toDelete = true
                    if(this.t < 300)
                    for (var i = 0; i < 5; i++) {
                        game.marks.push(new Mark(game.player.x - 100 + i * 50, game.player.y - 100 + i * 50, me => {
                            for (var i = 0; i < game.DIF(5, 10); i++) {
                                game.projectiles.push(new Ball(me.x, me.y, 5, { xs: (Math.random() - 0.5) * 2, ys: (Math.random() - 0.5) * 2, s: game.DIF(Math.random() * 4, Math.random() * 3) }))
                            }
                        }, 60))
                    }

                }
                break
            case 6:
                this.timeOut(500)
                if (this.t % 13 < dt) {
                    game.marks.push(new Mark(((this.t % 80) * 10 - 400), Math.floor(this.t / 80) * 50 - 225, me => {
                        for (var i = 0; i < game.DIF(5, 10); i++) {
                            game.projectiles.push(new Ball(me.x, me.y, 5, { xs: (Math.random() - 0.5) * 2, ys: (Math.random() - 0.5) * 2, s: game.DIF(Math.random() * 4, Math.random() * 3) }))
                        }
                    }, 60))
                }
                if (this.t % game.DIF(3, 1.8) < dt)
                    game.projectiles.push(new Ball((this.t % 100) * 8 - 400, -225 + Math.floor((this.t % 500) / 100) * 110, 5, { s: game.DIF(1, 1) }))
                if (this.t % 500 < dt)
                    for (var i in game.projectiles) {
                        game.projectiles[i].xs = xxs(game.player.x, game.player.y, game.projectiles[i].x, game.projectiles[i].y)
                        game.projectiles[i].ys = yys(game.player.x, game.player.y, game.projectiles[i].x, game.projectiles[i].y)
                        windows.Ground.effects.shaking = 6
                        setTimeout(() => {
                            windows.Ground.effects.shaking = 0
                        }, 150);
                    }
                if (this.t == dt)
                    game.marks.push(new Mark(0, 0, me => { }, 60))
                if (this.t % 1 < dt && this.t > 60) {
                    game.projectiles.push(new Ball(0, 0, 5, { xs: (Math.random() - 0.5) * 2, ys: (Math.random() - 0.5) * 2, s: game.DIF(2, 5) }))
                }
                if (this.t % 3 < dt && this.t > 100)
                    game.projectiles.push(new Ball(game.player.x, -(this.t % 225), 5, { ys: (Math.random() * 0.5) + 0.5, s: game.DIF(5, 4) }))
                break
            case 7:
                this.timeOut(60)
                if ((this.t + 1) % 5 < dt)
                    for (var i in game.projectiles) game.projectiles[i].toDelete = true
                break
            case 8:
                for (var i in game.projectiles) game.projectiles[i].toDelete = true
                for (var i in game.marks) game.marks[i].destroy()
                game.cleared()
                break
        }
    }
}
var characters = [
    new Character("", "", "./1.jpg", [], 0),
    new Character("Unknown", "", null, [], 0),
    new Character("Bea-n", "She agreed to be a character here :)", "./2.jpg", [{ name: "spellbreak" }, { name: "something cool" }, { name: "whooho jsem kouzelník" }, { name: "a uz nevim" }], 3, { dialogue: 1 }),
]