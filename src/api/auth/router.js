const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const bodyParser = require('body-parser');
const secrets = require('../../../config/secrets');
require('dotenv').config()
// User Model
const User = require('../../models/user');

router.use(bodyParser.json());


// @route   POST api/auth
// @desc    Authenticate user
// @access  Public
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log(email);
    // Find user with the provided email
    let user = await User.findOne({ email });

    // If no user is found, return an error
    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // Compare the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);

    // If the passwords do not match, return an error
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }
    console.log(secrets.jwtSecret);
    // If the passwords match, generate a JWT with the user ID as the payload
    const token = jwt.sign({ user: { id: user.id } }, secrets.jwtSecret, {
      expiresIn: 3600
    });

    // Return the JWT
    res.json({ token });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/users
// @desc    Register new user
// @access  Public
router.post('/createUser', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    console.log(name);
    // Check if the user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // If the user does not exist, create a new user
    user = new User({
      name,
      email,
      password
    });

    // Hash the user's password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Save the user to the database
    await user.save();

    // Generate a JWT with the user's ID as the payload
    const token = jwt.sign({ user: { id: user.id } }, secrets.jwtSecret, {
      expiresIn: 3600
    });

    // Return the JWT
    res.json({ token });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});
    
module.exports = router;