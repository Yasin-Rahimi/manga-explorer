import OpenAI from 'openai';

const client = new OpenAI({
    apiKey: "8d210f7c-eac0-5c67-a3f0-b61e37f62179",
    dangerouslyAllowBrowser: true,
    baseURL: "http://localhost:5173/api/gpt",
});

export async function identifyMangaFromImage(base64Image, mimeType = 'image/png') {
    const dataUrl = `data:${mimeType};base64,${base64Image}`;

    // مرحله 1: حدس نام مانگا توسط هوش مصنوعی
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

    const mangaNameGuess = gptResponse.choices[0].message.content.trim();
    console.log("GPT guessed the manga name:", mangaNameGuess);

    // مرحله 2: جستجو در MangaDex برای دریافت شناسه (ID)
    const searchUrl = `https://api.mangadex.org/manga?title=${encodeURIComponent(mangaNameGuess)}&limit=1`;
    const searchResponse = await fetch(searchUrl);
    const searchData = await searchResponse.json();

    if (!searchData.data || searchData.data.length === 0) {
        throw new Error(`Could not find manga with name "${mangaNameGuess}" on MangaDex.`);
    }

    const mangaId = searchData.data[0].id;

    // مرحله 3: بازگرداندن مستقیم لینک صفحه مانگا در مانگادکس
    return `https://mangadex.org/title/${mangaId}`;
}