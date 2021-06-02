const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const { v4: uuidV4 } = require('uuid');

app.use(express.static('public'));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.redirect(uuidV4());
});

app.get('/:room', (req, res) => {
    res.render('room', { roomId: req.params.room })
});

io.on('connection', socket => {
    console.log(`A user has connected! ${socket.id}`);
    socket.on('join', roomId => socket.join(roomId));
    socket.on('draw', ({ ROOM_ID, mPos, pmPos }) => {
        socket.broadcast.to(ROOM_ID).emit('draw', { mPos, pmPos });
    });
})

server.listen(8080);