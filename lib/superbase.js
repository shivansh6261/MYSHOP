import { createClient } from '@supabase/supabase-js';

// These must exactly match the names in your .env.local file
const supabaseUrl = "https://ncvkwnugxofuvfdxcapm.supabase.co";
const supabaseAnonKey = "sb_publishable_FaYMPmsUQn0RRDbjfopiGA_-xH_Brqp";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);