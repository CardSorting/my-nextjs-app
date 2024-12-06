import { NextApiRequest, NextApiResponse } from 'next'
import { QueueService } from '../../lib/queue-service'

const queueService = new QueueService()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { sceneId, lineIndex, line, character } = req.body

      if (!sceneId || lineIndex === undefined || !line || !character) {
        return res.status(400).json({ message: 'Missing required fields' })
      }

      await queueService.enqueueDialogue(sceneId, lineIndex, line, character)
      
      // Process the queue
      const result = await queueService.processQueue()
      
      if (!result) {
        return res.status(404).json({ message: 'No items in queue' })
      }

      // Return the signed URL
      res.status(200).json({ audioUrl: result.audioUrl })
    } catch (error) {
      console.error('Queue Error:', error)
      res.status(500).json({ message: 'Error processing TTS request', error })
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' })
  }
}
