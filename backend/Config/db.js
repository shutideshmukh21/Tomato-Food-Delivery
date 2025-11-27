import mongoose from "mongoose";

export const connect_Db = async()=>{

    await mongoose.connect('mongodb+srv://rdsoham5_db_user:iKYIOR6qKcF2AFXh@clusterfooddelivery.iv7bnov.mongodb.net/food-delivery').then(()=>{console.log("Db connected")})
}