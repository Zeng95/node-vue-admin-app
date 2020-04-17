const OSS = require('ali-oss')
const multer = require('multer')
const {
  APP_OSS_REGION,
  APP_OSS_ACCESS_KEY_ID,
  APP_OSS_ACCESS_KEY_SECRET,
  APP_OSS_BUCKET
} = process.env

// Create A Bucket Instance
const client = new OSS({
  region: APP_OSS_REGION,
  accessKeyId: APP_OSS_ACCESS_KEY_ID,
  accessKeySecret: APP_OSS_ACCESS_KEY_SECRET,
  bucket: APP_OSS_BUCKET
})

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images/uploads')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
})

const upload = multer({ storage })

const handleUploadPhoto = async (req, res, next) => {
  try {
    if (req.file) {
      const name = `images/${req.file.filename}`
      const file = req.file.path

      const result = await client.put(name, file)

      req.file.url = result.url

      next()
    } else {
      next()
    }
  } catch (err) {
    console.error('error: %j', err)
  }
}

const handleDeletePhoto = async (req, res, next) => {
  try {
    const name = `images/${req.body.filename}`

    // name 表示 object name store on OSS
    await client.delete(name)

    next()
  } catch (err) {
    console.error('error: %j', err)
  }
}

module.exports = { upload, handleUploadPhoto, handleDeletePhoto }
