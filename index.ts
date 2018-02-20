const express = require('express');
const fs = require('fs');
const app = express();
const port = 3333;

function writeToFile(str: string) {
  fs.appendFile('./temp/test.json', str + '\n', (err) => {
    if (err) {
      return console.log(err);
    }
  });
}

// tslint:disable-next-line:no-any
function getClientInfo(req: any) {
  let forwardedIpsStr = req.header('x-forwarded-for');
  let IP = '';

  if (forwardedIpsStr) {
    IP = forwardedIpsStr.split(',')[0];
  }
  let {
    remoteAddress
  } = req.connection;
  return {
    ...req.headers,
    remoteAddress,
    IP
  };
}

app.get('/', (req, res) => {
  writeToFile(JSON.stringify(getClientInfo(req)) + ',');
  res.sendFile('index.html', {
    root: __dirname + '/build/',
  });
});

app.get('/log', (req, res) => {
  // TODO: Missing ending bracket.
  res.sendFile('test.json', {
    root: __dirname + '/temp/',
  });
});

app.use(express.static(__dirname + '/build'));
app.listen(port, () => console.log(`Example app listening on port ${port}!`, __dirname));
