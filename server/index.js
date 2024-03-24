const express = require('express')
const app = express()

// data base connection
require('./src/db/conn')

// cors
const cors = require('cors')
require("dotenv").config();
const port = 5000;

app.use(cors())
app.use(express.json())

// routes
app.use('/user', require('./src/routes/userRoute'));
app.use('/driver', require('./src/routes/driverRoute'));
app.use('/comment', require('./src/routes/commentsRoute'));
app.use('/admin', require('./src/routes/adminRoute'));
app.use('/city', require('./src/routes/citiesRoute'))

// server
app.listen(port, () => {
  console.log(`Listening on port http://localhost:${port}`)
})