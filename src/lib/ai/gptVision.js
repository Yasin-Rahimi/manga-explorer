import OpenAI from "openai";
import { searchMangaByTitle } from "../api";
import { buildImageIdentificationPrompt } from "./prompts";

const client = new OpenAI({
    apiKey: import.meta.env.VITE_AI_VISION_API_KEY || 'not-needed',
    dangerouslyAllowBrowser: true,
    baseURL: "http://localhost:5173/api/gpt",
});

export async function identifyMangaFromImage(base64Image, mimeType = "image/png") {
    const dataUrl = `data:${mimeType};base64,${base64Image}`;

    let gptResponse;
    try {
        gptResponse = await client.chat.completions.create({
            model: "gpt-4o",
            messages: [
                {
                    role: "user",
                    content: [
                        { type: "text", text: buildImageIdentificationPrompt() },
                        { type: "image_url", image_url: { url: dataUrl } },
                    ],
                },
            ],
            max_tokens: 150,
        });
    } catch (err) {
        console.error("GPT Vision API error:", err);
        throw new Error("Failed to identify manga from image. Please check your network or try again later.");
    }

    const rawResponse = gptResponse.choices[0]?.message?.content?.trim();
    if (!rawResponse) throw new Error("No response from AI. Please try a different image.");

    const lines = rawResponse.split("\n").filter((line) => line.trim().length > 0);
    const primaryGuess = lines[0] || "Unknown";
    const alternativeGuesses = lines.slice(1, 4);

    let primaryResult = { found: false, id: null, url: null, title: primaryGuess };
    try {
        const searchResult = await searchMangaByTitle(primaryGuess);
        if (searchResult.found) {
            primaryResult = { found: true, id: searchResult.id, url: searchResult.url, title: searchResult.title };
        }
    } catch (err) {
        console.error("Jikan search failed for primary guess:", err);
    }

    const alternativeMatches = [];
    for (const guess of alternativeGuesses) {
        try {
            const res = await searchMangaByTitle(guess);
            if (res.found) {
                alternativeMatches.push({ title: guess, found: true, id: res.id, url: res.url });
            } else {
                alternativeMatches.push({ title: guess, found: false });
            }
        } catch (err) {
            console.error(`Jikan search failed for alternative guess "${guess}":`, err);
            alternativeMatches.push({ title: guess, found: false });
        }
        await new Promise(resolve => setTimeout(resolve, 500));
    }

    return { primaryGuess: primaryResult, alternativeGuesses: alternativeMatches };
}
