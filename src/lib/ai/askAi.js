import OpenAI from 'openai';

const client = new OpenAI({
    apiKey: '8d210f7c-eac0-5c67-a3f0-b61e37f62179',
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