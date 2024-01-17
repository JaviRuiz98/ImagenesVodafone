import { OpenAI } from "openai";

const openai = new OpenAI({ apiKey: process.env.API_KEY_OPENAI});
export default openai;