import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

// Personal Supabase project (migrated from Lovable — Apr 2026)
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL ?? "https://tblfnxaedhmwydjqngnb.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ?? "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRibGZueGFlZGhtd3lkanFuZ25iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcxMTYzNjMsImV4cCI6MjA5MjY5MjM2M30.MjXLYqzgqCmZqOrT4_Per3-P9tGjGIqfVM2zFtjJMYA";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});