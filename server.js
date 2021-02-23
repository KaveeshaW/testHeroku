// after downloading node, create a file called server.js in your root folder of the project you want to work on (this could be the phaser tutorial after downloading the files from it)
const express = require('express'); // load express with the use of requireJs
const app = express(); // Create an instance of the express library
 
app.use(express.static(__dirname + '/')); // start at the root so that you can get images later 
 
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html'); // change the .html to where the hostpage starts (update this whenever you get to a new part)
});
 
const hostname = '0.0.0.0';
const port = 3000; 

 // listen to specific port
app.listen(port, hostname, () => {
  console.log(`Server listening on http://${hostname}:${port}/`);
});
