import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuthenticationStatus } from '@nhost/nextjs';
import { useScene } from '../contexts/SceneContext';
import Layout from '../components/Layout';

export default function ManageScenes() {
  const router = useRouter();
  const { isAuthenticated } = useAuthenticationStatus();
  const { scenes, loading, error, createScene, deleteScene, toggleFavorite, updateLastPlayed } = useScene();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/sign-in');
    }
  }, [isAuthenticated, router]);

  if (loading) return (
    <Layout>
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    </Layout>
  );

  if (error) return (
    <Layout>
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">Error: {error.message}</div>
      </div>
    </Layout>
  );

  const handleCreateScene = async () => {
    const newScene = await createScene({
      title: 'New Scene',
      dialogue: [],
      is_public: false,
      description: '',
    });
    if (newScene) {
      router.push(`/scenes/${newScene.id}`);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Manage Scenes</h1>
          <button
            onClick={handleCreateScene}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Create New Scene
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {scenes.map((scene) => {
            const userScene = scene.user_scenes[0];
            return (
              <div
                key={scene.id}
                className="border rounded-lg p-6 hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-semibold mb-2">{scene.title}</h3>
                <div className="flex items-center space-x-4 mt-4">
                  <button
                    onClick={() => router.push(`/scenes/${scene.id}`)}
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => toggleFavorite(scene.id, !userScene?.is_favorite)}
                    className={`${
                      userScene?.is_favorite ? 'bg-yellow-500' : 'bg-gray-500'
                    } hover:opacity-80 text-white px-3 py-1 rounded`}
                  >
                    {userScene?.is_favorite ? 'Favorited' : 'Favorite'}
                  </button>
                  <button
                    onClick={() => deleteScene(scene.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
                {userScene?.last_played_at && (
                  <div className="text-sm text-gray-500 mt-2">
                    Last played: {new Date(userScene.last_played_at).toLocaleDateString()}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}
