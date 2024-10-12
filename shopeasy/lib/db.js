import mongoose from "mongoose";
const connect= async ()=>{
    if(mongoose.connections[0].readyState) return;
    try {
        await mongoose.connect(process.env.MONGODB_URI,{
            // serverSelectionTimeoutMS: 500000  //increasing acsses time
        });
        
        console.log("Mongo Connection Successfully Established.");
        
    } catch (error) {
        console.log("mongo db error:", error.message);
        throw new Error("MongoDB connection failed");
    }
}
export default connect;