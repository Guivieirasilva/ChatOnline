const PORT = 3000;
const express = require('express');
const app = express();
const path = require('path');
const socketIo = require('socket.io');
const messages = [];


app.use('/', express.static(path.join(__dirname, 'public')))

const server = app.listen(PORT , () => {
    console.log(`Server Running localhost:${PORT}`);

});

const io = socketIo(server);

io.on("connection", (socket) => {
    console.log('New Connection');
    socket.emit('Update_messages', messages)


    socket.on('new_message', (data) => {
        messages.push(data.msg)
    })

    io.emit('Update_messages', messages)
});