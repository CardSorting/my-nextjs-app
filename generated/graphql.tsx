import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: string; output: string; }
  JSON: { input: any; output: any; }
};

export type Mutation = {
  __typename?: 'Mutation';
  delete_scenes_by_pk?: Maybe<Scene>;
  insert_scenes_one?: Maybe<Scene>;
  update_scenes_by_pk?: Maybe<Scene>;
  update_user_scenes: UserSceneMutationResponse;
};


export type MutationDelete_Scenes_By_PkArgs = {
  id: Scalars['ID']['input'];
};


export type MutationInsert_Scenes_OneArgs = {
  object: SceneInput;
};


export type MutationUpdate_Scenes_By_PkArgs = {
  _set: SceneInput;
  pk_columns: ScenePkColumns;
};


export type MutationUpdate_User_ScenesArgs = {
  _set: UserSceneInput;
  where: UserSceneWhereInput;
};

export type Query = {
  __typename?: 'Query';
  scene?: Maybe<Scene>;
  scenes: Array<Scene>;
  user_scenes: Array<UserScene>;
};


export type QuerySceneArgs = {
  id: Scalars['ID']['input'];
};


export type QueryUser_ScenesArgs = {
  user_id?: InputMaybe<Scalars['ID']['input']>;
};

export type Scene = {
  __typename?: 'Scene';
  created_at: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  dialogue: Scalars['JSON']['output'];
  id: Scalars['ID']['output'];
  is_public: Scalars['Boolean']['output'];
  title: Scalars['String']['output'];
  updated_at: Scalars['DateTime']['output'];
  user_id?: Maybe<Scalars['String']['output']>;
  user_scenes: Array<UserScene>;
};

export type SceneInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  dialogue?: InputMaybe<Scalars['JSON']['input']>;
  is_public?: InputMaybe<Scalars['Boolean']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  user_id?: InputMaybe<Scalars['String']['input']>;
};

export type ScenePkColumns = {
  id: Scalars['ID']['input'];
};

export type StringComparisonExp = {
  _eq?: InputMaybe<Scalars['String']['input']>;
};

export type UserScene = {
  __typename?: 'UserScene';
  created_at: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  is_favorite: Scalars['Boolean']['output'];
  last_played_at?: Maybe<Scalars['DateTime']['output']>;
  scene: Scene;
  scene_id: Scalars['String']['output'];
  updated_at: Scalars['DateTime']['output'];
  user_id: Scalars['String']['output'];
};

export type UserSceneInput = {
  is_favorite?: InputMaybe<Scalars['Boolean']['input']>;
  last_played_at?: InputMaybe<Scalars['DateTime']['input']>;
};

export type UserSceneMutationResponse = {
  __typename?: 'UserSceneMutationResponse';
  affected_rows: Scalars['Int']['output'];
};

export type UserSceneWhereInput = {
  scene_id?: InputMaybe<StringComparisonExp>;
  user_id?: InputMaybe<StringComparisonExp>;
};

export type GetUserScenesQueryVariables = Exact<{
  userId?: InputMaybe<Scalars['ID']['input']>;
}>;


export type GetUserScenesQuery = { __typename?: 'Query', user_scenes: Array<{ __typename?: 'UserScene', id: string, is_favorite: boolean, last_played_at?: string | null, scene: { __typename?: 'Scene', id: string, title: string, dialogue: any, description?: string | null, is_public: boolean, created_at: string, updated_at: string } }> };

export type CreateSceneMutationVariables = Exact<{
  scene: SceneInput;
}>;


export type CreateSceneMutation = { __typename?: 'Mutation', insert_scenes_one?: { __typename?: 'Scene', id: string, title: string, dialogue: any, description?: string | null, is_public: boolean, created_at: string, updated_at: string } | null };

export type UpdateSceneMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  updates: SceneInput;
}>;


export type UpdateSceneMutation = { __typename?: 'Mutation', update_scenes_by_pk?: { __typename?: 'Scene', id: string, title: string, dialogue: any, description?: string | null, is_public: boolean, created_at: string, updated_at: string } | null };

export type DeleteSceneMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteSceneMutation = { __typename?: 'Mutation', delete_scenes_by_pk?: { __typename?: 'Scene', id: string } | null };

export type ToggleFavoriteMutationVariables = Exact<{
  userId: Scalars['String']['input'];
  sceneId: Scalars['String']['input'];
  isFavorite: Scalars['Boolean']['input'];
}>;


