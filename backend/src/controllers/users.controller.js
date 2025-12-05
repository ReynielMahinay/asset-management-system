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

async function userGet(req, res){
    try {
        const {
            page = 1, 
            pageSize = 5,
            sort = "user_id",
            order = "asc",
        } = req.query;

        console.log("Query Params:", { page, pageSize, sort, order });

        const users = await dbuser.getUser({
            page: Number(page),
            pageSize: Number(pageSize),
            sort,
            order: order.toUpperCase(),
        });

        res.json(users)
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Database error"})
    }
}

// async function userGet(req, res){

//     try {
//         const {
//             page = 1, 
//             pageSize = 5,
//             sort = "user_id",
//             order = "asc",
//         } = req.query;

//         let users;

//         users = await dbuser.getUser({
//             page: Number(page),
//             pageSize: Number(pageSize),
//             sort,
//             order: order.toUpperCase(),
//         });

//         res.json(users)
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({error: "Database error"})
//     }
// }

module.exports = {userCreatePost, userGet}