export async function assingnedAsset(payload) {
  const res = await fetch(`http://localhost:5000/api/assignment`, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error("Failed to assigned the asset");
  }

  return res.json();
}
