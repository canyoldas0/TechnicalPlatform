const express = require('express');
const secrets = require('../config/secrets');
const router = require('./api/auth/router.js');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// User model
const User = require('./models/user');


// express app
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use('/api/auth', router);

const port = process.env.PORT || 3000;

mongoose.set("strictQuery", false);
console.log(secrets.dbKey);
mongoose.connect(secrets.dbKey)
.then( (result) => {
    console.log('connected')
    
app.listen(port, () => console.log(`Server started on port ${port}`));
})

.catch( (err) => console.log('error during connecting'));
