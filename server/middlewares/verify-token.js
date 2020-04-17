const passport = require('passport')

const verifyToken = passport.authenticate('jwt', { session: false })

module.exports = { verifyToken }
