import puppeteer from 'puppeteer';

async function transcribeSpeech() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.google.com/intl/en/chrome/demos/speech.html');

    const transcription = await page.evaluate(() => {
        return new Promise((resolve, reject) => {
            const recognition = new webkitSpeechRecognition();
            recognition.onresult = (event) => {
                const speechToText = event.results[0][0].transcript;
                resolve(speechToText);
            };
            recognition.onerror = (event) => {
                reject(event.error);
            };
            recognition.start();
        });
    });

    console.log('Transcription:', transcription);

    await browser.close();
}

transcribeSpeech();
