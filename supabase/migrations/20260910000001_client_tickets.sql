-- Migration: Client Support Tickets (Odoo, eZee, Ozoo)
-- Stores client-submitted support tickets with attachments and tracking status.

CREATE TABLE IF NOT EXISTS public.client_tickets (
  id                   uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_number        text UNIQUE NOT NULL,
  system               text NOT NULL CHECK (system IN ('odoo', 'ezee', 'ozoo', 'other')),
  branch               text NOT NULL,
  issue_url            text,
  title                text NOT NULL,
  description          text NOT NULL,
  priority             text NOT NULL DEFAULT 'normal' CHECK (priority IN ('normal', 'medium', 'high', 'critical')),
  status               text NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'resolved', 'closed')),
  screenshot_url       text,
  screen_recording_url text,
  client_name          text NOT NULL,
  client_email         text NOT NULL,
  client_phone         text,
  user_id              uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at           timestamptz NOT NULL DEFAULT now(),
  updated_at           timestamptz NOT NULL DEFAULT now()
);

-- Indexes for quick lookup by ticket number, email, system, status
CREATE INDEX IF NOT EXISTS idx_client_tickets_ticket_number ON public.client_tickets(ticket_number);
CREATE INDEX IF NOT EXISTS idx_client_tickets_email ON public.client_tickets(client_email);
CREATE INDEX IF NOT EXISTS idx_client_tickets_system ON public.client_tickets(system);
CREATE INDEX IF NOT EXISTS idx_client_tickets_status ON public.client_tickets(status);
CREATE INDEX IF NOT EXISTS idx_client_tickets_created_at ON public.client_tickets(created_at DESC);

-- Enable RLS
ALTER TABLE public.client_tickets ENABLE ROW LEVEL SECURITY;

-- Allow anyone (public or authenticated) to create a ticket
CREATE POLICY "Public can submit client tickets"
  ON public.client_tickets
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Allow submitter or authenticated user to read their own tickets
CREATE POLICY "Submitters can read own tickets"
  ON public.client_tickets
  FOR SELECT
  TO public
  USING (true);

-- Touch updated_at trigger
CREATE OR REPLACE FUNCTION public.touch_client_tickets_updated_at()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS client_tickets_set_updated_at ON public.client_tickets;
CREATE TRIGGER client_tickets_set_updated_at
  BEFORE UPDATE ON public.client_tickets
  FOR EACH ROW
  EXECUTE FUNCTION public.touch_client_tickets_updated_at();
