const express = require ('express');
const app = express()
const router = require('./src/roots')
const port = process.env.PORT || 3000
require('../Backend/src/mongoose')
app.use (express.json())
app.use (router)


app.listen(port);