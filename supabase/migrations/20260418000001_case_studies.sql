-- Case Studies table
CREATE TABLE IF NOT EXISTS case_studies (
  id            uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
  slug          text        UNIQUE NOT NULL,
  client_name   text        NOT NULL DEFAULT '',
  industry      text        NOT NULL DEFAULT '',
  tagline       text        NOT NULL DEFAULT '',
  challenge     text        NOT NULL DEFAULT '',
  solution      text        NOT NULL DEFAULT '',
  results       text        NOT NULL DEFAULT '',
  metric_1_value text       DEFAULT '',
  metric_1_label text       DEFAULT '',
  metric_2_value text       DEFAULT '',
  metric_2_label text       DEFAULT '',
  metric_3_value text       DEFAULT '',
  metric_3_label text       DEFAULT '',
  tags          text[]      DEFAULT '{}',
  featured      boolean     DEFAULT false,
  published     boolean     DEFAULT true,
  sort_order    integer     DEFAULT 0,
  created_at    timestamptz DEFAULT now(),
  updated_at    timestamptz DEFAULT now()
);

-- Row-level security
ALTER TABLE case_studies ENABLE ROW LEVEL SECURITY;

-- Anyone can read published case studies
CREATE POLICY "published_case_studies_public"
  ON case_studies FOR SELECT
  USING (published = true);

-- Admins can read all (including unpublished)
CREATE POLICY "admins_read_all_case_studies"
  ON case_studies FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

-- Admins can insert
CREATE POLICY "admins_insert_case_studies"
  ON case_studies FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

-- Admins can update
CREATE POLICY "admins_update_case_studies"
  ON case_studies FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

-- Admins can delete
CREATE POLICY "admins_delete_case_studies"
  ON case_studies FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_case_studies_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER case_studies_updated_at
  BEFORE UPDATE ON case_studies
  FOR EACH ROW EXECUTE FUNCTION update_case_studies_updated_at();
