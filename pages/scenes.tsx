import { useState } from 'react';
import { Character, Scene } from '../types/scene';
import ScenePlayer from '../components/ScenePlayer';
import SceneEditor from '../components/SceneEditor';
import ProtectedRoute from '../components/ProtectedRoute';
import Layout from '../components/Layout';

// Sample characters with Google Cloud TTS voices
const sampleCharacters: Character[] = [
  {
    id: '1',
    name: 'Alice',
    voiceName: 'en-US-Neural2-C',
    languageCode: 'en-US',
  },
  {
    id: '2',
    name: 'Bob',
    voiceName: 'en-US-Neural2-D',
    languageCode: 'en-US',
  },
  {
    id: '3',
    name: 'Charlie',
    voiceName: 'en-US-Neural2-A',
    languageCode: 'en-US',
  },
];

// Sample scene
const sampleScene: Scene = {
  id: '1',
  title: 'A Friendly Chat',
  dialogue: [
    {
      characterId: '1',
      text: 'Hi there! How are you doing today?',
    },
    {
      characterId: '2',
      text: "I'm doing great, thanks for asking! How about you?",
    },
    {
      characterId: '3',
      text: "Hey, mind if I join this conversation?",
    },
    {
      characterId: '1',
      text: "Of course not! The more the merrier!",
    },
  ],
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  is_public: false,
  user_scenes: [],
  description: 'A sample conversation between three friends'
};

export default function ScenesPage() {
  const [characters] = useState<Character[]>(sampleCharacters);
  const [scenes, setScenes] = useState<Scene[]>([sampleScene]);
  const [selectedSceneId, setSelectedSceneId] = useState<string | null>(sampleScene.id);
  const [isEditing, setIsEditing] = useState(false);
  const [editingScene, setEditingScene] = useState<Scene | undefined>(undefined);

  const selectedScene = scenes.find((scene) => scene.id === selectedSceneId);

  const handleSaveScene = (scene: Scene) => {
    if (scenes.some((s) => s.id === scene.id)) {
      setScenes(scenes.map((s) => (s.id === scene.id ? scene : s)));
    } else {
      setScenes([...scenes, scene]);
    }
    setIsEditing(false);
    setEditingScene(undefined);
    setSelectedSceneId(scene.id);
  };

  const handleEditScene = (scene: Scene) => {
    setEditingScene(scene);
    setIsEditing(true);
  };

  const handleDeleteScene = (sceneId: string) => {
    if (window.confirm('Are you sure you want to delete this scene?')) {
      setScenes(scenes.filter((s) => s.id !== sceneId));
      if (selectedSceneId === sceneId) {
        setSelectedSceneId(scenes[0]?.id || null);
      }
    }
  };

  return (
    <ProtectedRoute>
      <Layout>
        <div className="min-h-screen bg-gray-50">
          <header className="bg-white shadow">
            <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">Scene Manager</h1>
                <button
                  onClick={() => {
                    setEditingScene(undefined);
                    setIsEditing(true);
                  }}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Create New Scene
                </button>
              </div>
            </div>
          </header>

          <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-12 gap-6">
              {/* Left Sidebar - Scene List */}
              <div className="col-span-12 lg:col-span-3">
                <div className="bg-white rounded-lg shadow p-4">
                  <h2 className="text-lg font-medium text-gray-900 mb-4">Your Scenes</h2>
                  <div className="space-y-2">
                    {scenes.map((scene) => (
                      <div
                        key={scene.id}
                        onClick={() => !isEditing && setSelectedSceneId(scene.id)}
                        className={`p-3 rounded-md transition-colors cursor-pointer ${
                          selectedSceneId === scene.id
                            ? 'bg-indigo-50 border-2 border-indigo-500'
                            : 'hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <h3 className="font-medium text-gray-900">{scene.title}</h3>
                          <div className="flex space-x-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleEditScene(scene);
                              }}
                              className="text-sm text-indigo-600 hover:text-indigo-900"
                            >
                              Edit
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteScene(scene.id);
                              }}
                              className="text-sm text-red-600 hover:text-red-900"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">
                          {scene.dialogue.length} {scene.dialogue.length === 1 ? 'line' : 'lines'}
                        </p>
                      </div>
                    ))}
                    {scenes.length === 0 && (
                      <p className="text-gray-500 text-center py-4">
                        No scenes yet. Create your first scene!
                      </p>
                    )}
                  </div>
                </div>

                {/* Character List */}
                <div className="mt-6 bg-white rounded-lg shadow p-4">
                  <h2 className="text-lg font-medium text-gray-900 mb-4">Available Characters</h2>
                  <div className="space-y-3">
                    {characters.map((character) => (
                      <div
                        key={character.id}
                        className="p-3 bg-gray-50 rounded-md"
                      >
                        <div className="font-medium text-indigo-600">{character.name}</div>
                        <div className="text-sm text-gray-600">Voice: {character.voiceName}</div>
                        <div className="text-sm text-gray-600">Language: {character.languageCode}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Main Content Area */}
              <div className="col-span-12 lg:col-span-9">
                <div className="bg-white rounded-lg shadow">
                  {isEditing ? (
                    <div className="p-6">
                      <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-medium text-gray-900">
                          {editingScene ? 'Edit Scene' : 'Create New Scene'}
                        </h2>
                        <button
                          onClick={() => {
                            setIsEditing(false);
                            setEditingScene(undefined);
                          }}
                          className="text-gray-600 hover:text-gray-900"
                        >
                          Cancel
                        </button>
                      </div>
                      <SceneEditor
                        characters={characters}
                        onSave={handleSaveScene}
                        initialScene={editingScene}
                      />
                    </div>
                  ) : selectedScene ? (
                    <div className="p-6">
                      <h2 className="text-xl font-medium text-gray-900 mb-6">{selectedScene.title}</h2>
                      <ScenePlayer scene={selectedScene} characters={characters} />
                    </div>
                  ) : (
                    <div className="p-6 text-center text-gray-500">
                      Select a scene from the list or create a new one to get started.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </main>
        </div>
      </Layout>
    </ProtectedRoute>
  );
}
