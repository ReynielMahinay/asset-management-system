// backend/db/supabase.js (example)
const { createClient } = require("@supabase/supabase-js");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
console.log("SUPABASE_URL:", process.env.SUPABASE_URL);
const supabaseAdmin = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
);

module.exports = { supabaseAdmin };
