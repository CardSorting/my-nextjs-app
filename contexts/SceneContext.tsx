import { createContext, useContext, useCallback, ReactNode, useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { useAuthenticationStatus, useUserId } from '@nhost/react';
import { gql } from '@apollo/client';
import { Scene, UserScene } from '../types/scene';

// GraphQL Queries and Mutations
const GET_USER_SCENES = gql`
  query GetUserScenes($user_id: uuid!) {
    user_scenes(where: { user_id: { _eq: $user_id } }) {
      id
      scene {
        id
        title
        description
        created_at
        updated_at
      }
      is_favorite
      last_played_at
    }
  }
`;

const CREATE_SCENE = gql`
  mutation CreateScene($scene: scenes_insert_input!) {
    insert_scenes_one(object: $scene) {
      id
      title
      description
      created_at
      updated_at
    }
  }
`;

const UPDATE_SCENE = gql`
  mutation UpdateScene($id: uuid!, $updates: scenes_set_input!) {
    update_scenes_by_pk(pk_columns: { id: $id }, _set: $updates) {
      id
      title
      description
    }
  }
`;

const DELETE_SCENE = gql`
  mutation DeleteScene($id: uuid!) {
    delete_scenes_by_pk(id: $id) {
      id
    }
  }
`;

const TOGGLE_FAVORITE = gql`
  mutation ToggleFavorite($scene_id: uuid!, $user_id: uuid!, $is_favorite: Boolean!) {
    update_user_scenes(
      where: { scene_id: { _eq: $scene_id }, user_id: { _eq: $user_id } }, 
      _set: { is_favorite: $is_favorite }
    ) {
      returning {
        id
        is_favorite
      }
    }
  }
`;

interface UserSceneResult {
  id: string;
  scene: {
    id: string;
    title: string;
    description?: string;
    created_at: string;
    updated_at: string;
  };
  is_favorite: boolean;
  last_played_at?: string | null;
}

interface SceneContextType {
  loading: boolean;
  error?: Error;
  scenes: Scene[];
  createScene: (scene: Omit<Scene, 'id' | 'created_at' | 'updated_at' | 'user_scenes'>) => Promise<Scene | null>;
  updateScene: (sceneId: string, updates: Partial<Scene>) => Promise<Scene | null>;
  deleteScene: (sceneId: string) => Promise<{ id: string } | null>;
  toggleFavorite: (sceneId: string, isFavorite: boolean) => Promise<boolean>;
}

const SceneContext = createContext<SceneContextType | null>(null);

export function SceneProvider({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuthenticationStatus();
  const userId = useUserId();

  // Queries
  const { data: userScenesData, loading, error } = useQuery(GET_USER_SCENES, {
    variables: { user_id: userId },
    skip: !userId
  });

  // Mutations
  const [createSceneMutation] = useMutation(CREATE_SCENE);
  const [updateSceneMutation] = useMutation(UPDATE_SCENE);
  const [deleteSceneMutation] = useMutation(DELETE_SCENE);
  const [toggleFavoriteMutation] = useMutation(TOGGLE_FAVORITE);

  const scenes = userScenesData?.user_scenes.map((userScene: UserSceneResult) => ({
    ...userScene.scene,
    user_scenes: [{
      id: userScene.id,
      user_id: userId || '',
      scene_id: userScene.scene.id,
      is_favorite: userScene.is_favorite,
      last_played_at: userScene.last_played_at
    }]
  })) || [];

  const createScene = useCallback(
    async (scene: Omit<Scene, 'id' | 'created_at' | 'updated_at' | 'user_scenes'>) => {
      if (!isAuthenticated || !userId) {
        throw new Error('User must be authenticated');
      }

      try {
        const { data } = await createSceneMutation({
          variables: {
            scene: {
              ...scene,
              user_id: userId
            }
          }
        });

        return data?.insert_scenes_one || null;
      } catch (err) {
        console.error('Failed to create scene', err);
        return null;
      }
    },
    [createSceneMutation, isAuthenticated, userId]
  );

  const updateScene = useCallback(
    async (sceneId: string, updates: Partial<Scene>) => {
      try {
        const { data } = await updateSceneMutation({
          variables: {
            id: sceneId,
            updates
          }
        });

        return data?.update_scenes_by_pk || null;
      } catch (err) {
        console.error('Failed to update scene', err);
        return null;
      }
    },
    [updateSceneMutation]
  );

  const deleteScene = useCallback(
    async (sceneId: string) => {
      try {
        const { data } = await deleteSceneMutation({
          variables: { id: sceneId }
        });

        return data?.delete_scenes_by_pk || null;
      } catch (err) {
        console.error('Failed to delete scene', err);
        return null;
      }
    },
    [deleteSceneMutation]
  );

  const toggleFavorite = useCallback(
    async (sceneId: string, isFavorite: boolean) => {
      if (!userId) {
        throw new Error('User must be authenticated');
      }

      try {
        const { data } = await toggleFavoriteMutation({
          variables: {
            scene_id: sceneId,
            user_id: userId,
            is_favorite: isFavorite
          }
        });

        return data?.update_user_scenes?.returning[0]?.is_favorite ?? false;
      } catch (err) {
        console.error('Failed to toggle favorite', err);
        return false;
      }
    },
    [toggleFavoriteMutation, userId]
  );

  const contextValue = {
    loading,
    error,
    scenes,
    createScene,
    updateScene,
    deleteScene,
    toggleFavorite
  };

  return (
    <SceneContext.Provider value={contextValue}>
      {children}
    </SceneContext.Provider>
  );
}

export function useScene() {
  const context = useContext(SceneContext);
  if (!context) {
    throw new Error('useScene must be used within a SceneProvider');
  }
  return context;
}
