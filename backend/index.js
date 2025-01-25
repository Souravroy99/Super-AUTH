import dotenv from "dotenv"
dotenv.config({path: "./backend/.env"})

import connect_database from "./db/index.js"
import app from "./app.js"

connect_database()
.then(() => {
    const PORT = process.env.PORT || 5001

    app.on("error", (err) => {
        console.log(`App error: ${err}`)
        throw err
    })

    app.listen(PORT, ()=> {
        console.log(`Server is running at: ${PORT}`)
    })
})
.catch((err) => {
    console.log(`MONGO DB connection failed: ${err}`)
    throw err 
})