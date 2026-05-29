import OpenAI from 'openai';

const client = new OpenAI({
    apiKey: import.meta.env.VITE_AI_API_KEY || 'not-needed',
    dangerouslyAllowBrowser: true,
    baseURL: 'http://localhost:5173/api/gpt', 
});

export async function askAi(prompt) {
    const completion = await client.chat.completions.create({
        model: 'Qwen3-30B-A3B',
        messages: [
            { role: 'user', content: prompt },
        ],
    });
    return completion.choices[0].message.content;
}
