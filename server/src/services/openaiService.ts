import OpenAI from "openai";
import { OPENAI_TOKEN } from "../../config.json";

const openai = new OpenAI({
    apiKey: OPENAI_TOKEN
});

export async function makeRudeMessage(text: string): Promise<string> {
    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{
            role: 'system',
            content: 'Повторяй мои сообщения, но делай их более грубыми, с использованием мата не теряя их смысла.'
        }, {
            role: 'user',
            content: text
        }]
    });
    return response.choices[0].message.content ?? text;
}
