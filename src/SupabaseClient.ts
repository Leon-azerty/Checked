import { createClient } from '@supabase/supabase-js'

const isLocal = true;
const supabaseUrl = isLocal ? process.env.NEXT_PUBLIC_LOCAL_URL_API : process.env.NEXT_PUBLIC_URL_API;
const supabaseAnonKey = isLocal ? process.env.NEXT_PUBLIC_LOCAL_ANON_KEY : process.env.NEXT_PUBLIC_ANON_KEY;

export const supabase = createClient(supabaseUrl!, supabaseAnonKey!, { auth: { persistSession: false } })