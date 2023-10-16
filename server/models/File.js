const mongoose = require('mongoose')
const S3ClientManager = require('../utils/S3ClientManager')

const fileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
    required: true,
  },
  mimeType: {
    type: String,
    required: true,
  },
  tempUrl: String,
  tempUrlExpirationDate: String,
})

fileSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

fileSchema.post('init', async (doc) => {
  if (
    doc &&
    (!doc.tempUrl || new Date(doc.tempUrlExpirationDate) < new Date())
  ) {
    const s3 = S3ClientManager.getInstance()
    const tempUrl = await s3.generateTempPublicURL(doc.name)
    doc.tempUrl = tempUrl.url
    doc.tempUrlExpirationDate = tempUrl.expirationDate
    await doc.save()
    return doc
  }
})

const File = mongoose.model('File', fileSchema)
module.exports = File
