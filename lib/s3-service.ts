import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

export class S3Service {
  private s3Client: S3Client
  private bucketName: string

  constructor() {
    if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY || !process.env.AWS_REGION || !process.env.AWS_BUCKET_NAME) {
      throw new Error('Missing AWS configuration')
    }

    this.s3Client = new S3Client({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    })
    this.bucketName = process.env.AWS_BUCKET_NAME
  }

  async uploadAudio(key: string, audioBuffer: Buffer): Promise<string> {
    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: key,
      Body: audioBuffer,
      ContentType: 'audio/mpeg',
    })

    await this.s3Client.send(command)
    return this.getSignedUrl(key)
  }

  async getSignedUrl(key: string): Promise<string> {
    const command = new GetObjectCommand({
      Bucket: this.bucketName,
      Key: key,
    })

    return getSignedUrl(this.s3Client, command, { expiresIn: 3600 }) // URL expires in 1 hour
  }
}
