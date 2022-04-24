// canvas
const canvas = document.getElementById("canvas")
const c = canvas.getContext("2d")
const socket = io();


// třídy
class Button {
    constructor(x, y, w, h, text, callback, style, data/* hoverFun locked onDraw*/) {
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.text = text
        this.callback = callback
        this.style = style
        this.locked = false
        this.hover = false
        this.colors = buttonStyles[style](this, true)
        this.value = 1
        this.onDraw = a => null
        this.over = () => null
        for (var i in data)
            if(this[i] != undefined)
                this[i] = data[i]
    }
    draw() {
        this.onDraw(this)
        buttonStyles[this.style](this, false)
    }
}

// funkce
function evalFPS() { // funkce pro výpočet fps
    let lastRender = timeStamp
    timeStamp = Date.now()
    dt = (timeStamp - lastRender) / (1000 / 60)
    fps = 60 / dt
}
function changeScreen(name){
    lastScreen = currentScreen
    currentScreen = name
}
function resizeCanavs(value) {
    if(value < 0.5 || value > 1.5)
        return null
    canvasScale = value
    canvas.style.width = 1600 * canvasScale + "px"
    canvas.style.height = 900 * canvasScale + "px"
    return { w: canvas.style.width, h: canvas.style.height }
}
function overUnderFlow(val, min, max){
    if(val > max) return max
    if(val < min) return min
    return val
}
function xxs(startX, startY, x, y) {
    var a = x - startX
    var b = y - startY
    var c = Math.sqrt(a * a + b * b)
    var xs = a / c
    return xs
}
function yys(startX, startY, x, y) {
    var a = x - startX
    var b = y - startY
    var c = Math.sqrt(a * a + b * b)
    var ys = b / c
    return ys
}
function distance(startX, startY, x, y) {
    var a = x - startX
    var b = y - startY
    var c = Math.sqrt(a * a + b * b)
    return c
}
function clearArr(arr){
    do {
        var repeat = false
        for (var i in arr) {
            if (arr[i].destroyMe) {
                arr.splice(i, 1)
                repeat = true
            }
        }
    }while(repeat)
}
let rectToRect = (rect1, rect2) => (rect1.x > rect2.x - rect1.w && rect1.x < rect2.x + rect2.w && rect1.y > rect2.y - rect1.h && rect1.y < rect2.y + rect2.h) ? true : false
let pointToRect = (point, rect) => (point.x > rect.x && point.x < rect.x + rect.w && point.y > rect.y && point.y < rect.y + rect.h) ? true : false

// proměnné
let currentScreen = "Title"
let lastScreen = ""
let game
let pause = false
let timeStamp = 0
let fps = 0
let dt = 0
let mouse = {
    movex: undefined,
    movey: undefined,
    screenDiffX: 0,
    screenDiffY: 0
}
let buttons = {}
let canvasScale = 1
let lang = 0
let dialogues = true
let music = new AudioPLR()
let renderMode = false
let leaderboard = {
    page: 0,
    content:[

    ],
    pageSize:7
}

// main loop
function main() {
    // výpočet fps
    evalFPS()

    // spuštění příštího cyklu
    if (!pause && renderMode)
        var toBeDrawn = timeStamp + (1000 / 60)


    // váš kód
    if (currentScreen in windows)
        windows[currentScreen].draw()

    renderMode ? setTimeout(main, toBeDrawn - Date.now()) : requestAnimationFrame(main)
}