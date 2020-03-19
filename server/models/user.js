const bcrypt = require('bcrypt')
const { Schema, model } = require('mongoose')
const SchemaObjectId = Schema.Types.ObjectId

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      lowercase: true,
      trim: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    avatar: {
      type: String
    },
    accessToken: {
      type: String
    },
    role: {
      type: SchemaObjectId,
      ref: 'Role'
    }
  },
  { timestamps: true }
)

userSchema.pre(
  'save',
  function(next) {
    let user = this

    if (user.isModified('password') || user.isNew) {
      /**
       * 哈希密码
       * 同步操作
       */
      let hashedPassword = bcrypt.hashSync(user.password, 10)

      user.password = hashedPassword
      next()
    }
  },
  function(err) {
    next(err)
  }
)

userSchema.methods.comparePassword = function(candidatePassword) {
  return bcrypt.compareSync(candidatePassword, this.password)
}

module.exports = model('User', userSchema)
