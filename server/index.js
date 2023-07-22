const express = require('express')
const mongoose = require('mongoose')
const app = express()
const cors = require('cors')
app.use(cors())
app.use(express.json())
const auth = require('./routes/authentication')
const upload = require('./routes/formupload')
mongoose
  .connect('mongodb://127.0.0.1/medco')
  .then(() => {
    console.log('Connected successfully to the database');
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
  });
app.use('/api/v1',auth)
app.use('/api/v1',upload)
app.listen(4000,()=>{
    console.log('app listening on port 4000')
})