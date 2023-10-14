const { PutObjectCommand, S3Client, GetObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const {AWS_ACCESS_KEY_ID,AWS_SECRET_ACCESS_KEY,S3_BUCKET,S3_REGION} = require('../utils/config')

class S3ClientManager {
  constructor() {
    const accessKeyId = AWS_ACCESS_KEY_ID;
    const secretAccessKey = AWS_SECRET_ACCESS_KEY;
    const region = S3_REGION;
    this.Bucket = S3_BUCKET;

    this.client = new S3Client({
      credentials: {
        accessKeyId,
        secretAccessKey
      },
      region
    })
  }

  static getInstance() {
    if (!S3ClientManager.instance) {
      S3ClientManager.instance = new S3ClientManager();
    }
    return S3ClientManager.instance;
  }

  async writeFile(file) {
    if (!file) {
      return console.log('No file received in writeFile')
    }

    const fileName = `${Date.now()}-${file.name}`

    const params = {
      Bucket: this.Bucket,
      Key: fileName,
      Body: file.buffer,
      ContentType: file.mimeType,
      ContentDisposition: `attachment; filename=${fileName}`
    };

    const putCommand = new PutObjectCommand(params);

    await this.client.send(putCommand);

    return fileName
  }

  async getFile(fileName) {
    if (!fileName) {
      return console.log('No fileName received in getFile')
    }
    const getCommand = new GetObjectCommand({
      Bucket: this.Bucket,
      Key: fileName
    })
    const file = await this.client.send(getCommand)
    return file
  }

  async deleteFile(fileName) {
    if (!fileName) {
      return console.log('No fileName received in deleteFile')
    }

    const deleteCommand = new DeleteObjectCommand({
      Bucket: this.Bucket,
      Key: fileName
    })

    await this.client.send(deleteCommand)
  }

  async generateTempPublicURL(fileName) {
    if (!fileName) {
      return console.log('No fileName received in generateTempPublicURL')
    }

    const params = {
      Bucket: this.Bucket,
      Key: fileName
    }

    const getCommand = new GetObjectCommand(params);

    const tempURL = await getSignedUrl(this.client, getCommand, { expiresIn: 7 * 24 * 60 * 60 });

    return {
      url: tempURL,
      expirationDate:new Date((new Date().getTime()+ 7*24*60*60*1000)).toISOString()
    }
    
  }
}

module.exports = S3ClientManager;