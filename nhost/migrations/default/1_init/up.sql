CREATE TABLE "public"."scenes" (
    "id" uuid NOT NULL DEFAULT gen_random_uuid(),
    "title" text NOT NULL,
    "dialogue" jsonb NOT NULL,
    "user_id" uuid,
    "created_at" timestamptz NOT NULL DEFAULT now(),
    "updated_at" timestamptz NOT NULL DEFAULT now(),
    "is_public" boolean NOT NULL DEFAULT false,
    "description" text,
    PRIMARY KEY ("id"),
    FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON UPDATE CASCADE ON DELETE SET NULL
);

CREATE TABLE "public"."user_scenes" (
    "id" uuid NOT NULL DEFAULT gen_random_uuid(),
    "user_id" uuid NOT NULL,
    "scene_id" uuid NOT NULL,
    "created_at" timestamptz NOT NULL DEFAULT now(),
    "updated_at" timestamptz NOT NULL DEFAULT now(),
    "is_favorite" boolean NOT NULL DEFAULT false,
    "last_played_at" timestamptz,
    PRIMARY KEY ("id"),
    FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY ("scene_id") REFERENCES "public"."scenes"("id") ON UPDATE CASCADE ON DELETE CASCADE,
    UNIQUE ("user_id", "scene_id")
);

CREATE OR REPLACE FUNCTION "public"."set_current_timestamp_updated_at"()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER "set_public_scenes_updated_at"
    BEFORE UPDATE ON "public"."scenes"
    FOR EACH ROW
    EXECUTE FUNCTION "public"."set_current_timestamp_updated_at"();

CREATE TRIGGER "set_public_user_scenes_updated_at"
    BEFORE UPDATE ON "public"."user_scenes"
    FOR EACH ROW
    EXECUTE FUNCTION "public"."set_current_timestamp_updated_at"();
