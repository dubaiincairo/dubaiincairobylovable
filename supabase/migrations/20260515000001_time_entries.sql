-- Time tracker entries for partner freelancers.
-- One row per (user, date, hour) cell on the weekly grid. Each authenticated
-- user can only see, write, update, and delete their own rows.

CREATE TABLE public.time_entries (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  entry_date  date NOT NULL,
  hour        smallint NOT NULL CHECK (hour >= 0 AND hour < 24),
  title       text NOT NULL,
  description text NOT NULL DEFAULT '',
  project     text NOT NULL DEFAULT '',
  notes       text NOT NULL DEFAULT '',
  created_at  timestamptz NOT NULL DEFAULT now(),
  updated_at  timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, entry_date, hour)
);

CREATE INDEX time_entries_user_date_idx
  ON public.time_entries (user_id, entry_date);

ALTER TABLE public.time_entries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users read their own entries"
  ON public.time_entries
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users insert their own entries"
  ON public.time_entries
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users update their own entries"
  ON public.time_entries
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users delete their own entries"
  ON public.time_entries
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Keep updated_at fresh on every modification.
CREATE OR REPLACE FUNCTION public.touch_time_entries_updated_at()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER time_entries_set_updated_at
  BEFORE UPDATE ON public.time_entries
  FOR EACH ROW
  EXECUTE FUNCTION public.touch_time_entries_updated_at();
