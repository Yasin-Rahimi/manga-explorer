import OpenAI from 'openai';

const client = new OpenAI({
    apiKey: import.meta.env.VITE_CLAUDE_API_KEY,
    dangerouslyAllowBrowser: true,
    baseURL: import.meta.env.VITE_CLAUDE_ENDPOINT, 
});

export async function askClaude(prompt) {
    const completion = await client.chat.completions.create({
        model: import.meta.env.VITE_CLAUDE_MODEL_NAME,
        messages: [
            { role: 'user', content: prompt },
        ],
    });
    return completion.choices[0].message.content;
}
