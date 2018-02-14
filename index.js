const express = require('express')
const app = express()


app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
  res.sendFile('index.html')
})

app.listen(3333, () => console.log('Example app listening on port 3000!'))