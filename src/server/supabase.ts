import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  process.env.SUPABASE_API_URL as string,
  process.env.SUPABASE_API_PRIVATE_KEY as string
);
