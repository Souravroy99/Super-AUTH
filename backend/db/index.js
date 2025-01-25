import mongoose from "mongoose"

const connect_database = async() => {
    try {
        const database_url = await mongoose.connect(`${process.env.MONGODB_URL}`) 
        console.log(`Mongodb Connected: ${database_url.connection.host}`)
    }
    catch(err) {
        console.log(`Database connection failed: ${err}`)
        process.exit(1)
    }
}
 
export default connect_database