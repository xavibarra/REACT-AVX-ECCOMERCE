import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://jsqxokafxiujbnflycuz.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpzcXhva2FmeGl1amJuZmx5Y3V6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODkzNzk2MzEsImV4cCI6MjEwNDk1NTYzMX0.NInfUOtMl7p-cJ2itemAK4IsM563jdQu2-fCdoYSxk8";

export const supabaseClient = createClient(supabaseUrl, supabaseKey);
