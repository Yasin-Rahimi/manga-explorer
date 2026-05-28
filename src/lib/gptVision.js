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

    const gptResponse = await client.chat.completions.create({
        model: 'GPT-4o-h6kg5',
        messages: [
            {
                role: 'user',
                content: [
                    {
                        type: 'text',
                        text: `Identify the manga in this image. Provide your answer in the following format:
First line: the most likely manga name.
also return possible matches, list them one per line after that,  3 additional names.
Do not add any extra text, numbering, or explanation. Just the names, one per line.`,
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

    const rawResponse = gptResponse.choices[0].message.content.trim();
    const lines = rawResponse.split('\n').filter(line => line.trim().length > 0);
    const primaryGuess = lines[0] || "Unknown";
    const alternativeGuesses = lines.slice(1, 4)

    // جستجوی حدس اصلی در Jikan API
    let jikanResult = { found: false, id: null, url: null };
    try {
        const searchResult = await searchMangaByTitle(primaryGuess);
        if (searchResult.found) {
            jikanResult = {
                found: true,
                id: searchResult.id,
                url: searchResult.url,
                title: searchResult.title
            };
        }
    } catch (err) {
        console.error("Jikan search failed:", err);
    }

    return {
        primaryGuess,
        alternativeGuesses,
        jikan: jikanResult
    };
}