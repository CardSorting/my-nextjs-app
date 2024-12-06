import { useState } from 'react';
import { Character, Scene, DialogueLine, UserScene } from '../types/scene';

interface SceneEditorProps {
  characters: Character[];
  onSave: (scene: Scene) => void;
  initialScene?: Scene;
}

export default function SceneEditor({ characters, onSave, initialScene }: SceneEditorProps) {
  const [title, setTitle] = useState(initialScene?.title || '');
  const [description, setDescription] = useState(initialScene?.description || '');
  const [isPublic, setIsPublic] = useState(initialScene?.is_public ?? false);
  const [dialogue, setDialogue] = useState<DialogueLine[]>(
    initialScene?.dialogue || [{ characterId: '', text: '' }]
  );

  const addLine = () => {
    setDialogue([...dialogue, { characterId: '', text: '' }]);
  };

  const removeLine = (index: number) => {
    if (dialogue.length > 1) {
      setDialogue(dialogue.filter((_, i) => i !== index));
    }
  };

  const updateLine = (index: number, field: keyof DialogueLine, value: string) => {
    const newDialogue = [...dialogue];
    newDialogue[index] = { ...newDialogue[index], [field]: value };
    setDialogue(newDialogue);
  };

  const moveLine = (index: number, direction: 'up' | 'down') => {
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === dialogue.length - 1)
    ) {
      return;
    }

    const newDialogue = [...dialogue];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    [newDialogue[index], newDialogue[newIndex]] = [newDialogue[newIndex], newDialogue[index]];
    setDialogue(newDialogue);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const now = new Date().toISOString();
    const scene: Scene = {
      id: initialScene?.id || Date.now().toString(),
      title,
      description,
      dialogue: dialogue.filter(line => line.characterId && line.text.trim()),
      created_at: initialScene?.created_at || now,
      updated_at: now,
      is_public: isPublic,
      user_scenes: initialScene?.user_scenes || [],
    };
    onSave(scene);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Scene Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          rows={3}
        />
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="isPublic"
          checked={isPublic}
          onChange={(e) => setIsPublic(e.target.checked)}
          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        <label htmlFor="isPublic" className="ml-2 block text-sm text-gray-700">
          Make this scene public
        </label>
      </div>

      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-700">Dialogue</label>
        {dialogue.map((line, index) => (
          <div key={index} className="flex items-start space-x-4">
            <div className="flex-1">
              <select
                value={line.characterId}
                onChange={(e) => updateLine(index, 'characterId', e.target.value)}
                required
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="">Select a character</option>
                {characters.map((char) => (
                  <option key={char.id} value={char.id}>
                    {char.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex-[2]">
              <input
                type="text"
                value={line.text}
                onChange={(e) => updateLine(index, 'text', e.target.value)}
                placeholder="Enter dialogue..."
                required
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div className="flex space-x-2">
              <button
                type="button"
                onClick={() => moveLine(index, 'up')}
                disabled={index === 0}
                className="inline-flex items-center rounded border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                ↑
              </button>
              <button
                type="button"
                onClick={() => moveLine(index, 'down')}
                disabled={index === dialogue.length - 1}
                className="inline-flex items-center rounded border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                ↓
              </button>
              <button
                type="button"
                onClick={() => removeLine(index)}
                disabled={dialogue.length === 1}
                className="inline-flex items-center rounded border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                ×
              </button>
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={addLine}
          className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Add Line
        </button>
      </div>

      <div className="pt-5">
        <button
          type="submit"
          className="w-full rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Save Scene
        </button>
      </div>
    </form>
  );
}
