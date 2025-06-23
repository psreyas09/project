import express from 'express';
import cors from 'cors';
import fetchTopic from './src/utils/topicFetcher.js';
import { synthesizeSpeech } from './src/tts.js';
import path from 'path';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/generate', async (req, res) => {
    const { topic } = req.body;
    try {
        const script = await fetchTopic(topic);
        await synthesizeSpeech(script, 'podcast.mp3');
        res.json({
            script,
            audioUrl: 'http://localhost:5000/audio/podcast.mp3'
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/', (req, res) => {
    res.send('Podcast Generator API is running.');
});

app.use('/audio', express.static(path.resolve('./')));

app.listen(5000, () => {
    console.log('Server running on http://localhost:5000');
});