import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

const app = express();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_GEN_API_KEY,
});

app.use(cors());
app.use(express.json());

app.post('/api/chat',  async (req, res) => {

    const {conversations} = req.body;

    try {
        if (!Array.isArray(conversations)) {
            throw new Error('conversations must be an array');
        }

        const contents = conversations.map((item) => ({
            role,
            parts: [{ text }],
        }));

        const response = await ai.generateContent({
            model: 'gemini-1.5-flash',
            contents,
        });

        const botResponse = response?.response?.text();

        res.json({
            success: true,
            data: {
                botResponse,
            },
        });
        
    } catch (error) {
        
    }


});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