export type ToggleFavoriteMutation = { __typename?: 'Mutation', update_user_scenes: { __typename?: 'UserSceneMutationResponse', affected_rows: number } };

export type UpdateLastPlayedMutationVariables = Exact<{
  userId: Scalars['String']['input'];
  sceneId: Scalars['String']['input'];
}>;


export type UpdateLastPlayedMutation = { __typename?: 'Mutation', update_user_scenes: { __typename?: 'UserSceneMutationResponse', affected_rows: number } };


export const GetUserScenesDocument = gql`
    query GetUserScenes($userId: ID) {
  user_scenes(user_id: $userId) {
    id
    scene {
      id
      title
      dialogue
      description
      is_public
      created_at
      updated_at
    }
    is_favorite
    last_played_at
  }
}
    `;

/**
 * __useGetUserScenesQuery__
 *
 * To run a query within a React component, call `useGetUserScenesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserScenesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserScenesQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetUserScenesQuery(baseOptions?: Apollo.QueryHookOptions<GetUserScenesQuery, GetUserScenesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserScenesQuery, GetUserScenesQueryVariables>(GetUserScenesDocument, options);
      }
export function useGetUserScenesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserScenesQuery, GetUserScenesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserScenesQuery, GetUserScenesQueryVariables>(GetUserScenesDocument, options);
        }
export function useGetUserScenesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetUserScenesQuery, GetUserScenesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUserScenesQuery, GetUserScenesQueryVariables>(GetUserScenesDocument, options);
        }
export type GetUserScenesQueryHookResult = ReturnType<typeof useGetUserScenesQuery>;
export type GetUserScenesLazyQueryHookResult = ReturnType<typeof useGetUserScenesLazyQuery>;
export type GetUserScenesSuspenseQueryHookResult = ReturnType<typeof useGetUserScenesSuspenseQuery>;
export type GetUserScenesQueryResult = Apollo.QueryResult<GetUserScenesQuery, GetUserScenesQueryVariables>;
export const CreateSceneDocument = gql`
    mutation CreateScene($scene: SceneInput!) {
  insert_scenes_one(object: $scene) {
    id
    title
    dialogue
    description
    is_public
    created_at
    updated_at
  }
}
    `;
export type CreateSceneMutationFn = Apollo.MutationFunction<CreateSceneMutation, CreateSceneMutationVariables>;

/**
 * __useCreateSceneMutation__
 *
 * To run a mutation, you first call `useCreateSceneMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSceneMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSceneMutation, { data, loading, error }] = useCreateSceneMutation({
 *   variables: {
 *      scene: // value for 'scene'
 *   },
 * });
 */
export function useCreateSceneMutation(baseOptions?: Apollo.MutationHookOptions<CreateSceneMutation, CreateSceneMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateSceneMutation, CreateSceneMutationVariables>(CreateSceneDocument, options);
      }
export type CreateSceneMutationHookResult = ReturnType<typeof useCreateSceneMutation>;
export type CreateSceneMutationResult = Apollo.MutationResult<CreateSceneMutation>;
export type CreateSceneMutationOptions = Apollo.BaseMutationOptions<CreateSceneMutation, CreateSceneMutationVariables>;
export const UpdateSceneDocument = gql`
    mutation UpdateScene($id: ID!, $updates: SceneInput!) {
  update_scenes_by_pk(pk_columns: {id: $id}, _set: $updates) {
    id
    title
    dialogue
    description
    is_public
    created_at
    updated_at
  }
}
    `;
export type UpdateSceneMutationFn = Apollo.MutationFunction<UpdateSceneMutation, UpdateSceneMutationVariables>;

/**
 * __useUpdateSceneMutation__
 *
 * To run a mutation, you first call `useUpdateSceneMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateSceneMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateSceneMutation, { data, loading, error }] = useUpdateSceneMutation({
 *   variables: {
 *      id: // value for 'id'
 *      updates: // value for 'updates'
 *   },
 * });
 */
export function useUpdateSceneMutation(baseOptions?: Apollo.MutationHookOptions<UpdateSceneMutation, UpdateSceneMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateSceneMutation, UpdateSceneMutationVariables>(UpdateSceneDocument, options);
      }
