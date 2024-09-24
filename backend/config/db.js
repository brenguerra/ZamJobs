const mongoose = require('mongoose')

const mongo_uri = process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'dev' ? process.env.DATABASE_URI_DEV : process.env.DATABASE_URI_DEV;

const connectDatabase = async () => {
  try {
    const conn = await mongoose.connect(mongo_uri)
    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

module.exports = connectDatabase