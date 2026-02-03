const { supabaseAdmin } = require("../supabaseAdmin");
async function testInsert() {
  const { data, error } = await supabaseAdmin
    .from("assets")
    .insert([
      { name: "Laptop", category: "Electronics", brand: "Dell", tag: "D123" },
    ])
    .select()
    .single();

  console.log({ data, error });
}

testInsert();
