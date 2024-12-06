export interface Character {
  id: string;
  name: string;
  voiceName: string;
  languageCode: string;
}

export interface DialogueLine {
  characterId: string;
  text: string;
}

export interface Scene {
  id: string;
  title: string;
  dialogue: DialogueLine[];
  created_at: string;
  updated_at: string;
  user_id?: string;
  is_public: boolean;
  description?: string | null;
  user_scenes: UserScene[];
}

export interface SceneAudio {
  lineIndex: number;
  audioUrl: string;
}

export interface UserScene {
  id: string;
  user_id: string;
  scene_id: string;
  created_at: string;
  updated_at: string;
  scene: Scene;
  is_favorite: boolean;
  last_played_at?: string | null;
}

export interface UserCharacter {
  id: string;
  user_id: string;
  character_id: string;
  created_at: string;
  updated_at: string;
  character: Character;
  is_favorite?: boolean;
}
