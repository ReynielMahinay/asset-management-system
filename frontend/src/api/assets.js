// api/assets.js

export async function fetchAssets({
  page = 1,
  pageSize = 5,
  sort = "asset_id",
  order = "asc",
} = {}) {
  const params = new URLSearchParams({
    page: String(page),
    pageSize: String(pageSize),
    sort,
    order,
  });

  const res = await fetch(`http://localhost:5000/api/assets?${params.toString()}`);

  if (!res.ok) {
    throw new Error("Failed to fetch assets");
  }

  return res.json(); // { total, page, pageSize, data: [...] }
}


export async function deleteAsset(id){
  const res = await fetch(`http://localhost:5000/api/assets/${id}`, {
    method: "DELETE",
    headers:{
      "Content-Type" : "application/json",
    }
  })

  if(!res.ok) {
    throw new Error("Failed to delete asset")
  }
  return res.json()
}
