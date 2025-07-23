import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path"
import {connectDB} from "./lib/db.js";
import authRoutes from "./routers/auth.routes.js";

dotenv.config()

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json())
app.use(cookieParser());

app.use("/api/auth", authRoutes)

app.listen(PORT, () => {
	console.log("Server is running on http://localhost:" + PORT);
	connectDB();
});