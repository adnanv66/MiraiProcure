import { NextRequest, NextResponse } from 'next/server';
import { askMiraiAI } from '@/lib/ai/gemini';
import { DEMO_USERS } from '@/lib/seed-data';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { prompt, userId, contextPage } = body;

    const user = DEMO_USERS.find((u) => u.id === userId) || DEMO_USERS[0];
    const response = await askMiraiAI(prompt || '', user, contextPage || 'global');

    return NextResponse.json(response);
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed to process Mirai AI request', message: error.message },
      { status: 500 }
    );
  }
}
