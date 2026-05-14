import { createClient } from '@supabase/supabase-js';

// These must exactly match the names in your .env.local file
const supabaseUrl = process.env.NEXT_PUBLIC_SUPERBASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPERBASE_PUBLISHABLE_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);