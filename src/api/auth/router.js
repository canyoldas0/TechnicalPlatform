const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

// User Model
const User = require('../../models/user');
const { application } = require('express');

// @route   POST api/auth
// @desc    Authenticate user
// @access  Public
router.post('/login', async (req, res) => {
  console.log('sds');
  try {
    const { email, password } = req.body;
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

    // If the passwords match, generate a JWT with the user ID as the payload
    const token = jwt.sign({ user: { id: user.id } }, config.get('jwtSecret'), {
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