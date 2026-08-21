// Mirai AI Gemini Integration Engine
import { GoogleGenerativeAI } from '@google/generative-ai';
import { UserSession } from '@/types';
import { processFallbackMiraiIntent, MiraiChatResponse } from './fallback';

export async function askMiraiAI(
  prompt: string,
  user: UserSession,
  contextPage: string = 'global'
): Promise<MiraiChatResponse> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey || apiKey.trim() === '' || apiKey.includes('YOUR_')) {
    // Return safe demo fallback mode
    return await processFallbackMiraiIntent(prompt, user, contextPage);
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const systemInstruction = `You are Mirai AI, an autonomous enterprise AI Procurement Agent.
Tagline: "From Intent to Invoice — AI-powered procurement with humans in control."
User context: ${user.name} (${user.role}, ${user.department}).
Current page context: ${contextPage}.

Answer concisely, professionally, and authoritatively. Output markdown format.
Always provide clear explanations for vendor recommendations, cost breakdowns, and risk flags.`;

    const result = await model.generateContent(`${systemInstruction}\n\nUser request: ${prompt}`);
    const text = result.response.text();

    return {
      isFallback: false,
      mode: 'ASK',
      content: text,
      toolCallsExecuted: [],
      contextPage,
    };
  } catch (error: any) {
    console.warn('Gemini API call failed, invoking safe demo fallback mode:', error.message);
    return await processFallbackMiraiIntent(prompt, user, contextPage);
  }
}
