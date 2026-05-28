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
        model: 'GPT-5-5-yvv66',
        messages: [
            {
                role: 'user',
                content: [
                    {
                        type: 'text',
                        text: `Identify the manga in this image. Provide your answer in the following format:
First line: the most likely manga name.
also return possible matches, list them one per line after that, up to 3 additional names.
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
    const alternativeGuesses = lines.slice(1, 4); // حداکثر 3 حدس اضافی

    // جستجوی حدس اصلی در Jikan
    let primaryResult = { found: false, id: null, url: null, title: primaryGuess };
    try {
        const searchResult = await searchMangaByTitle(primaryGuess);
        if (searchResult.found) {
            primaryResult = {
                found: true,
                id: searchResult.id,
                url: searchResult.url,
                title: searchResult.title
            };
        }
    } catch (err) {
        console.error("Jikan search failed for primary guess:", err);
    }

    // جستجوی حدس‌های جایگزین به صورت همزمان
    const alternativeMatches = await Promise.all(
        alternativeGuesses.map(async (guess) => {
            try {
                const res = await searchMangaByTitle(guess);
                if (res.found) {
                    return {
                        title: guess,
                        found: true,
                        id: res.id,
                        url: res.url
                    };
                } else {
                    return { title: guess, found: false };
                }
            } catch (err) {
                console.error(`Jikan search failed for alternative guess "${guess}":`, err);
                return { title: guess, found: false };
            }
        })
    );

    return {
        primaryGuess: primaryResult,
        alternativeGuesses: alternativeMatches
    };
}