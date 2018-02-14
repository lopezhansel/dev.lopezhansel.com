var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var express = require('express');
var fs = require('fs');
var app = express();
var port = 3333;
function writeToFile(string) {
    fs.appendFile("./temp/test.json", string + '\n', function (err) {
        if (err)
            return console.log(err);
    });
}
function getClientInfo(req) {
    var forwardedIpsStr = req.header('x-forwarded-for');
    var IP = '';
    if (forwardedIpsStr) {
        IP = forwardedIps = forwardedIpsStr.split(',')[0];
    }
    var remoteAddress = req.connection.remoteAddress;
    return __assign({}, req.headers, { remoteAddress: remoteAddress,
        IP: IP });
}
app.get('/', function (req, res) {
    writeToFile(JSON.stringify(getClientInfo(req)) + ',');
    res.sendFile('index.html', {
        root: __dirname + '/public/'
    });
});
app.get('/log', function (req, res) {
    // TODO: Missing ending bracket.
    res.sendFile('test.json', {
        root: __dirname + '/temp/'
    });
});
app.use(express.static(__dirname + '/public'));
app.listen(port, function () { return console.log("Example app listening on port " + port + "!", __dirname); });
