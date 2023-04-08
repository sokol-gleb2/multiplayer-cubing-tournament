console.log("hey");

var socket=io()
// make connection with server from user side
socket.on('connect', () => {
    console.log('Connected to Server')
})

socket.on('createMessage', (newMessage) => {
    console.log('newMessage', newMessage)
})

socket.emit('createMessage', {
    to:'john@ds',
    text:'what kjkljd'
})

socket.on('disconnect', function(){
    console.log('Disconnect from server')
})