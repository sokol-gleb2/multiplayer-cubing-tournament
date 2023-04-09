require('dotenv').config() // npm install dotenv

const express = require('express')
const mime = require('mime')
const socketIO = require('socket.io')
const http = require('http')


let app = express()
let server = http.createServer(app)
let io = socketIO(server)


io.on('connection', (socket) => {
    console.log('New user connected')

    socket.emit('newMessage', {
        from:'jen@mds',
        text:'hepppp',
        createdAt:123
    })

    socket.on('createMessage', (newMessage)=>{
        console.log('newMessage', newMessage);
    })

    socket.on('disconnect', ()=>{
        console.log('disconnected from user');
    })
})

app.use(express.static(__dirname + '/public', {
    setHeaders: function(res, path) {
      if (mime.getType(path) === 'application/javascript') { // send javascript file with type javascript
        res.setHeader('Content-Type', 'application/javascript');
      }
    }
}))


app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html")
})

// start server
server.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}.`)
})