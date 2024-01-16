import { OpenAI } from "openai";

export const openai = new OpenAI({ apiKey: process.env.API_KEY_GPT});