import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

export default async function fetchTopic(topic) {
    const apiUrl = 'https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=' + GEMINI_API_KEY;
    const body = {
        contents: [{
            parts: [{
                text: `Write a detailed podcast script about: ${topic}`
            }]
        }]
    };

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });
        if (!response.ok) {
            const errorText = await response.text();
            console.error('API Error:', errorText); // <-- Add this line
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        // Gemini's response structure:
        return data.candidates?.[0]?.content?.parts?.[0]?.text || 'No content generated.';
    } catch (error) {
        console.error('Error fetching topic:', error);
        throw error;
    }
}