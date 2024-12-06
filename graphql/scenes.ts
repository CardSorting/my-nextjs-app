import { gql } from 'graphql-tag'

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
