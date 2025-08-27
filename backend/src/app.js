const express = require('express')
const cors = require('cors')
const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}))


app.get('/', (req, res) => {
    res.json({
        message: 'Backend is running',
        status: 'OK',
        timestamp: new Date().toISOString()
    })
})

module.exports = app

