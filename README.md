# Mood Radio – Practice Project 🎧

**A lightweight, expression-responsive music player for the web.**

Mood Radio is a practice-driven React application built to explore the integration of **external cloud storage (ImageKit)** and **standard browser-based APIs**. The goal was to create a seamless "Scan & Play" experience where the UI reacts dynamically to the user's current state.

---

## 💡 Project Purpose
This project was developed as a hands-on exercise to master:
1.  **External Asset Management:** Learning how to host, fetch, and stream media from **ImageKit**.
2.  **Standard API Implementation:** Using the `face-api.js` library as a standard API to bridge the gap between user input and dynamic data retrieval.
3.  **Frontend Logic:** Constructing conditional streaming URLs without the need for a complex backend.

## ✨ Key Features

### 📸 Expression-Based Interaction
* **Standard API Usage:** Leverages `face-api.js` as an out-of-the-box solution to detect facial expressions (Happy, Sad, Angry, etc.) directly in the browser.
* **Instant Feedback:** A live-status indicator keeps the user informed of the "mood scan" in real-time.

### ☁️ Cloud Storage Mastery
* **ImageKit Integration:** All audio assets are hosted externally. The app demonstrates how to programmatically fetch high-quality MP3 files using direct cloud URLs.
* **Seamless Streaming:** When an expression is detected, the app instantly builds the path (e.g., `https://ik.imagekit.io/your_id/mood.mp3`) and plays it via the HTML5 audio player.

### 🎨 Minimalist Dark UI
* **Sleek Design:** A "premium feel" dark-mode interface built with modern CSS and **Inter** typography.
* **Interactive States:** Polished button transitions and a clean, semantic layout for an effortless user experience.

---

## 🛠️ Tech Stack

* **Frontend:** React (Vite)
* **Detection Engine:** face-api.js (Standard API integration)
* **Media Hosting:** ImageKit
* **Styling:** Modern CSS-in-JS properties

---

## 🚀 Getting Started

### Prerequisites
* Node.js
* A modern browser with webcam access

### Installation
```bash
# Clone the repository
git clone [https://github.com/siddhi070306/mod-player.git](https://github.com/siddhi070306/mod-player.git)

# Navigate to the project directory
cd mod-player

# Install dependencies
npm install

# Run the development server
npm run dev
