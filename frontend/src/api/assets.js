export async function fetchAssets() {
  const res = await fetch("http://localhost:5000/api/assets");
  if (!res.ok) throw new Error("Failed to fetch assets");
  return res.json();
}
