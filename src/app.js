const config = require('config');
const express = require('express');
const secrets = require('../config.js');
const router = require('./api/auth/router.js');
const mongoose = require('mongoose');

// User model
const User = require('./models/user');


// express app
const app = express();
app.use(express.json());

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
