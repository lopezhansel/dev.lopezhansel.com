var express = require('express');
var fs = require('fs');
var app = express();
var port = 3333;
app.get('/', function (req, res) {
    res.sendFile('index.html', {
        root: __dirname + '/build/'
    });
});
app.use(express.static(__dirname + '/build'));
app.listen(port, function () { return console.log("Example app listening on port " + port + "!", __dirname); });
