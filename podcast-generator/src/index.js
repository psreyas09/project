// This file is the entry point of the application. It initializes the podcast generator and handles user input for the topic.

import PodcastGenerator from './generator/podcastGenerator.js';
import fetchTopic from './utils/topicFetcher.js';
import { synthesizeSpeech } from './tts.js';
import promptSync from 'prompt-sync';
const prompt = promptSync();

const main = async () => {
    const topic = prompt('Enter the topic for your podcast: ');
    
    try {
        const content = await fetchTopic(topic);
        const podcastGenerator = new PodcastGenerator(content);
        
        const podcast = podcastGenerator.generatePodcast();
        podcastGenerator.savePodcast('podcast.txt');
        console.log('Podcast generated and saved successfully!');

        // Generate audio
        await synthesizeSpeech(podcast, 'podcast.mp3');
        console.log('Podcast audio generated as podcast.mp3!');
    } catch (error) {
        console.error('Error generating podcast:', error);
    }
};

main();