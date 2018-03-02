var express = require('express');
var fs = require('fs');
var path = require('path');
var app = express();
var port = 3333;
app.use(express.static(path.join(__dirname, 'build')));
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.listen(port, function () { return console.log("Example app listening on port " + port + "!", __dirname); });
