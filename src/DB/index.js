import mongoose from "mongoose";
import { Db_Name } from "../Constants.js";

const ConnectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${Db_Name}`);
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`)
    } catch (error) {
        console.log(`MongoDB Connection Error ${error}`)
        process.exit(1)
    }
}

export default ConnectDB;