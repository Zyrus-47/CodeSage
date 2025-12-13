const { GoogleGenAI } = require("@google/genai");

const genAI = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GEMINI_KEY
});

async function generateContent(prompt) {
    try {
        const result = await genAI.models.generateContent({
            model: "gemini-2.5-flash",

            
            systemInstruction: `You are a senior software engineer with 7+ years of experience acting as a professional code reviewer.

Review code and provide precise, actionable, and minimal feedback.

Be short, crisp, and to the point.
No fluff. No storytelling.

Output strictly:
Issues:
5 bullets max

Fix:
(code snippet if needed)

Notes:
2 bullets only if required.`,

            
            contents: [
                {
                    role: "user",
                    parts: [{ text: prompt }]
                }
            ]
        });

        
        return result.candidates[0].content.parts[0].text;

    } catch (error) {
    console.error("FULL GEMINI ERROR:", error);
    throw error;
}
}

module.exports = generateContent;
