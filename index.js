const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const { Server } = require("socket.io")
const io = new Server(server)
const fs = require("fs")

app.use(express.static('client'));

io.on('connection', (socket) => {
    socket.on('save', (record) => {
        fs.appendFile(__dirname + "/leaderboard.txt", "\n" + [record,new Date().toLocaleDateString()].join(","), () => {})
    })
    socket.on('read', (callback) => {
        let response = fs.readFileSync(__dirname + "/leaderboard.txt", "utf-8")
            .split("\n")
        callback({response})
    })
})

server.listen(3000, () => {
  console.log('listening on *:3000')
})