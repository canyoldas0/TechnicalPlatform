const express = require('express');
const mongoose = require('mongoose');

// express app
const app = express();
app.use(express.json());

mongoose.set("strictQuery", false);
mongoose.connect(dbURI)
.then( (result) => {
    console.log('connected')
    app.listen(3000)
})
.catch( (err) => console.log('error during connecting'));

