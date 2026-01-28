//using this route sending the username and password to checking on the backend if existing
export async function loginUser(identifier, password, rememberMe) {
  try {
    const res = await fetch("http://localhost:5000/api/login", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ identifier, password, rememberMe }),
    });

    const data = await res.json();
    console.log("login user data", data);

    if (res.ok) {
      localStorage.setItem("token", data.token);
    }
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
    const res = await fetch("http://localhost:5000/api/login/me", {
      credentials: "include",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    //if access token expired
    if (res.status === 401) {
      token = await refreshToken();
      if (!token) return null;

      const retryRes = await fetch("http://localhost:5000/api/login/me", {
        credentials: "include",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return await retryRes.json();
    }

    const data = await res.json();

    return data;
  } catch (err) {
    console.error(err);
  }
}

export async function fetchAccounts({ page = 1, pageSize = 5 }) {
  const token = localStorage.getItem("token");
  const params = new URLSearchParams({
    page: String(page),
    pageSize: String(pageSize),
  });
  const res = await fetch(
    `http://localhost:5000/api/login/accounts?${params.toString()}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!res.ok) throw new Error("Failed to fetch accoutns");

  const json = await res.json();

  console.log("API response accounts:", json);
  return json;
}

export async function createAccount(formData) {
  const token = localStorage.getItem("token");

  const res = await fetch(`http://localhost:5000/api/login/newAccount`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(formData),
  });

  if (!res.ok) throw new Error("Failed to create account");

  return res.json();
}

export async function refreshToken() {
  try {
    const res = await fetch(`http://localhost:5000/api/login/refresh`, {
      method: "POST",
      credentials: "include",
    });

    if (!res.ok) return null;

    const data = await res.json();
    localStorage.setItem("token", data.token);
    return data.token;
  } catch (error) {
    console.error(error);
    return null;
  }
}
