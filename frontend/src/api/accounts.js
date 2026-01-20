//using this route sending the username and password to checking on the backend if existing
export async function loginUser(username, password) {
  try {
    const res = await fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();
    console.log("login user data", data);
    return { ok: res.ok, data };
  } catch (err) {
    console.error(err);
    return { ok: false, data: null };
  }
}

//if the user is match in the backend fecth profile that use the token
export async function fetchProfile() {
  const token = localStorage.getItem("token");

  if (!token) return null;
  try {
    const token = localStorage.getItem("token");
    const res = await fetch("http://localhost:5000/api/login/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    console.log("Protected /me response:", data);
    return data;
  } catch (err) {
    console.error(err);
  }
}

export async function fetchAccounts({ page = 1, pageSize = 5 }) {
  const params = new URLSearchParams({
    page: String(page),
    pageSize: String(pageSize),
  });
  const res = await fetch(
    `http://localhost:5000/api/login/accounts?${params.toString()}`,
  );

  if (!res.ok) throw new Error("Failed to fetch accoutns");

  const json = await res.json();

  console.log("API response accounts:", json);
  return json;
}

export async function createAccount(formData) {
  const res = await fetch(`http://localhost:5000/api/login/newAccount`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  if (!res.ok) throw new Error("Failed to create account");

  return res.json();
}
