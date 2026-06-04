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

export async function fetchUnassignedAsset({
  page = 1,
  pageSize = 5,
  sort = "asset_id",
  order = "asc",
  keyword = "",
  assign_status = "unassigned",
} = {}) {
  const params = new URLSearchParams({
    page: String(page),
    pageSize: String(pageSize),
    sort,
    order,
  });

  if (keyword) params.append("keyword", keyword);

  const res = await fetch(
    `http://localhost:5000/api/assets/unassigned?${params.toString()}`,
  );

  if (!res.ok) {
    throw new Error("Failed to fetch unassigned assets");
  }

  const json = await res.json();
  console.log("API response - unassigned:", json);
  return json;
}
