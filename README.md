# 🎙️ PodGenie – AI-Powered Podcast Generator

**PodGenie** is a lightweight, AI-powered web app built using Streamlit that lets anyone generate podcast-style audio by simply entering a topic. It uses **Gemini 2.5 Flash** by Google to generate the podcast script and **gTTS** to convert it into voice.

---

## 🚀 Features

- 🤖 **Script Generation with Gemini 2.5 Flash**
- 🔊 **Voice Synthesis using Google Text-to-Speech (gTTS)**
- 🎧 **Streamlined UI using Streamlit**
- ⬇️ **Downloadable Podcast Audio (MP3)**

---

## 🛠️ Tech Stack

| Component         | Tool Used                          |
|------------------|------------------------------------|
| UI / Frontend    | Streamlit                          |
| Script Generation| Gemini 2.5 Flash (via Google AI API)|
| Text-to-Speech   | gTTS (Google Text-to-Speech)       |
| Audio Playback   | Streamlit Audio Player             |

---

## 🧪 How It Works

1. Enter a topic like _"The Future of Robotics"_
2. The app sends the topic to **Gemini 2.5 Flash** using the Google Generative AI SDK.
3. Gemini returns a podcast-style script.
4. gTTS converts the text into voice.
5. You can listen to or download the generated podcast.

---
## Working

```bash
Create .env file
GEMINI_API_KEY=AIzaSyAKDD-Wf5zL6xqaiV_HcCGVHypZxbgf_-I

export GOOGLE_APPLICATION_CREDENTIALS= project/hackathon-463806-f7d9eb3ff7cc.json #Create a gTS API file first

cd podcast-generator && node server.js

cd podcast-generator-ui/
streamlit run app.py
```
## 📦 Installation

```bash
git clone https://github.com/psreyas09/project
cd project/podgenie
pip install -r requirements.txt
streamlit run app.py
```


 
