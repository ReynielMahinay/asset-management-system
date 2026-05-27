import { supabase } from "./supabaseClient";

async function testConnection() {
  const { data, error } = await supabase.from("assets").select("*");
  if (error) console.error("Error:", error);
  else console.log("Assets:", data);
}

testConnection();
