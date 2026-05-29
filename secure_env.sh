#!/bin/bash

# ── ساخت فایل .env با مقادیر حساس ──
cat << 'EOF' > .env
VITE_AI_API_KEY=8d210f7c-eac0-5c67-a3f0-b61e37f62179
VITE_AI_VISION_API_KEY=03d710dd-6db5-526c-b607-386d7ce35edf
VITE_AI_PROXY_TARGET=https://arvancloudai.ir
VITE_AI_PROXY_PATH=/gateway/models/GPT-4o/SSLCJImpvtAXNeRe7x8F2J9Kuf5ZwAxyYOmBPDffmK4xx6cZ2bTu5unIGM-mmliSyabmlsfsgJIZ2kMuibZB_N2iqJh8WsW_mPlOlYIOPHgJBxMZ1M1NoaGTPKsrHPqu-cHuRGR8UV91Qa-b_fOKluByJTAIG6SC9rM_pOgVMHuqVSq9Wo8qYQyS-UZMJYq-kw0XZAZFCnzgKSqt9dsnZl2AEOc4RCRAyubMx6Q23EbAAw/v1/chat/completions
EOF

# ── افزودن .env به .gitignore ──
if [ ! -f .gitignore ]; then
  touch .gitignore
fi
if ! grep -qxF '.env' .gitignore; then
  echo '.env' >> .gitignore
fi

# ── بازنویسی askAi.js با کلید از متغیر محیطی ──
cat << 'EOF' > src/lib/ai/askAi.js
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
EOF

# ── بازنویسی gptVision.js با کلید از متغیر محیطی ──
cat << 'EOF' > src/lib/ai/gptVision.js
import OpenAI from "openai";
import { searchMangaByTitle } from "../api";

const client = new OpenAI({
    apiKey: import.meta.env.VITE_AI_VISION_API_KEY || 'not-needed',
    dangerouslyAllowBrowser: true,
    baseURL: "http://localhost:5173/api/gpt",
});

/**
 * Identifies a manga from a base64‑encoded image using GPT vision
 * and searches Jikan for the best matching entry.
 */
export async function identifyMangaFromImage(
    base64Image,
    mimeType = "image/png",
) {
    const dataUrl = `data:${mimeType};base64,${base64Image}`;

    let gptResponse;
    try {
        gptResponse = await client.chat.completions.create({
            model: "gpt-4o",            // Vision‑capable model
            messages: [
                {
                    role: "user",
                    content: [
                        {
                            type: "text",
                            text: `Identify the manga in this image. Provide your answer in the following format:
First line: the most likely manga name.
also return possible matches, list them one per line after that, up to 3 additional names.
Do not add any extra text, numbering, or explanation. Just the names, one per line.`,
                        },
                        {
                            type: "image_url",
                            image_url: { url: dataUrl },
                        },
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

    const lines = rawResponse
        .split("\n")
        .filter((line) => line.trim().length > 0);
    const primaryGuess = lines[0] || "Unknown";
    const alternativeGuesses = lines.slice(1, 4);

    // Search primary guess in Jikan (already includes retry)
    let primaryResult = {
        found: false,
        id: null,
        url: null,
        title: primaryGuess,
    };
    try {
        const searchResult = await searchMangaByTitle(primaryGuess);
        if (searchResult.found) {
            primaryResult = {
                found: true,
                id: searchResult.id,
                url: searchResult.url,
                title: searchResult.title,
            };
        }
    } catch (err) {
        console.error("Jikan search failed for primary guess:", err);
    }

    // Search alternatives one by one with a small delay to avoid rate limiting
    const alternativeMatches = [];
    for (const guess of alternativeGuesses) {
        try {
            const res = await searchMangaByTitle(guess);
            if (res.found) {
                alternativeMatches.push({
                    title: guess,
                    found: true,
                    id: res.id,
                    url: res.url,
                });
            } else {
                alternativeMatches.push({ title: guess, found: false });
            }
        } catch (err) {
            console.error(`Jikan search failed for alternative guess "${guess}":`, err);
            alternativeMatches.push({ title: guess, found: false });
        }
        // Small delay to stay within Jikan’s 3 req/s limit
        await new Promise(resolve => setTimeout(resolve, 500));
    }

    return {
        primaryGuess: primaryResult,
        alternativeGuesses: alternativeMatches,
    };
}
EOF

# ── بازنویسی vite.config.js با خواندن از متغیرهای محیطی ──
cat << 'EOF' > vite.config.js
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [react(), tailwindcss()],
    server: {
      proxy: {
        '/api/gpt': {
          target: env.VITE_AI_PROXY_TARGET,
          changeOrigin: true,
          rewrite: () => env.VITE_AI_PROXY_PATH,
          headers: {
            'Authorization': `Bearer ${env.VITE_AI_API_KEY}`
          }
        }
      }
    }
  }
})
EOF

echo "✅ امن‌سازی انجام شد. مقادیر حساس به .env منتقل شدند و فایل‌ها به‌روزرسانی شدند."