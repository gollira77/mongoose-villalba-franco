import mongoose from "mongoose";

export const connectDB = async () => {
    try{
        await mongoose.connect('mongodb://127.0.0.1:27017/database');
        console.log("Conectado a la base de datos");

    } catch (error) {
        console.log("no se pudo conectar a la base de datos",error);
    }
};