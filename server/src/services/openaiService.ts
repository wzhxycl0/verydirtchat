import OpenAI from "openai";

const openai = new OpenAI();

export async function makeRudeMessage(text: string): Promise<string> {
    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{
            role: 'system',
            content: `Твоя задача переделать сообщение ниже на максимально грубое и недоброе с использованием 
            оскорблений матюков и тд и тп, но чтоб это было всё то же сообщение, вот сообщение:\n\n${text}`
        }]
    });
    return response.choices[0].message.content ?? text;
}
