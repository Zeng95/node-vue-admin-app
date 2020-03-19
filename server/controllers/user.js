const passport = require('passport')

exports.currentUser = (req, res, next) => {
  passport.authenticate(
    'jwt',
    {
      session: false
    },
    (err, user, info) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: err.message
        })
      }

      if (info !== undefined) {
        return res.status(404).json({
          success: false,
          message: info.message
        })
      }

      res.status(200).json({
        success: true,
        user: {
          id: user._id,
          name: user.name,
          email: user.email
        }
      })
    }
  )(req, res)
}
