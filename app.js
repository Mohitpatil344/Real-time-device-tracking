const express = require('express');
const app = express();
const path = require("path");

const http = require("http");


// Serve static files from the 'public' directory
app.use('/js', express.static(path.join(__dirname, 'js')));


const socketio = require("socket.io");

const server = http.createServer(app);

const io = socketio(server);

// Set up view engine to use EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

io.on("connection",function(socket){
    socket.on("send-location",function(data){
        io.emit("receive-location",{id:socket.id,...data});
    })
    console.log("connection");
});

app.get("/", function(req, res) {
    res.render("index.ejs");
});

server.listen(3000, () => console.log('Server is running on port 3000'));
