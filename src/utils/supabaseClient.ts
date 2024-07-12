import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://dtchhmivnblzqzsmodfa.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR0Y2hobWl2bmJsenF6c21vZGZhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTU4MTI5NTQsImV4cCI6MjAzMTM4ODk1NH0.mGFqzugUYSJ393JWZiG5KQDIPyXA5YvB-Bxc3Bvr-9k";

export const supabaseClient = createClient(supabaseUrl, supabaseKey);
