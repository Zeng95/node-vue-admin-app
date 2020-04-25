exports.getUser = (req, res) => {
  const { foundUser: user, role } = res.req.user

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
