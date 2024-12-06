import { TextToSpeechClient } from '@google-cloud/text-to-speech'
import { google } from '@google-cloud/text-to-speech/build/protos/protos'
import fs from 'fs'
import util from 'util'
import path from 'path'

export class TTSService {
  private client: TextToSpeechClient

  constructor() {
    const keyFilePath = path.join(process.cwd(), 'cred', 'bot-391216-eae47f9e3f78.json')
    this.client = new TextToSpeechClient({
      keyFilename: keyFilePath
    })
  }

  async synthesizeSpeech(
    text: string,
    languageCode: string = 'en-US',
    voiceName: string = 'en-US-Neural2-F',
    ssmlGender: google.cloud.texttospeech.v1.SsmlVoiceGender = google.cloud.texttospeech.v1.SsmlVoiceGender.FEMALE
  ): Promise<Buffer> {
    // Determine gender based on voice name
    const isMaleVoice = voiceName.endsWith('-D') || voiceName.endsWith('-A');
    const gender = isMaleVoice 
      ? google.cloud.texttospeech.v1.SsmlVoiceGender.MALE
      : google.cloud.texttospeech.v1.SsmlVoiceGender.FEMALE;

    const request = {
      input: { text },
      voice: {
        languageCode,
        name: voiceName,
        ssmlGender: gender,
      },
      audioConfig: {
        audioEncoding: google.cloud.texttospeech.v1.AudioEncoding.MP3,
      },
    }

    try {
      const [response] = await this.client.synthesizeSpeech(request)
      return response.audioContent as Buffer
    } catch (error) {
      console.error('Error synthesizing speech:', error)
      throw error
    }
  }

  async saveAudioFile(audioBuffer: Buffer, outputFile: string): Promise<void> {
    const writeFile = util.promisify(fs.writeFile)
    try {
      await writeFile(outputFile, audioBuffer, 'binary')
      console.log(`Audio content written to file: ${outputFile}`)
    } catch (error) {
      console.error('Error saving audio file:', error)
      throw error
    }
  }
}
