function createScreen(name, objs, mainScreenLoop) {
    buttons[name] = []
    WindowMan.create(name, 0, 0, 1600, 900, null, [(mainScreenLoop != undefined ? { draw: mainScreenLoop } : []), buttons[name]])
    windows[name].bg = "rgb(0,0,0, 0.35)"
    for (var i in objs.buttons) {
        var b = objs.buttons[i]
        buttons[name].push(new Button(b[0], b[1], b[2], b[3], b[4], b[5], b[6], b[7], b[8]))
    }
}
function loadData() {
    var backgroundImage = new Image()
    backgroundImage.src = "./img/bg.png"
    createScreen("Title", {
        buttons: [
            [1600 / 2 - 100, 300, 200, 50, lg("Start"), c => { changeScreen("Start") }, "Title"],
            [1600 / 2 - 90, 400, 180, 50, lg("Options"), c => { changeScreen("Options") }, "Title"],
            [1600 / 2 - 90, 500, 180, 50, lg("MusicRoom"), c => { console.log(c) }, "Title", { locked: true }],
            [1600 / 2 - 80, 600, 160, 50, lg("Quit"), c => { close() }, "Title"],
            [300, 800, 200, 50, lg("About"), c => { changeScreen("About") }, "Title"],
            [530, 800, 270, 50, lg("Leaderboard"), c => { requestLeaderboard(leaderboard.page); changeScreen("Leaderboard") }, "Title"],
        ]
    }, () => { c.drawImage(backgroundImage, 0, 0, 1600, 900); c.fillStyle = "rgb(0,0,0, 0.8)"; c.fillRect(0, 0, 1600, 900) })
    createScreen("Start", {
        buttons: [
            [250, 300 - 100, 180, 50, lg("Normal"), (c, me) => { if(dialogueScript[langs[lang]] != undefined) Game.start("Normal") }, "Title", { over: () => { } }],
            [250, 400 - 100, 180, 50, lg("Hard"), (c, me) => { if(dialogueScript[langs[lang]] != undefined) Game.start("Hard") }, "Title", { over: () => { } }],
            [250, 500 - 100, 180, 50, lg("Nightmare"), (c, me) => { if(dialogueScript[langs[lang]] != undefined) Game.start("Nightmare") }, "Title", { over: () => { }, locked: true }],
            [250, 600 - 100, 180, 50, lg("Practice"), (c, me) => { /*if(dialogueScript[langs[lang]] != undefined) Game.start("Practice")*/ }, "Title", { over: () => { }, locked: true }],
            [265, 735 - 100, 150, 50, lg("Back"), c => { changeScreen("Title") }, "Title"]
        ]
    }, () => { c.drawImage(backgroundImage, 0, 0, 1600, 900); c.fillStyle = "rgb(0,0,0, 0.8)"; c.fillRect(0, 0, 1600, 900) })
    createScreen("Options", {
        buttons: [
            [300, 300 - 200, 300, 50, lg("Volume") + ": ", c => { music.bg.mute() }, "Title", { locked: true, over: () => { }, onDraw: me => { me.text = me.text.split(" ")[0] + " " + (music.bg.muted ? "--" : music.bg.Volume) } }],
            [250, 300 - 200, 50, 50, "-", c => { music.bg.volume(-5) }, "Title", {locked: true, }],
            [600, 300 - 200, 50, 50, "+", c => { music.bg.volume(5) }, "Title", {locked: true, }],
            [300, 400 - 200, 300, 50, "SFX: ", c => { music.sfx.mute() }, "Title", { locked: true, over: () => { }, onDraw: me => { me.text = me.text.split(" ")[0] + " " + (music.sfx.muted ? "--" : music.sfx.Volume) } }],
            [250, 400 - 200, 50, 50, "-", c => { music.sfx.volume(-5) }, "Title", {locked: true, }],
            [600, 400 - 200, 50, 50, "+", c => { music.sfx.volume(5) }, "Title", {locked: true, }],
            [300, 500 - 200, 300, 50, "", c => { resizeCanavs(1) }, "Title", { over: () => { }, onDraw: me => { me.text = canvasScale == 1 ? "1600x900" + " " + lg("Optimal") : Math.round(1600 * canvasScale) + "x" + Math.round(900 * canvasScale) } }],
            [250, 500 - 200, 50, 50, "-", c => { resizeCanavs(canvasScale - 0.1) }, "Title", {}],
            [600, 500 - 200, 50, 50, "+", c => { resizeCanavs(canvasScale + 0.1) }, "Title", {}],
            [250, 600 - 200, 200, 50, lg("Language") + ": ", c => { (lang < langs.length - 1) ? lang++ : lang = 0; loadData() }, "Title", { onDraw(me) { me.text = me.text.split(" ")[0] + " " + langs[lang] } }],
            [500, 600 - 200, 200, 50, lg("Render") + ": ", c => { renderMode = !renderMode }, "Title", { onDraw(me) { me.text = me.text.split(" ")[0] + " " + (renderMode ? 1 : 0) } }],
            [250, 700 - 200, 200, 50, lg("Dialogues") + ": ", c => { dialogues = !dialogues }, "Title", { onDraw(me) { me.text = me.text.split(" ")[0] + " " + (dialogues ? "On" : "Off") } }],
            [250, 835 - 200, 200, 50, lg("Back"), c => { changeScreen(lastScreen) }, "Title"]
        ]
    }, () => { c.drawImage(backgroundImage, 0, 0, 1600, 900); c.fillStyle = "rgb(0,0,0, 0.8)"; c.fillRect(0, 0, 1600, 900) })
    createScreen("About", {
        buttons: [
            [300, 800, 200, 50, lg("Back"), c => { changeScreen("Title") }, "Title"]
        ]
    }, () => {c.fillStyle = "rgb(0,0,0, 0.01)"; c.fillRect(0, 0, 1600, 900), c.fillStyle = "red"; c.textAlign = "center"; c.font = "45px calibri";c.fillText("Super-Ultra-Secret strategies: right click pauses the game.",800,100);c.fillText("I wanted to write something meaningful here, but I do not really have time for that.",800,200);c.fillText("Also.. Thanks ComradeBobo for polish translations.",800,300);c.fillText("Until the full release!",800,500)})
    createScreen("Game", {
        buttons: [
            [1600 - 60, 10, 50, 50, "exit", c => { changeScreen("Title") }, "GameNavigation", {}],
            [1600 - 120, 10, 50, 50, "pause", c => { changeScreen("Options") }, "GameNavigation", {}],
            [1600 - 180, 10, 50, 50, "restart", c => { let d = game.difficulty; game = new Game(d) }, "GameNavigation", {}],
            [7000, 650, 200, 50, lg("SaveRecord"), c => { saveRecord(); changeScreen("Title") }, "Title", {}]
        ]
    }, () => { game.update() })
    createScreen("Leaderboard", {
        buttons: [
            [700, 800, 200, 50, lg("Back"), c => { changeScreen("Title") }, "Title", {}],
            [915, 800, 40, 50, ">", c => { if(leaderboard.page + 1 <= Math.floor(leaderboard.content.length / leaderboard.pageSize))requestLeaderboard(leaderboard.page + 1) }, "Title", {}],
            [645, 800, 40, 50, "<", c => { if(leaderboard.page > 0) requestLeaderboard(leaderboard.page - 1) }, "Title", {}],
            [970, 800, 60, 50, ">>", c => { requestLeaderboard("string") }, "Title", {}],
            [570, 800, 60, 50, "<<", c => { requestLeaderboard(0) }, "Title", {}],
        ]
    }, () => { c.drawImage(backgroundImage, 0, 0, 1600, 900); c.fillStyle = "rgb(0,0,0, 0.9)"; c.fillRect(0, 0, 1600, 900); drawLeaderboard() })
    /*music.bg.add("MenuTheme", "audio/0.mp3")
    music.bg.add("a", "audio/1.mp3")*/
}
function checkForButton() {
    var setPointer = false
    for (let i in buttons[currentScreen]) {
        if (!buttons[currentScreen][i].locked && pointToRect({ x: mouse.movex, y: mouse.movey }, buttons[currentScreen][i])) {
            buttons[currentScreen][i].hover = true
            setPointer = true
        }
        else {
            buttons[currentScreen][i].hover = false
        }
    }
    if(document.getElementById("canvas").style.cursor != "none")
        document.getElementById("canvas").style.cursor = setPointer ? "pointer" : ""
    return setPointer

}

