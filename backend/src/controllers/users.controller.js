const dbuser = require("../../db/queires/userQueries")


async function userCreatePost(req, res){
    try {
        const {fullname, email, department, role} = req.body
        console.log("Recieved data: ", req.body)

        const newUser = await dbuser.insertUser(fullname, email, department, role)
        console.log("User created:", newUser)

        res.json(newUser)
    } catch (error) {
        console.error("Error inserting user: ", error)
        res.status(500).json({error: "Database error"})
        
    }
}

module.exports = {userCreatePost}