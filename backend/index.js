const connectToMongo = require('./db');
const express = require('express')
const app = express()

connectToMongo();
const port = 5000

app.use(express.json())
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
    console.log(`Backend listening on port http://localhost:${port}`)
})