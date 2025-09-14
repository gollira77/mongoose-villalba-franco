import express from "express"; 
import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import { connectDB } from "./src/config/database.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares 
app.use(cors());
app.use(express.json());
app.use(cookieParser());


app.listen(PORT, async () => {
    await connectDB();
    console.log(`Servidor escuchando el el puerto ${PORT}`);
})
