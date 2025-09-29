import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const chatSessionSchema = new mongoose.Schema({
  sessionId: { type: String, required: true, unique: true },
  messages: [messageSchema],
  createdAt: { type: Date, default: Date.now },
});

const ChatSession = mongoose.model("ChatSession", chatSessionSchema);
export default ChatSession;
