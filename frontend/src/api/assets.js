// api/assets.js

export async function fetchAssets({
  page = 1,
  pageSize = 5,
  sort = "asset_id",
  order = "asc",
  keyword =""
} = {}) {
  const params = new URLSearchParams({
    page: String(page),
    pageSize: String(pageSize),
    sort,
    order,
  });

  if(keyword) params.append("keyword", keyword)


  const url = keyword 
    ? `http://localhost:5000/api/assets/search?keyword=${encodeURIComponent(keyword)}`
    : `http://localhost:5000/api/assets?${params.toString()}`

  const res = await fetch(url);

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


export async function createAsset(formData) {
  const res = await fetch(`http://localhost:5000/api/assets`, {
    method: "POST",
    headers: {"Content-Type" : "application/json"},
    body: JSON.stringify(formData),
  })

  if(!res.ok) {
    throw new Error("Failed to create asset")
  }

  return res.json()
}

export async function updateAsset(id, formData){
  const res = await fetch(`http://localhost:5000/api/assets/${id}`, {
    method: "PUT",
    headers: {"Content-Type" : "application/json"},
    body: JSON.stringify(formData)
  })

  if(!res.ok){
    throw new Error("Failed to update asset")
  }

  return res.json()
}