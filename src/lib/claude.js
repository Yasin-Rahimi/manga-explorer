import OpenAI from 'openai';

const client = new OpenAI({
    apiKey: '3f3ef086-abf6-5ab2-a010-58bcdfcd7f4c',
    dangerouslyAllowBrowser: true,
    baseURL: 'https://arvancloudai.ir/gateway/models/Qwen3-30B-A3B/vaLPAymRJJuN7KHkqOO-qQWhOZd7TXnh3azSgddjBHFj8jbN-OkMvf174yQmXwMJBueg1oBlKdbe-7UChca3BczYnxk2NZWLzTWmaBFrAObDZUftAeCckLnLWjAdx3qgFUoMpVAbaQi_VEK7IqIpgiFvaaqFbZbAVAr_dtoIkw0o0GsFZ3PlQWkTrTmDQ3A7wx1d6hZ3nQuFgz3aepE1tgNlNevJ5aQuXWGXri9XhNI8KW9oX_iZkLeGuusAyC0-/v1', 
});

export async function askClaude(prompt) {
    const completion = await client.chat.completions.create({
        model: 'Qwen3-30B-A3B',
        messages: [
            { role: 'system', content: "You are a professional translator. Only translate the user's text. Do not introduce yourself. Do not explain anything. Output only the translated text." },
            { role: 'user', content: "You are a professional translator. Only translate the user's text to PERSIAN. Do not introduce yourself. Do not explain anything. Output only the translated text." + prompt },
        ],
    });
    return completion.choices[0].message.content;
}