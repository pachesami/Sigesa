import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const hasUrl =
  typeof supabaseUrl === 'string' &&
  supabaseUrl.trim().length > 0 &&
  !supabaseUrl.includes('your-project-ref');

const hasAnonKey =
  typeof supabaseAnonKey === 'string' &&
  supabaseAnonKey.trim().length > 0 &&
  supabaseAnonKey !== 'your-anon-key';

export const isSupabaseConfigured = hasUrl && hasAnonKey;

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl!, supabaseAnonKey!)
  : null;