export type UpdateSceneMutationHookResult = ReturnType<typeof useUpdateSceneMutation>;
export type UpdateSceneMutationResult = Apollo.MutationResult<UpdateSceneMutation>;
export type UpdateSceneMutationOptions = Apollo.BaseMutationOptions<UpdateSceneMutation, UpdateSceneMutationVariables>;
export const DeleteSceneDocument = gql`
    mutation DeleteScene($id: ID!) {
  delete_scenes_by_pk(id: $id) {
    id
  }
}
    `;
export type DeleteSceneMutationFn = Apollo.MutationFunction<DeleteSceneMutation, DeleteSceneMutationVariables>;

/**
 * __useDeleteSceneMutation__
 *
 * To run a mutation, you first call `useDeleteSceneMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteSceneMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteSceneMutation, { data, loading, error }] = useDeleteSceneMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteSceneMutation(baseOptions?: Apollo.MutationHookOptions<DeleteSceneMutation, DeleteSceneMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteSceneMutation, DeleteSceneMutationVariables>(DeleteSceneDocument, options);
      }
export type DeleteSceneMutationHookResult = ReturnType<typeof useDeleteSceneMutation>;
export type DeleteSceneMutationResult = Apollo.MutationResult<DeleteSceneMutation>;
export type DeleteSceneMutationOptions = Apollo.BaseMutationOptions<DeleteSceneMutation, DeleteSceneMutationVariables>;
export const ToggleFavoriteDocument = gql`
    mutation ToggleFavorite($userId: String!, $sceneId: String!, $isFavorite: Boolean!) {
  update_user_scenes(
    where: {user_id: {_eq: $userId}, scene_id: {_eq: $sceneId}}
    _set: {is_favorite: $isFavorite}
  ) {
    affected_rows
  }
}
    `;
export type ToggleFavoriteMutationFn = Apollo.MutationFunction<ToggleFavoriteMutation, ToggleFavoriteMutationVariables>;

/**
 * __useToggleFavoriteMutation__
 *
 * To run a mutation, you first call `useToggleFavoriteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useToggleFavoriteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [toggleFavoriteMutation, { data, loading, error }] = useToggleFavoriteMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      sceneId: // value for 'sceneId'
 *      isFavorite: // value for 'isFavorite'
 *   },
 * });
 */
export function useToggleFavoriteMutation(baseOptions?: Apollo.MutationHookOptions<ToggleFavoriteMutation, ToggleFavoriteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ToggleFavoriteMutation, ToggleFavoriteMutationVariables>(ToggleFavoriteDocument, options);
      }
export type ToggleFavoriteMutationHookResult = ReturnType<typeof useToggleFavoriteMutation>;
export type ToggleFavoriteMutationResult = Apollo.MutationResult<ToggleFavoriteMutation>;
export type ToggleFavoriteMutationOptions = Apollo.BaseMutationOptions<ToggleFavoriteMutation, ToggleFavoriteMutationVariables>;
export const UpdateLastPlayedDocument = gql`
    mutation UpdateLastPlayed($userId: String!, $sceneId: String!) {
  update_user_scenes(
    where: {user_id: {_eq: $userId}, scene_id: {_eq: $sceneId}}
    _set: {last_played_at: "now"}
  ) {
    affected_rows
  }
}
    `;
export type UpdateLastPlayedMutationFn = Apollo.MutationFunction<UpdateLastPlayedMutation, UpdateLastPlayedMutationVariables>;

/**
 * __useUpdateLastPlayedMutation__
 *
 * To run a mutation, you first call `useUpdateLastPlayedMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateLastPlayedMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateLastPlayedMutation, { data, loading, error }] = useUpdateLastPlayedMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      sceneId: // value for 'sceneId'
 *   },
 * });
 */
export function useUpdateLastPlayedMutation(baseOptions?: Apollo.MutationHookOptions<UpdateLastPlayedMutation, UpdateLastPlayedMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateLastPlayedMutation, UpdateLastPlayedMutationVariables>(UpdateLastPlayedDocument, options);
      }
export type UpdateLastPlayedMutationHookResult = ReturnType<typeof useUpdateLastPlayedMutation>;
export type UpdateLastPlayedMutationResult = Apollo.MutationResult<UpdateLastPlayedMutation>;
export type UpdateLastPlayedMutationOptions = Apollo.BaseMutationOptions<UpdateLastPlayedMutation, UpdateLastPlayedMutationVariables>;