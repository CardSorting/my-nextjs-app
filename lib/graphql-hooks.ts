import * as React from 'react'
import { gql } from 'graphql-tag'
import { useNhostClient } from '@nhost/react'

// Define TypeScript interfaces
interface Scene {
  id: string
  title: string
  description?: string
  is_public: boolean
  user_id: string
  created_at: string
  dialogue?: any
}

interface UserScene {
  scene: Scene
  is_favorite: boolean
  last_played_at?: string
}

interface ScenesData {
  scenes: Scene[]
}

interface UserScenesData {
  user_scenes: UserScene[]
}

interface CreateSceneVariables {
  title: string
  description?: string
  dialogue?: any
  is_public?: boolean
}

interface CreateSceneResponse {
  insert_scenes_one: {
    id: string
    title: string
  }
}

export const GET_SCENES = gql`
  query GetScenes {
    scenes {
      id
      title
      description
      is_public
      user_id
      created_at
    }
  }
`

export const CREATE_SCENE = gql`
  mutation CreateScene(
    $title: String!, 
    $description: String, 
    $dialogue: jsonb, 
    $is_public: Boolean = false
  ) {
    insert_scenes_one(object: {
      title: $title, 
      description: $description, 
      dialogue: $dialogue, 
      is_public: $is_public
    }) {
      id
      title
    }
  }
`

export const GET_USER_SCENES = gql`
  query GetUserScenes($user_id: uuid!) {
    user_scenes(where: { user_id: { _eq: $user_id } }) {
      scene {
        id
        title
        description
      }
      is_favorite
      last_played_at
    }
  }
`

// Custom hook for fetching scenes
export function useScenes() {
  const nhost = useNhostClient()
  const [data, setData] = React.useState<ScenesData | null>(null)
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<Error | null>(null)

  React.useEffect(() => {
    async function fetchScenes() {
      try {
        const result = await nhost.graphql.request<ScenesData>(GET_SCENES)
        setData(result.data)
        setLoading(false)
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An error occurred'))
        setLoading(false)
      }
    }

    fetchScenes()
  }, [nhost.graphql])

  return { 
    scenes: data?.scenes || [], 
    loading, 
    error 
  }
}

// Custom hook for creating a scene
export function useCreateScene() {
  const nhost = useNhostClient()
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<Error | null>(null)
  const [data, setData] = React.useState<CreateSceneResponse | null>(null)

  const createScene = React.useCallback(async (variables: CreateSceneVariables) => {
    setLoading(true)
    try {
      const result = await nhost.graphql.request<CreateSceneResponse>(CREATE_SCENE, variables)
      setData(result.data)
      setLoading(false)
      return result.data
    } catch (err) {
      const error = err instanceof Error ? err : new Error('An error occurred')
      setError(error)
      setLoading(false)
      throw error
    }
  }, [nhost.graphql])

  return { 
    createScene, 
    data, 
    loading, 
    error 
  }
}

// Custom hook for fetching user scenes
export function useUserScenes(userId: string) {
  const nhost = useNhostClient()
  const [data, setData] = React.useState<UserScenesData | null>(null)
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<Error | null>(null)

  React.useEffect(() => {
    async function fetchUserScenes() {
      if (!userId) return

      try {
        const result = await nhost.graphql.request<UserScenesData>(GET_USER_SCENES, { user_id: userId })
        setData(result.data)
        setLoading(false)
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An error occurred'))
        setLoading(false)
      }
    }

    fetchUserScenes()
  }, [nhost.graphql, userId])

  return { 
    userScenes: data?.user_scenes || [], 
    loading, 
    error 
  }
}
