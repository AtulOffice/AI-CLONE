import express from "express";
import {
  askAI,
  askAINEW,
  getAllChatsFull,
  getAllSessions,
  getChatBySessionId,
} from "../controller/chat.controller.js";

export const chatrouter = express.Router();

chatrouter.post("/ask", askAI);
chatrouter.post("/asknew", askAINEW);
chatrouter.get("/history", getAllSessions);
chatrouter.get("/allchat", getAllChatsFull);
chatrouter.get("/chat/:sessionId", getChatBySessionId);
