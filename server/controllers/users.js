const passport = require('passport')

exports.getUser = (req, res, next) => {
  passport.authenticate(
    'jwt',
    {
      session: false
    },
    (err, data, info) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: err.message
        })
      }

      if (info) {
        return res.status(404).json({
          success: false,
          message: info.message
        })
      }

      const { foundUser: user, role } = data

      res.status(200).json({
        success: true,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
          role: role.name
        }
      })
    }
  )(req, res)
}
