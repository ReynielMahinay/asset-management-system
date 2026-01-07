//using this route sending the username and password to checking on the backend if existing
export async function loginUser(username, password) {
  try {
    const res = await fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();
    return { ok: res.ok, data };
  } catch (err) {
    console.error(err);
    return { ok: false, data: null };
  }
}

//if the user is match in the backend fecth profile that use the token
export async function fetchProfile(jwtToken) {
  try {
    const res = await fetch("http://localhost:5000/api/login/me", {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });

    const data = await res.json();
    console.log("Protected /me response:", data);
    return data;
  } catch (err) {
    console.error(err);
  }
}
