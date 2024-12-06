import { useState, useRef } from 'react'

export default function TTSTest() {
  const [text, setText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)
  const [error, setError] = useState('')

  const handleTTS = async () => {
    try {
      setIsLoading(true)
      setError('')

      const response = await fetch('/api/tts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text,
          languageCode: 'en-US',
          voiceName: 'en-US-Neural2-A',
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to generate speech')
      }

      const audioBlob = await response.blob()
      const audioUrl = URL.createObjectURL(audioBlob)
      
      if (audioRef.current) {
        audioRef.current.src = audioUrl
        await audioRef.current.play()
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred'
      setError(errorMessage)
      console.error('Error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            Google TTS Test
          </h1>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="text" className="block text-sm font-medium text-gray-700">
                Enter text to convert to speech
              </label>
              <textarea
                id="text"
                rows={4}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter text here..."
              />
            </div>

            <button
              onClick={handleTTS}
              disabled={isLoading || !text}
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                isLoading || !text
                  ? 'bg-indigo-400 cursor-not-allowed'
                  : 'bg-indigo-600 hover:bg-indigo-700'
              }`}
            >
              {isLoading ? 'Converting...' : 'Convert to Speech'}
            </button>

            {error && (
              <div className="text-red-600 text-sm mt-2">
                Error: {error}
              </div>
            )}

            <audio ref={audioRef} className="w-full mt-4" controls />
          </div>
        </div>
      </div>
    </div>
  )
}
