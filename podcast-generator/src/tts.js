import textToSpeech from '@google-cloud/text-to-speech';
import fs from 'fs/promises';

const client = new textToSpeech.TextToSpeechClient();

function splitText(text, maxBytes = 4500) {
    const chunks = [];
    let current = '';
    for (const paragraph of text.split('\n\n')) {
        if (Buffer.byteLength(current + '\n\n' + paragraph, 'utf8') > maxBytes) {
            if (current) chunks.push(current);
            current = paragraph;
        } else {
            current += (current ? '\n\n' : '') + paragraph;
        }
    }
    if (current) chunks.push(current);
    return chunks;
}

export async function synthesizeSpeech(text, outputFile) {
    const chunks = splitText(text);
    let audioBuffers = [];

    for (const chunk of chunks) {
        const request = {
            input: { text: chunk },
            voice: { languageCode: 'en-US', ssmlGender: 'NEUTRAL' },
            audioConfig: { audioEncoding: 'MP3' },
        };
        const [response] = await client.synthesizeSpeech(request);
        audioBuffers.push(response.audioContent);
    }

    // Concatenate all audio buffers and write to file
    const allAudio = Buffer.concat(audioBuffers.map(b => Buffer.from(b, 'base64')));
    await fs.writeFile(outputFile, allAudio, 'binary');
    console.log(`Audio content written to file: ${outputFile}`);
}