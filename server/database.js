const { connect } = require('mongoose')
const { success, error } = require('consola')

class Database {
  constructor() {
    this._connect()
  }

  async _connect() {
    try {
      await connect(
        `mongodb+srv://${process.env.APP_DB_SERVER}/${process.env.APP_DB_NAME}`,
        {
          useNewUrlParser: true,
          useUnifiedTopology: true
        }
      )

      success({
        message: 'Database connection successful',
        badge: true
      })
    } catch (err) {
      error({
        message: 'Database connection error',
        badge: true
      })
    }
  }
}

module.exports = new Database()
