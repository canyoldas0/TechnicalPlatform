require('dotenv').config()

module.exports = {
    dbKey: process.env.DB_KEY,
    jwtSecret: process.env.JWT_KEY
}