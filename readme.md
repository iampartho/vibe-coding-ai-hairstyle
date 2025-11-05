# Hairstyle AI 💇‍♀️✨

Welcome to Hairstyle AI! This web application uses your device's camera and the power of Google's Gemini AI to let you try on different hairstyles in real-time. Just snap a photo, describe a hairstyle, and see the magic happen.

This project is built with React, TypeScript, and Tailwind CSS, and it connects directly to the Gemini API from the browser.

## ✨ Features

- **📷 Live Webcam Capture:** Easily take a photo using your desktop or mobile camera.
- **🤖 AI-Powered Styling:** Utilizes the Gemini `gemini-2.5-flash-image` model to edit your photo with a new hairstyle based on a text prompt.
- **💡 Style Suggestions:** Get inspired with a list of trendy and classic hairstyle ideas.
- **🎨 Color Experiments:** Try out vibrant hair colors like blue, red, or pink.
- **📥 Download Your Look:** Save your new hairstyle as a JPG image.
- **📱 Fully Responsive:** Works seamlessly on both desktop and mobile browsers.

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

*   You need [Git](https://git-scm.com/) installed to clone the repository.
*   You need a modern web browser like Chrome, Firefox, or Safari.
*   You must have a **Google Gemini API Key**. You can get one from [Google AI Studio](https://aistudio.google.com/app/apikey).

### Running the Application

This project is designed as a modern web application that can be run using any static file server. However, it has a specific requirement for the API key.

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/hairstyle-ai.git
    cd hairstyle-ai
    ```
    *(Note: Replace `your-username/hairstyle-ai.git` with the actual repository URL if you fork it.)*

2.  **API Key Configuration:**
    The application code in `services/geminiService.ts` expects the Gemini API key to be available in the environment as `process.env.API_KEY`.

    When running on a platform like Google AI Studio, this variable is often provided for you. For local development, your server environment must be able to inject this variable into the code. A simple static server **will not** do this, and the application will fail to make API calls.

    A common way to handle this is to use a build tool like [Vite](https://vitejs.dev/) or [Create React App](https://create-react-app.dev/), which can read the key from a local `.env` file and make it available to the application during development.

3.  **Serve the files:**
    Once you have a development environment capable of handling the API key, serve the project's root directory. The project's `index.html` uses import maps, so no `npm install` is required to fetch dependencies like React.

## Usage Guide

1.  **Open the App:** Launch the application in your browser.
2.  **Grant Permission:** Your browser will ask for permission to use your camera. Please allow it.
3.  **Strike a Pose:** Position yourself in the center of the video frame.
4.  **Capture:** Click the "Take Photo" button.
5.  **Describe a Style:** On the next screen, you can either:
    *   Click on one of the suggested hairstyle buttons (e.g., "Pixie Cut", "Vibrant Blue").
    *   Type your own creative description into the text box (e.g., "long, curly hair with rainbow highlights").
6.  **Generate:** Click the "Generate Style" button and wait a few moments for the AI to work its magic.
7.  **View & Save:**
    *   Your new look will appear on the screen!
    *   Click "Download Image" to save it.
    *   Click "Try a Different Style" to go back to the prompt screen with the same photo.
    *   Click "Take a New Photo" to start over from the beginning.

## 📱 Using on Your Phone

This app is designed to be mobile-friendly!

1.  Open your phone's web browser (e.g., Chrome on Android, Safari on iOS).
2.  Navigate to the URL where the app is hosted.
3.  The app will request access to your camera (it will likely use the front-facing "selfie" camera by default).
4.  Follow the same usage steps as listed above. The layout will adapt to your screen size.
