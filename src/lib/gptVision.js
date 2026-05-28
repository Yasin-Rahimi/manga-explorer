// src/lib/gptVision.js
import OpenAI from 'openai';
import { searchMangaByTitle } from './api';  // اضافه کردن import

const client = new OpenAI({
    apiKey: "dd746b03-41d0-5170-86d7-d70148aac31b",
    dangerouslyAllowBrowser: true,
    baseURL: "http://localhost:5173/api/gpt",
});

export async function identifyMangaFromImage(base64Image, mimeType = 'image/png') {
    const dataUrl = `data:${mimeType};base64,${base64Image}`;

    // فقط حدس نام مانگا توسط هوش مصنوعی
    const gptResponse = await client.chat.completions.create({
        model: 'GPT-5-5-yvv66',
        messages: [
            {
                role: 'user',
                content: [
                    {
                        type: 'text',
                        text: 'What manga is this panel from? Only answer with the manga Name',
                    },
                    {
                        type: 'image_url',
                        image_url: { url: dataUrl },
                    },
                ],
            },
        ],
        max_tokens: 150,
    });

    const guessedName = gptResponse.choices[0].message.content.trim();
    console.log("GPT guessed the manga name:", guessedName);

    // فقط نام حدس زده شده را برگردان
    return { guessedName };
}