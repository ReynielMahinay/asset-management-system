require('dotenv').config({path: '../.env'})
const { Client } = require('pg')

const SQL = `
CREATE TABLE IF NOT EXISTS assets (
    asset_id SERIAL PRIMARY KEY,
    asset_name VARCHAR(200) NOT NULL,
    asset_type VARCHAR(50) NOT NULL,
    asset_brand VARCHAR(50) NOT NULL,
    asset_tag VARCHAR(50) NOT NULL,
    asset_status VARCHAR(20) CHECK (asset_status IN ('assigned', 'unassigned', 'in-repair')) DEFAULT 'unassigned',
    assigned_to INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`

const userTALBE = `
CREATE TABLE IF NOT EXISTS users (
    user_id SERIAL PRIMARY KEY,
    user_fullname VARCHAR(50) NOT NULL,
    user_email VARCHAR(50) NOT NULL,
    user_role VARCHAR(50)
);
`

async function main(){
    console.log('seeding...')

    const client = new Client({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD  
    })

    try{
        console.log(`Connection to database: ${process.env.DB_NAME} at ${process.env.DB_HOST}`)
        
        // Debug: Check if password is loaded
        console.log('Password loaded:', process.env.DB_PASSWORD ? 'YES' : 'NO')
        
        await client.connect();
        console.log("Connected to database successfully")
        
        await client.query(userTALBE)
        console.log('Table was created successfully')  // Fixed typo
        
        await client.end()
        console.log("Done")
    } catch(err){
        console.log("Database error: ", err.message)
        process.exit(1);
    }
}

main();