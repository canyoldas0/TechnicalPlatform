const express = require('express');
const mongoose = require('mongoose');
const config = require('./config.js');


// express app
const app = express();
app.use(express.json());

mongoose.set("strictQuery", false);
console.log(config.dbKey);
mongoose.connect(config.dbKey)
.then( (result) => {
    console.log('connected')
    app.listen(3000)
})

.catch( (err) => console.log('error during connecting'));

