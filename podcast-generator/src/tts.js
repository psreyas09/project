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

function sanitizeText(text) {
    // Remove Markdown formatting symbols: *, _, #, `, >, -, etc.
    return text
        .replace(/[*_#`>-]/g, '')      // Remove *, _, #, `, >, -
        .replace(/\[(.*?)\]\(.*?\)/g, '$1') // Remove Markdown links, keep text
        .replace(/!\[(.*?)\]\(.*?\)/g, '$1') // Remove Markdown images, keep alt text
        .replace(/^\s*[\r\n]/gm, '')   // Remove empty lines
        .replace(/\s{2,}/g, ' ')       // Replace multiple spaces with one
        .trim();
}

export async function synthesizeSpeech(text, outputFile) {
    const chunks = splitText(text);
    let audioBuffers = [];

    for (const chunk of chunks) {
        const sanitized = sanitizeText(chunk);
        const request = {
            input: { text: sanitized },
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