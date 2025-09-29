import ChatSession from "../models/chat.model.js";
import { GoogleGenAI } from "@google/genai";
import { v4 as uuidv4 } from "uuid";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config({ quiet: true });

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});
const genAI = new GoogleGenerativeAI(process.env.GENERATIVE_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

//  i make it for testing purpose

export const askAI = async (req, res) => {
  try {
    const { message, sessionId } = req.body;
    if (!message) return res.status(400).json({ error: "Message required" });

    const response = await model.generateContent(message);

    const aiResponse = response?.response.text() || "No response";

    let session = sessionId ? await ChatSession.findOne({ sessionId }) : null;

    if (!session) {
      session = await ChatSession.create({
        sessionId: uuidv4(),
        messages: [],
      });
    }

    session.messages.push({
      question: message,
      answer: aiResponse,
    });

    await session.save();

    res.status(200).json({
      success: true,
      sessionId: session.sessionId,
      aiResponse,
      messages: session.messages,
    });
  } catch (err) {
    console.error("Gemini error:", err);
    res.status(500).json({ error: "Server error", details: err.message });
  }
};

//  this is also work  same as above function

export const askAINEW = async (req, res) => {
  try {
    const { message, sessionId } = req.body;
    if (!message) return res.status(400).json({ error: "Message required" });

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: message,
    });

    const aiResponse = response?.text || "No response";

    let session = sessionId ? await ChatSession.findOne({ sessionId }) : null;

    if (!session) {
      session = await ChatSession.create({
        sessionId: uuidv4(),
        messages: [],
      });
    }

    session.messages.push({
      question: message,
      answer: aiResponse,
    });

    await session.save();

    res.status(200).json({
      success: true,
       id:session._id,
      sessionId: session.sessionId,
      aiResponse,
      messages: session.messages,
    });
  } catch (err) {
    console.error("Gemini error:", err);
    res.status(500).json({ error: "Server error", details: err.message });
  }
};

// for fetching all sessions id

export const getAllSessions = async (req, res) => {
  try {
    const sessions = await ChatSession.distinct("sessionId");
    res.status(200).json(sessions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// for all chats

export const getAllChatsFull = async (req, res) => {
  try {
    const chats = await ChatSession.find().sort({ createdAt: -1 });
    res.status(200).json(chats);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error", details: err.message });
  }
};

//  for specific chat

export const getChatBySessionId = async (req, res) => {
  try {
    const { sessionId } = req.params;

    if (!sessionId) {
      return res.status(400).json({ error: "sessionId is required" });
    }

    const messages = await ChatSession.find({ sessionId });

    if (!messages || messages.length === 0) {
      return res
        .status(404)
        .json({ error: "No messages found for this session" });
    }

    res.status(200).json(messages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error", details: err.message });
  }
};
