// api/assets.js

//<------------------Fetchn function API--------------------->
export async function fetchAssets({
  page = 1,
  pageSize = 5,
  sort = "asset_id",
  order = "asc",
  keyword = "",
  unassigned = false,
} = {}) {
  const params = new URLSearchParams({
    page: String(page),
    pageSize: String(pageSize),
    sort,
    order,
  });

  if (keyword) params.append("keyword", keyword); // check if there is keyword on from frontend then append it on the url fetch
  if (unassigned) params.append("unassigned", "true"); // if unassigned is true just fetch the unssigned asset

  const res = await fetch(
    `http://localhost:5000/api/assets?${params.toString()}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch assets");
  }

  const json = await res.json();
  console.log("API Response:", json);
  return json; // { total, page, pageSize, data: [...] }
}

//<------------------Delete function API--------------------->
export async function deleteAsset(id) {
  const res = await fetch(`http://localhost:5000/api/assets/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Failed to delete asset");
  }
  return res.json();
}

//<------------------Create function API--------------------->
export async function createAsset(formData) {
  const res = await fetch(`http://localhost:5000/api/assets`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  if (!res.ok) {
    throw new Error("Failed to create asset");
  }

  return res.json();
}

//<------------------Update function API--------------------->
export async function updateAsset(id, formData) {
  const res = await fetch(`http://localhost:5000/api/assets/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  if (!res.ok) {
    throw new Error("Failed to update asset");
  }

  return res.json();
}
