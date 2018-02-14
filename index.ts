const express = require('express')
const fs = require('fs');
const app = express()
const port = 3333

function writeToFile(string) {
  fs.appendFile("./temp/test.json", string + '\n', (err) => {
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
  let {
    remoteAddress
  } = req.connection
  return {
    ...req.headers,
    remoteAddress,
    IP
  }
}

app.get('/', (req, res) => {
  writeToFile(JSON.stringify(getClientInfo(req)) + ',')
  res.sendFile('index.html', {
    root: __dirname + '/public/',
  });
})

app.get('/log', (req, res) => {
  // TODO: Missing ending bracket.
  res.sendFile('test.json', {
    root: __dirname + '/temp/',
  });
})

app.use(express.static(__dirname + '/public'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`,__dirname))
