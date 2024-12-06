import { redis } from './redis'
import { TTSService } from './tts-service'
import { S3Service } from './s3-service'
import { DialogueLine, Character } from '../types/scene'

interface TTSQueueItem {
  id: string
  line: DialogueLine
  character: Character
  sceneId: string
  lineIndex: number
}

export class QueueService {
  private static readonly QUEUE_KEY = 'tts_queue'
  private ttsService: TTSService
  private s3Service: S3Service

  constructor() {
    this.ttsService = new TTSService()
    this.s3Service = new S3Service()
  }

  async enqueueDialogue(sceneId: string, lineIndex: number, line: DialogueLine, character: Character) {
    const queueItem: TTSQueueItem = {
      id: `${sceneId}_${lineIndex}`,
      line,
      character,
      sceneId,
      lineIndex,
    }
    await redis.rpush(QueueService.QUEUE_KEY, JSON.stringify(queueItem))
  }

  async processQueue(): Promise<{ id: string; audioUrl: string } | null> {
    const item = await redis.lpop(QueueService.QUEUE_KEY)
    if (!item || typeof item !== 'string') return null

    const queueItem: TTSQueueItem = JSON.parse(item)
    const audioBuffer = await this.ttsService.synthesizeSpeech(
      queueItem.line.text,
      queueItem.character.languageCode,
      queueItem.character.voiceName
    )

    // Store in S3 with a structured key
    const s3Key = `scenes/${queueItem.sceneId}/line_${queueItem.lineIndex}.mp3`
    const audioUrl = await this.s3Service.uploadAudio(s3Key, audioBuffer)

    return {
      id: queueItem.id,
      audioUrl,
    }
  }

  async getQueueLength(): Promise<number> {
    return redis.llen(QueueService.QUEUE_KEY)
  }

  async clearQueue(): Promise<void> {
    await redis.del(QueueService.QUEUE_KEY)
  }
}
