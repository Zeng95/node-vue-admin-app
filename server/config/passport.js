const { Strategy: JWTStrategy, ExtractJwt } = require('passport-jwt')

// 模型
const User = require('../models/user')
const Role = require('../models/role')

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.APP_JWT_SECRET
}

module.exports = (passport) => {
  passport.use(
    new JWTStrategy(options, async (jwt_payload, done) => {
      try {
        //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
        const foundUser = await User.findById(jwt_payload.userId)

        if (!foundUser) {
          return done(null, false)
        }

        const role = await Role.findById(foundUser.role)

        done(null, { foundUser, role })
      } catch (err) {
        done(err, false)
      }
    })
  )
}
