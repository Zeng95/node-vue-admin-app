const OSS = require('ali-oss')
const multer = require('multer')
const {
  APP_OSS_REGION,
  APP_OSS_ACCESS_KEY_ID,
  APP_OSS_ACCESS_KEY_SECRET,
  APP_OSS_BUCKET
} = process.env

// Create a bucket instance.
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

const uploadSingle = multer({ storage })

// Add an object to the bucket.
const uploadPhoto = async (req, res, next) => {
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

// Delete an object from the bucket.
const DeletePhoto = async (req, res, next) => {
  try {
    const name = `images/${req.body.filename}`

    // name 表示 object name store on OSS
    await client.delete(name)

    next()
  } catch (err) {
    console.error('error: %j', err)
  }
}

// Delete multi objects in one request.
const DeletePhotos = async (req, res, next) => {
  try {
    const { filenames } = req.body
    const names = filenames.map((item) => {
      return `images/${item}`
    })

    await client.deleteMulti(names)

    next()
  } catch (err) {
    console.error('error: %j', err)
  }
}

module.exports = { uploadSingle, uploadPhoto, DeletePhoto, DeletePhotos }
