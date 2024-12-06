-- Create scenes table
CREATE TABLE scenes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    dialogue JSONB,
    user_id UUID REFERENCES auth.users(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    is_public BOOLEAN DEFAULT FALSE,
    description TEXT
);

-- Create user_scenes table
CREATE TABLE user_scenes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id),
    scene_id UUID REFERENCES scenes(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    is_favorite BOOLEAN DEFAULT FALSE,
    last_played_at TIMESTAMPTZ
);

-- Add triggers to update updated_at timestamps
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_scenes_modtime
BEFORE UPDATE ON scenes
FOR EACH ROW
EXECUTE FUNCTION update_modified_column();

CREATE TRIGGER update_user_scenes_modtime
BEFORE UPDATE ON user_scenes
FOR EACH ROW
EXECUTE FUNCTION update_modified_column();
