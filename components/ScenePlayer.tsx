import { useState, useRef, useEffect } from 'react';
import { Character, Scene, SceneAudio } from '../types/scene';
import { useScene } from '../contexts/SceneContext';

interface ScenePlayerProps {
  scene: Scene;
  characters: Character[];
}

export default function ScenePlayer({ scene, characters }: ScenePlayerProps) {
  const { updateLastPlayed } = useScene();
  const [currentLineIndex, setCurrentLineIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioUrls, setAudioUrls] = useState<SceneAudio[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const currentLine = scene.dialogue[currentLineIndex];
  const currentCharacter = characters.find(
    (char) => char.id === currentLine?.characterId
  );

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.onended = () => {
        if (currentLineIndex < scene.dialogue.length - 1) {
          setCurrentLineIndex(currentLineIndex + 1);
        } else {
          setIsPlaying(false);
          setCurrentLineIndex(0);
          // Update last played timestamp when scene finishes
          updateLastPlayed(scene.id);
        }
      };

      audioRef.current.ontimeupdate = () => {
        if (audioRef.current) {
          const progress = (audioRef.current.currentTime / audioRef.current.duration) * 100;
          setProgress(progress);
        }
      };
    }
  }, [currentLineIndex, scene.dialogue.length, scene.id, updateLastPlayed]);

  const generateAudio = async (lineIndex: number) => {
    const line = scene.dialogue[lineIndex];
    const character = characters.find((char) => char.id === line.characterId);
    
    if (!character) return;

    const response = await fetch('/api/tts-queue', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sceneId: scene.id,
        lineIndex,
        line,
        character,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to generate speech');
    }

    const { audioUrl } = await response.json();
    return audioUrl;
  };

  const generateAllAudio = async () => {
    setIsLoading(true);
    try {
      const audioPromises = scene.dialogue.map(async (_, index) => {
        const audioUrl = await generateAudio(index);
        return { lineIndex: index, audioUrl: audioUrl! };
      });

      const generatedAudios = await Promise.all(audioPromises);
      setAudioUrls(generatedAudios);
    } catch (error) {
      console.error('Error generating audio:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const playScene = async () => {
    if (audioUrls.length === 0) {
      setIsLoading(true);
      try {
        await generateAllAudio();
      } catch (error) {
        console.error('Error generating audio:', error);
        return; // Don't proceed with playback if audio generation failed
      }
    }

    if (audioUrls.length > 0) {
      setIsPlaying(true);
      const currentAudio = audioUrls.find((audio) => audio.lineIndex === currentLineIndex);
      if (audioRef.current && currentAudio) {
        audioRef.current.src = currentAudio.audioUrl;
        try {
          await audioRef.current.play();
        } catch (error) {
          console.error('Error playing audio:', error);
          setIsPlaying(false);
        }
      }
    }
  };

  const pauseScene = () => {
    setIsPlaying(false);
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  const resetScene = () => {
    setIsPlaying(false);
    setCurrentLineIndex(0);
    setProgress(0);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  const jumpToLine = (index: number) => {
    setCurrentLineIndex(index);
    setProgress(0);
    if (isPlaying && audioRef.current) {
      const audioUrl = audioUrls.find((audio) => audio.lineIndex === index)?.audioUrl;
      if (audioUrl) {
        audioRef.current.src = audioUrl;
        audioRef.current.play();
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Progress Bar */}
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className={`h-full transition-all duration-300 ${isLoading ? 'bg-gray-400 animate-pulse' : 'bg-indigo-600'}`}
          style={{ width: `${isLoading ? 100 : progress}%` }}
        />
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="text-center py-2">
          <p className="text-sm text-gray-600">Generating audio, please wait...</p>
        </div>
      )}

      {/* Current Character */}
      {currentCharacter && (
        <div className="flex items-center space-x-4 p-4 bg-indigo-50 rounded-lg">
          <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
            <span className="text-xl font-bold text-indigo-600">
              {currentCharacter.name[0]}
            </span>
          </div>
          <div>
            <h3 className="font-bold text-indigo-900">{currentCharacter.name}</h3>
            <p className="text-sm text-indigo-700">
              Speaking in {currentCharacter.languageCode}
            </p>
          </div>
        </div>
      )}

      {/* Dialogue Lines */}
      <div className="space-y-3">
        {scene.dialogue.map((line, index) => {
          const character = characters.find((char) => char.id === line.characterId);
          return (
            <div
              key={index}
              onClick={() => jumpToLine(index)}
              className={`p-4 rounded-lg transition-all cursor-pointer ${
                currentLineIndex === index
                  ? 'bg-indigo-100 border-2 border-indigo-500 shadow-md'
                  : index < currentLineIndex
                  ? 'bg-gray-50 opacity-75'
                  : 'bg-white hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`font-medium ${
                  currentLineIndex === index ? 'text-indigo-700' : 'text-gray-700'
                }`}>
                  {character?.name}
                </span>
                {currentLineIndex === index && isPlaying && (
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce delay-75" />
                    <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce delay-150" />
                  </div>
                )}
              </div>
              <p className={`mt-1 ${
                currentLineIndex === index ? 'text-gray-900' : 'text-gray-600'
              }`}>
                {line.text}
              </p>
            </div>
          );
        })}
      </div>

      {/* Controls */}
      <div className="flex justify-center space-x-4 pt-4">
        {isLoading ? (
          <div className="flex items-center space-x-2 px-6 py-3 bg-gray-100 rounded-lg">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-indigo-600" />
            <span className="text-gray-600">Preparing audio...</span>
          </div>
        ) : (
          <div className="flex space-x-3">
            {!isPlaying ? (
              <button
                onClick={playScene}
                className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center space-x-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 3.5l6 6.5-6 6.5V3.5z" />
                </svg>
                <span>Play</span>
              </button>
            ) : (
              <button
                onClick={pauseScene}
                className="px-6 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors flex items-center space-x-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M5 4h3v12H5V4zm7 0h3v12h-3V4z" />
                </svg>
                <span>Pause</span>
              </button>
            )}
            <button
              onClick={resetScene}
              className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center space-x-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 3v10.707l-3.354-3.353-1.414 1.414L10.586 17l5.354-5.353-1.414-1.414L11 13.707V3h-1z" />
              </svg>
              <span>Reset</span>
            </button>
          </div>
        )}
      </div>

      <audio ref={audioRef} className="hidden" />
    </div>
  );
}
