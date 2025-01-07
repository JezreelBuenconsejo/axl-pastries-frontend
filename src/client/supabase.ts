import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://udhssyojctlyqegnhaoy.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVkaHNzeW9qY3RseXFlZ25oYW95Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYyMjkzOTUsImV4cCI6MjA1MTgwNTM5NX0.eNU_SleaNC5GzaZp-IvYq3Iz3tYGOxmfGJibacsKWts";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
