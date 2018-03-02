const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3333;

app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`, __dirname));