loadData()


// eventy
canvas.addEventListener("mousedown", e => {
    switch(e.which){
        case 1:
            let click = { x: e.offsetX / canvasScale, y: e.offsetY / canvasScale }
            /*if(checkForButton())
                music.sfx.play("click")*/
            var checked = checkForButton()
            for (let i in buttons[currentScreen]) {
                if (!buttons[currentScreen][i].locked && pointToRect(click, buttons[currentScreen][i])) {
                    buttons[currentScreen][i].hover = false
                    document.getElementById("canvas").style.cursor = ""
                    buttons[currentScreen][i].callback(click, buttons[currentScreen][i])
                    break
                }
            }
            if (typeof game == "object" && game.dialogue.opened && !checked) {
                game.dialogue.next()
            }
            checkForButton()
            break
        case 3:
            const {x, y, width, height} = windows.Ground
            if(e.which == 3 && game != undefined && pointToRect({x:mouse.movex,y:mouse.movey},{x,y,w:width,h:height})){
                if(!game.continue)
                    game.delay = !game.delay
                else
                    game.doContinue()
            }
            break
    }
})
canvas.addEventListener('mousemove', e => {
    mouse.screenDiffX = canvas.clientWidth - canvas.width
    mouse.screenDiffY = canvas.clientHeight - canvas.height
    mouse.movex = e.offsetX * canvas.width / canvas.clientWidth | 0
    mouse.movey = e.offsetY * canvas.height / canvas.clientHeight | 0
    checkForButton()
})

// spuštění hry
main(0)