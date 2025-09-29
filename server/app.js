import express from "express";
import cors from "cors";
import { chatrouter } from "./routes/chat.route.js";
import connectDB from "./db.js";
import dotenv from "dotenv";
dotenv.config({ quiet: true });

const app = express();

app.use(cors());
app.use(express.json());

connectDB(process.env.MONGO_URI);

app.get("/", (req, res) => {
  res.send("Hello, I am server");
});

app.use("/api/v1", chatrouter);

app.listen(process.env.PORT || 90000, () => {
  console.log(`Server is running on port ${process.env.PORT || 9000}`);
});
