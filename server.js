var express = require('express'); // go get express

var app = express(); // it's an express application

// set port
// process.env means heroku will make the port
var port = process.env.PORT || 8080;

// allows us to serve static files (images, CSS, etc)
app.use(express.static(__dirname));

// routes - go to the homepage with / (default is probably just index.html)
app.get("/", function(req, res) {
    res.sendFile(__dirname + '/board.html');
});

// server needs to listen to request
app.listen(port, function() {
    console.log(`app running on port: ${port}`);
})