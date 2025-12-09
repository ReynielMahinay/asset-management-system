export async function fetchUser({
    page = 1, 
    pageSize = 5,
    sort = "user_id",
    order = "asc"
} = {}){
    const params =  new URLSearchParams({
        page: String(page),
        pageSize: String(pageSize),
        sort,
        order
    })

    const res = await fetch(`http://localhost:5000/api/users?${params.toString()}`);


    if(!res.ok){
        throw new Error("Failed to fetch users")
    }

    const json = await res.json()
    console.log("API Response: ", json)
    return json
}

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


export async function updateUser(id, formData){
    const res = await fetch(`http://localhost:5000/api/users/${id}`, {
        method: "PUT",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify(formData)
    })

    if(!res.ok){
        throw new Error("Failed to update user")
    }

    return res.json()
}


export async function deleteUser(id){
    const res = await fetch(`http://localhost:5000/api/users/${id}`, {
        method: "DELETE",
        headers:{
            "Content-Type" : "application/json"
        }
    })

    if(!res.ok){
        throw new Error("Failed to delete asset")
    }else{
        console.log("User was deleted succesfuly:", id)
    }

    return res.json()
}