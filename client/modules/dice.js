class Dice {
    constructor() {
        this.opened = false
        this.buttons = {
            roll: new Button(450, 600, 100, 50, "ROLL!", me => { game.dice.roll() }, "Title" ),
            take: new Button(560, 600, 100, 50, "Take", me => { 
                var that = game.dice
                that.doneSpells.push(that.result)
                that.close()
                game.startFight(that.character, that.result)
             }, "Title", { locked: true }),
            skip: new Button(670, 600, 100, 50, "Skip", me => {
                var that = game.dice
                game.resources.hp--
                that.doneSpells.push(that.result)
                game.dice.open()
            }, "Title", { locked: true })
        }
        this.x = 400
        this.y = 225
        this.w = 800
        this.h = 450
        this.rolling = 300
        this.result = 0
        this.character = { name: "dada", spells: [{ name: "spellbreak" }, { name: "something cool" }, { name: "whooho jsem kouzelník" }] }
        this.doneSpells = []
    }
    draw() {
        if (this.rolling < 300 && this.rolling > 0) {
            if (this.rolling % 5 < dt && (Math.random() * 300) < this.rolling) {
                do {
                    var rolling = false
                    this.result = Math.floor(Math.random() * this.character.spells.length)
                    for (var i in this.doneSpells)
                        if (this.result == this.doneSpells[i])
                            rolling = true
                } while (rolling)
            }
            this.rolling -= dt
            if (this.rolling < 0)
                this.rollResult()
        }
        c.fillStyle = "rgba(20,20,20,1)"
        c.fillRect(this.x, this.y, this.w, this.h)
        c.fillStyle = "white"
        c.font = "40px sans"
        c.textAlign = "left"
        c.fillText(this.character.name + " offers you a dice roll.", 410, 275)
        for (var i in this.character.spells) {
            c.fillStyle = this.doneSpells.indexOf(Number(i)) == -1 ? "white" : "gray"
            if (Number(i) == this.result)
                c.fillStyle = "aqua"
            c.textAlign = "right"
            c.font = "30px calibri"
            c.fillText(i + ". " + this.character.spells[i].name, 1150, 330 + i * 35)
        }
        c.fillStyle = "white"
        c.fillRect(475 - 3, 450 - 3, 75 + 6, 75 + 6)
        c.fillStyle = "black"
        c.fillRect(475, 450, 75, 75)
        c.fillStyle = "white"
        c.font = "70px sans"
        c.textAlign = "center"
        c.fillText(this.result, 475 + 75 / 2, 450 + 60)
        for (var i in this.buttons)
            this.buttons[i].draw()
    }
    rollResult() {
        this.buttons.take.locked = false
        this.buttons.skip.locked = false
        checkForButton()

    }
    roll() {
        if (this.doneSpells.length >= this.character.requiredSpells) return false
        this.rolling = 300
        this.buttons.roll.locked = true
        this.rolling -= dt
    }
    open(character, doneSpells) {
        if(buttons.Game.indexOf(this.buttons.roll) == -1)
        for (var i in this.buttons)
            buttons.Game.push(this.buttons[i])
        this.buttons.roll.locked = false
        this.buttons.skip.locked = true
        this.buttons.take.locked = true
        if (character != undefined)
            this.character = character
        if (doneSpells != undefined)
            this.doneSpells = doneSpells
        this.opened = true
    }
    close() {
        for (var i in this.buttons){
            var idx = buttons.Game.indexOf(this.buttons[i])
            buttons.Game.splice(idx, 1)
        }
        this.opened = false
    }
}