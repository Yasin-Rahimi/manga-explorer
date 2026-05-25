import OpenAI from 'openai';

const client = new OpenAI({
    apiKey: 'e176f65b-a0d6-5352-ac03-1a3b22cce5bd',
    baseURL: 'https://arvancloudai.ir/gateway/models/Claude-Haiku-4.5/ND0Hf0LSetaz13lGLzpZ4KOsBH_nI6xM-Rl3xic51l1aFw_uW5MFkucQG78TVjVfdOTHPyMQxdu9kK0bWeMlqRiwLuzYnjljSZv7EfULNkmgeYVo506m_vs5eHGr5F1qDW90Ahfu-IiJxwQwCFqFwYwhPKgHLsv-_mPiwnyvmSDQDVTOViMpUxDm96fIaxWg2UA52c8sImCpVB64yy0c0GVy1divXshulNxq0AbZIeNwCI8hxiRH7FFMs_kv3HO8-AHwtdc_/v1', 
});

export async function askClaude(prompt) {
    const completion = await client.chat.completions.create({
        model: 'claude-haiku-4.5-1etze',
        messages: [
            { role: 'system', content: 'You are professional translator.' },
            { role: 'user', content: prompt },
        ],
    });
    return completion.choices[0].message.content;
}