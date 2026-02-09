import 'dotenv/config'; // <--- THIS MUST BE LINE 1
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import chatRoutes from "./routes/chatRoutes.js"; 

const app = express();
app.use(cors());
app.use(express.json());

// This will now correctly show 'true'
console.log("API key loaded:", !!process.env.GEMINI_API_KEY);

app.use("/api", chatRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.listen(5000, () => {
  console.log("Server running on port 5000");
});