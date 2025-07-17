const express = require('express');
const multer = require('multer');
const pdf = require('pdf-parse');
const puppeteer = require('puppeteer');
const { translate } = require('google-translate-api-browser');
const path = require('path');

const app = express();
const PORT = 3000;

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/api/convert-pdf', upload.single('pdfFile'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No PDF file uploaded.' });
    }
    
    const targetLanguage = req.body.language;
    if (!targetLanguage) {
        return res.status(400).json({ error: 'No target language selected.' });
    }

    try {
        console.log('Step 1: Parsing PDF...');
        const data = await pdf(req.file.buffer);
        const originalText = data.text;
        
        if (!originalText.trim()) {
            return res.status(400).json({ error: 'Could not extract text from the PDF. It might be an image-only PDF.' });
        }

        console.log(`Step 2: Translating text to '${targetLanguage}'...`);
        const translationResult = await translate(originalText, { to: targetLanguage });
        const translatedText = translationResult.text;

        console.log('Step 3: Generating new PDF...');
        const htmlContent = createTranslatedHtml(translatedText, targetLanguage);
        const pdfBuffer = await generatePdfFromHtml(htmlContent);

        res.set({
            'Content-Type': 'application/pdf',
            'Content-Length': pdfBuffer.length,
            'Content-Disposition': `attachment; filename="translated_document.pdf"`
        });
        res.send(pdfBuffer);
        console.log('Successfully sent translated PDF.');

    } catch (error) {
        console.error('An error occurred during conversion:', error);
        res.status(500).json({ error: 'An internal error occurred.' });
    }
});


// Helper function to create HTML for Puppeteer
function createTranslatedHtml(text, lang) {
    // We select the correct font based on the language
    const fontFamilies = {
        'hi': "'Noto Sans Devanagari', sans-serif", // Hindi
        'mr': "'Noto Sans Devanagari', sans-serif", // Marathi (uses same script as Hindi)
        'mai': "'Noto Sans Devanagari', sans-serif",// Maithili (uses same script as Hindi)
        'te': "'Noto Sans Telugu', sans-serif",     // Telugu
        'ta': "'Noto Sans Tamil', sans-serif",     // Tamil
        'default': "'Noto Sans', sans-serif"       // Fallback
    };
    
    const fontFamily = fontFamilies[lang] || fontFamilies['default'];

    return `
        <html>
        <head>
          <meta charset="UTF-8">
          <link rel="preconnect" href="https://fonts.googleapis.com">
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
          <link href="https://fonts.googleapis.com/css2?family=Noto+Sans&family=Noto+Sans+Devanagari&family=Noto+Sans+Tamil&family=Noto+Sans+Telugu&display=swap" rel="stylesheet">
          <style>
            body { 
              font-family: ${fontFamily};
              font-size: 12px;
              margin: 40px;
              white-space: pre-wrap; /* This preserves line breaks from the original text */
            }
          </style>
        </head>
        <body>
          ${text}
        </body>
        </html>
    `;
}

// Helper function to generate PDF from HTML using Puppeteer
async function generatePdfFromHtml(html) {
    const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0' }); // waits for fonts to load
    const pdfBuffer = await page.pdf({ format: 'A4', printBackground: true });
    await browser.close();
    return pdfBuffer;
}


app.listen(PORT, () => {
    console.log(`Server is running! Open http://localhost:${PORT} in your browser.`);
});