class Dialogue {
    constructor() {
        this.time = 0
        this.currentChapter = 0
        this.currentScript = 1
        this.text = ""
        this.enemy = 0
        this.opened = false
        this.shouting = false
        this.declaring = false
        this.now = { shouting: [], declaring: [] }
        this.openTime = 60
        this.lastClick = 60
        this.clickInterval = 10
    }
    draw() {
        if (this.opened) {
            this.time += dt
            if(characters[this.enemy].image != null)
                c.drawImage(characters[this.enemy].image, 800, 200,500,400)
            windows.Game.rectangle(800, 700, 1600 * (this.time / this.openTime), 400, "rgba(50,50,50,0.5)")
            if(this.time < this.openTime) return false
            c.fillStyle = "white"
            c.font = "50px calibri"
            c.textAlign = "left"
            c.fillText(characters[this.enemy].name, 600, 550)
            if(characters[this.enemy].title != ""){
                c.fillStyle = "gray"
                var textSize = c.measureText(characters[this.enemy].name).width
                c.font = "45px calibri"
                c.fillText(", " + characters[this.enemy].title, 600 + textSize, 550)
            }
            c.font = "50px calibri"
            c.fillStyle = "white"
            c.textAlign = this.enemy == 0 ? "left" : "right" 
            c.fillText(this.text, this.enemy == 0 ? 100 : 1500, 700)
        }
        c.textAlign = "center"
        c.font = "40px calibri"
        var toDelete = { shouting: 0, declaring: 0 }
        for (var j of ["declaring", "shouting"])
            for (var i in this.now[j]) {
                var src = this.now[j][i]
                var type = j == "declaring" ? true : false
                src.time -= dt
                if(src.time < 0)
                    toDelete[j]++
                c.fillStyle = "gray"
                c.fillRect(src.source.x - 3, src.source.y - 3, src.source.w + 6, src.source.h + 6)
                c.fillStyle = type ? "white" : "red"
                c.fillRect(src.source.x, src.source.y, src.source.w, src.source.h)
                c.fillStyle = "black"
                c.fillText(src.text, src.source.x + src.source.w / 2, src.source.y + src.source.h / 2 + 12.5)
            }
        for (var j of ["declaring", "shouting"]){
            var i = toDelete[j]
            while(i > 0){
                for(var k in this.now[j])
                    if(this.now[j][k].time < 0){
                        this.now[j].splice(k,1)
                        i--
                    }
            }
        }
    }
    open() {
        if (!dialogues){ 
            setTimeout(()=>{game.dialogue.close()}, 50)
            return false
        }
        this.time = 0
        this.opened = true
        this.next()
    }
    next() {
        if(this.time > this.openTime && this.time - this.lastClick > this.clickInterval || this.time == 0){
            var current = getDialogue(this.currentChapter, this.currentScript)
            if (current === undefined) {
                this.close()
                return false
            }
            if(current !== null){
                this.text = current[1]
                this.enemy = current[0]
            }
            this.currentScript++
            this.lastClick = this.time
        }
    }
    close() {
        this.currentChapter++
        this.currentScript = 1
        this.opened = false
        game.startFight()
        game.delay = true
    }
    mono(type, duration, content, source) { // shouting declaring
        console.log(type, duration, content, source)
        if (source == 1 || undefined)
            source = { x: 800, y: 210, w: 500, h: 100 }
        else if (source == 0)
            source = { x: 300, y: 790, w: 500, h: 100 }
        this.now[type].push({
            text: content,
            time: duration,
            source: source
        })
    }
}