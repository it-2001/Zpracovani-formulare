function requestLeaderboard(page) {
    socket.emit("read", response => {
        leaderboard.content = response.response
    })
    leaderboard.page = page
    if (typeof page == "string")
        leaderboard.page = Math.floor(leaderboard.content.length / leaderboard.pageSize)
}

function drawLeaderboard() {
    c.fillStyle = "white"
    c.font = "50px calibri"
    c.textAlign = "center"
    c.fillText(lg("Leaderboard"), 800, 100)
    if (!leaderboard.content[0]) {
        c.fillStyle = "red"
        c.font = "30px calibri"
        c.fillText("Play now! To be the first in records.", 800, 400)
    } 
    else {
        c.fillStyle = "rgba(255,255,255,0.1)"
        c.fillRect(400, 120, 800, 70)
        c.fillStyle = "white"
        c.font = "40px sans"
        c.textAlign = "center"
        c.fillText("Name:          Score:     Diffi.:      Hits:     Date:", 800, 175)
        for (let i = leaderboard.page * leaderboard.pageSize; i < (leaderboard.pageSize * (leaderboard.page + 1)); i++) {
            if (leaderboard.content.length > i) {
                let position = 200 + (i % (leaderboard.pageSize) * 80)
                let content = leaderboard.content[i].split(",")
                c.fillStyle = "rgba(255,255,255,0.1)"
                c.fillRect(400, position, 800, 70)

                c.fillStyle = "white"
                c.font = "40px sans"
                c.textAlign = "left"
                c.fillText(c.measureText(content[0]).width < 150 ? content[0] : (content[0].substring(0, 10) + "..."), 400 + 10, position + 45)

                c.font = "30px calibri"
                c.fillStyle = "rgb(200,200,200)"
                c.fillText(content[1], 650, position + 45)
                c.fillText(content[5], 650 + 150, position + 45)
                c.fillText(content[3], 650 + 310, position + 45)
                c.fillText(content[6], 650 + 400, position + 45)
            }
        }
        c.textAlign = "center"
        c.font = "25px sans"
        c.fillText(leaderboard.page, 800, 780)
    }
}

function saveRecord() {
    let name = prompt("Enter name:", "Anonymous")
    socket.emit("save", [
        name.indexOf(",") == -1 ? name : "Anonymous",
        game.resources.score,
        game.resources.hp,
        game.resources.hits,
        game.resources.continues,
        game.difficulty
    ].join(","))
}