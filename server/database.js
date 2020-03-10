const mongoose = require('mongoose')

const server = 'Leo:db19950723@cluster0-f93qf.mongodb.net' // REPLACE WITH YOUR DB SERVER
const database = 'adminDB'      // REPLACE WITH YOUR DB NAME

class Database {
  constructor() {
    this._connect()
  }

  _connect() {
    mongoose
      .connect(
        `mongodb+srv://${server}/${database}`,
        {
          useNewUrlParser: true,
          useUnifiedTopology: true
        }
      )
      .then(() => {
        console.log('Database connection successful')
      })
      .catch(err => {
        console.error(`Database connection error: ${err}`)
      })
  }
}

module.exports = new Database()