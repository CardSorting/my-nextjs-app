import { NextApiRequest, NextApiResponse } from 'next'
import { TTSService } from '../../lib/tts-service'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const { text, languageCode, voiceName } = req.body

    if (!text) {
      return res.status(400).json({ message: 'Text is required' })
    }

    const ttsService = new TTSService()
    const audioContent = await ttsService.synthesizeSpeech(
      text,
      languageCode,
      voiceName
    )

    // Set appropriate headers for audio streaming
    res.setHeader('Content-Type', 'audio/mpeg')
    res.setHeader('Content-Length', audioContent.length)
    res.send(audioContent)
  } catch (error) {
    console.error('TTS Error:', error)
    res.status(500).json({ message: 'Error processing TTS request', error })
  }
}
