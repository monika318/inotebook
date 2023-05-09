const connectToMongo = require('./db');
const express = require('express')
const app = express()

connectToMongo();
const port = 3000

//Available Routes
app.use('/api/auth', require('./routes/auth'))

app.use('/api/notes', require('./routes/notes'))


app.get('/', (req, res) => {
    res.send('Hello World! monika')
})

app.get('/about', (req, res) => {
    res.send('Hello about')
})

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})