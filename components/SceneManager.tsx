import { useState } from 'react';
import { useScene } from '../contexts/SceneContext';
import { Scene } from '../types/scene';

export function SceneManager() {
  const [error, setError] = useState<string | null>(null);
  const { scenes, loading, toggleFavorite, updateLastPlayed, deleteScene } = useScene();

  const handleFavorite = async (sceneId: string, isFavorite: boolean) => {
    try {
      await toggleFavorite(sceneId, isFavorite);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update favorite status');
    }
  };

  const handlePlay = async (sceneId: string) => {
    try {
      await updateLastPlayed(sceneId);
      // You can add additional logic here for playing the scene
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update last played');
    }
  };

  const handleDelete = async (sceneId: string) => {
    if (!window.confirm('Are you sure you want to delete this scene?')) {
      return;
    }

    try {
      await deleteScene(sceneId);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete scene');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-md p-4 text-red-700">
        {error}
      </div>
    );
  }

  if (!scenes.length) {
    return (
      <div className="text-center py-8 text-gray-500">
        No scenes found. Create your first scene to get started!
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {scenes.map((scene) => {
        const userScene = scene.user_scenes[0];
        return (
          <div
            key={scene.id}
            className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-medium text-gray-900">{scene.title}</h3>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleFavorite(scene.id, !userScene?.is_favorite)}
                    className={`p-2 rounded-full transition-colors ${
                      userScene?.is_favorite
                        ? 'text-yellow-500 hover:text-yellow-600 bg-yellow-50'
                        : 'text-gray-400 hover:text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {scene.description && (
                <p className="text-gray-600 text-sm mb-4">{scene.description}</p>
              )}

              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>
                  {userScene?.last_played_at
                    ? `Last played: ${new Date(userScene.last_played_at).toLocaleDateString()}`
                    : 'Never played'}
                </span>
                <span>{scene.dialogue.length} lines</span>
              </div>

              <div className="mt-4 flex justify-end space-x-3">
                <button
                  onClick={() => handlePlay(scene.id)}
                  className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Play
                </button>
                <button
                  onClick={() => handleDelete(scene.id)}
                  className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-red-600 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
