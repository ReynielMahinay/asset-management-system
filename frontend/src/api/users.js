export async function createUser(formData){
    const res = await fetch(`http://localhost:5000/api/users`, {
        method: "POST",
        headers: {"Content-type" : "application/json"},
        body: JSON.stringify(formData)
    })

    if(!res.ok){
        throw new Error("Failed to create user")
    }

    return res.json()
}