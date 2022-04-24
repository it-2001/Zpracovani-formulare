var buttonStyles = {
    Title(butt, init) {
        if (init)
            return { frame: "gray", normal: "black", hover: "red", locked:"rgb(40,40,40)", text: { hover: "black", normal: "red" } }
        var col = butt.hover ? "hover" : "normal"
        c.fillStyle = butt.colors.frame
        c.fillRect(butt.x - 3, butt.y - 3, butt.w + 6, butt.h + 6)
        c.fillStyle = butt.colors[col]
        if(butt.locked)
            c.fillStyle = butt.colors.locked
        c.fillRect(butt.x, butt.y, butt.w, butt.h)
        c.fillStyle = butt.colors.text[col]
        c.font = "30px serif"
        c.textAlign = "center"
        c.fillText(butt.text, butt.x + butt.w / 2, butt.y + butt.h / 2 + c.font.split("px")[0] / 4)
    },
    GameNavigation(butt, init) {
        if (init){
            butt.images = {normal:new Image(), hover:new Image()}
            butt.images.normal.src = "./img/navig/" + butt.text + ".png"
            butt.images.hover.src = "./img/navig/" + butt.text + "Hover.png"
            return {  }
        }
        var col = butt.hover ? "hover" : "normal"
        c.drawImage(butt.images[col], butt.x, butt.y, butt.w, butt.h)
    },

}