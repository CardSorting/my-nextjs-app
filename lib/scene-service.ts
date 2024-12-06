import {
  useGetUserScenesQuery,
  useCreateSceneMutation,
  useUpdateSceneMutation,
  useDeleteSceneMutation,
  useToggleFavoriteMutation,
  useUpdateLastPlayedMutation,
  Scene,
  SceneInput,
} from '../generated/graphql';

export class SceneService {
  private readonly getUserScenesQuery;
  private readonly createSceneMutation;
  private readonly updateSceneMutation;
  private readonly deleteSceneMutation;
  private readonly toggleFavoriteMutation;
  private readonly updateLastPlayedMutation;

  constructor() {
    this.getUserScenesQuery = useGetUserScenesQuery();
    [this.createSceneMutation] = useCreateSceneMutation();
    [this.updateSceneMutation] = useUpdateSceneMutation();
    [this.deleteSceneMutation] = useDeleteSceneMutation();
    [this.toggleFavoriteMutation] = useToggleFavoriteMutation();
    [this.updateLastPlayedMutation] = useUpdateLastPlayedMutation();
  }

  async getUserScenes(userId: string) {
    const { data, error } = await this.getUserScenesQuery.fetchMore({
      variables: { userId },
      updateQuery: (prev, { fetchMoreResult }) => fetchMoreResult
    });
    if (error) throw error;
    return data?.user_scenes || [];
  }

  async createScene(scene: Omit<Scene, 'id' | 'created_at' | 'updated_at'>) {
    const { data, errors } = await this.createSceneMutation({
      variables: {
        scene: scene as SceneInput,
      },
    });
    if (errors) throw errors[0];
    return data?.insert_scenes_one;
  }

  async updateScene(sceneId: string, updates: Partial<Scene>) {
    const { data, errors } = await this.updateSceneMutation({
      variables: {
        id: sceneId,
        updates: updates as SceneInput,
      },
    });
    if (errors) throw errors[0];
    return data?.update_scenes_by_pk;
  }

  async deleteScene(sceneId: string) {
    const { data, errors } = await this.deleteSceneMutation({
      variables: {
        id: sceneId,
      },
    });
    if (errors) throw errors[0];
    return data?.delete_scenes_by_pk;
  }

  async toggleFavorite(userId: string, sceneId: string, isFavorite: boolean) {
    const { data, errors } = await this.toggleFavoriteMutation({
      variables: {
        userId,
        sceneId,
        isFavorite,
      },
    });
    if (errors) throw errors[0];
    return (data?.update_user_scenes?.affected_rows ?? 0) > 0;
  }

  async updateLastPlayed(userId: string, sceneId: string) {
    const { data, errors } = await this.updateLastPlayedMutation({
      variables: {
        userId,
        sceneId,
      },
    });
    if (errors) throw errors[0];
    return (data?.update_user_scenes?.affected_rows ?? 0) > 0;
  }
}
