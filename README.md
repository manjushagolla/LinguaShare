# 📄 LinguaShare – AI-Powered PDF Translator & WhatsApp Distributor

> **Translate any PDF into Indian regional languages and share it seamlessly over WhatsApp — all in one intuitive app.**
>
> 📘 Upload. 🌐 Translate. 📱 Share. 🔁 Repeat.
>
> 

---

## 📸 Demo – One Flow to Rule Them All

[https://github.com/manjushagolla/LinguaShare/blob/main/result.mp4](https://github.com/manjushagolla/LinguaShare/blob/main/result.mp4)
*(Watch demo)*

---

## 🧠 Problem Solved

- 🗂️ **Language Barrier**: PDFs are often monolingual.
- 📉 **Outreach Gap**: Not everyone understands English.
- 📲 **Distribution Challenge**: No seamless way to send translated docs.

**🎯 Solution**: LinguaShare automates PDF translation into Indian languages and allows instant delivery via WhatsApp — making communication inclusive, fast, and frictionless.


---


## 💎 Features

| 💡 Feature                | 🚀 Description                                                       |
| ------------------------- | -------------------------------------------------------------------- |
| 📄 PDF Upload             | Upload any `.pdf` file with text content                             |
| 🌐 Language Translation   | Translate to Hindi, Telugu, Tamil, Marathi, Maithili                 |
| 🕋️ Accurate Font Styling | Renders correct fonts (Devanagari, Telugu, Tamil) using Google Fonts |
| 📤 Instant Sharing        | Share via WhatsApp using web links                                   |
| 📥 Smart PDF Regeneration | Generates beautiful translated PDFs using Puppeteer                  |
| 💬 Real-time Feedback     | Instant UI feedback while processing                                 |
| ✅ Clean UX                | Responsive design, beginner-friendly, mobile-ready                   |


---


## ⚙️ Tech Stack

| Layer          | Tech Used                                               |
| -------------- | ------------------------------------------------------- |
| Frontend       | HTML, CSS, JavaScript (Vanilla JS)                      |
| Backend        | Node.js, Express.js                                     |
| File Handling  | `multer` (memory upload)                                |
| PDF Parsing    | `pdf-parse`                                             |
| Translation    | `google-translate-api-browser`                          |
| PDF Generation | Puppeteer + custom HTML/CSS for font-specific rendering |
| Messaging      | WhatsApp "Click to Chat" via web link                   |

---


## 🚀 Getting Started

### 1️⃣ Clone and Install

```bash
git clone https://github.com/yourusername/linguashare.git
cd linguashare
npm install express multer pdf-parse puppeteer google-translate-api-browser
```

### 2️⃣ Start the Server

```bash
node server.js
```

🔗 Open your browser at: [http://localhost:3000](http://localhost:3000)

---

## 🎮 How It Works (Step-by-Step)

1. **Upload** a PDF (with selectable text)
2. **Select** your target language from dropdown
3. **Enter** a WhatsApp number (with country code)
4. **Click Convert** → Server:

   * Extracts text via `pdf-parse`
   * Translates using `google-translate-api-browser`
   * Converts back to styled HTML → new PDF via Puppeteer
5. **Click Send to WhatsApp** →

   * File is downloaded locally
   * WhatsApp tab opens with a pre-filled message
   * User manually attaches translated PDF

---

## 🔒 Security & Privacy

* ✅ No file/data stored permanently
* ✅ Phone number validation
* ✅ No file is sent automatically — user approves every step
* ⚠️ Only `.pdf` files are allowed

---

## 💼 Real-World Use Cases

| 🏢 Sector     | 📌 Use Case                                                   |
| ------------- | ------------------------------------------------------------- |
| 🎓 NGOs       | Distribute syllabi & guides in local languages                |
| 🏥 Healthcare | Translate prescriptions, reports, and awareness docs          |
| 🏛 Government | Circulars and schemes delivered to regional populations       |
| 📈 Startups   | Multilingual product brochures and customer onboarding guides |

---

## 📈 Future Upgrades (v2.0 Ideas)

* 🔁 OCR for scanned image-only PDFs
* 🔊 Voice-to-PDF translation
* 🧠 AI summary before sending
* 📊 Admin dashboard with analytics
* ✨ Drag & Drop UI + Preview viewer
* 💬 Telegram, Email, and SMS integration
* ✅ OTP-based number verification
* 🔗 QR Code for downloadable link

---


## 🦄 Ready to Empower the Next Billion?

Let’s bridge the language gap — one PDF at a time. 💫
- **Fork. Star. Share. Empower.**
