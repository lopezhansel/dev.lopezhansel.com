const express = require('express');
const fs = require('fs');
const app = express();
const port = 3333;

app.get('/', (req, res) => {
  res.sendFile('index.html', {
    root: __dirname + '/build/',
  });
});

app.use(express.static(__dirname + '/build'));
app.listen(port, () => console.log(`Example app listening on port ${port}!`, __dirname));
