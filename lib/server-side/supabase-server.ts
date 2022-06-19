import {createClient} from '@supabase/supabase-js'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const SUPABASE_PRIVATE_API_KEY = process.env.SUPABASE_PRIVATE_API_KEY || "";

const supabase = createClient(
  SUPABASE_URL, SUPABASE_PRIVATE_API_KEY
  );

export default supabase
