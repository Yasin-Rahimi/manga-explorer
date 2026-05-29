# 📚 Manga Lens

**Manga Lens** is a modern web application for exploring, searching, and discovering manga. It offers a rich, responsive UI with both traditional and AI-powered search, image-based manga identification, and detailed manga pages with reviews, recommendations, and multilingual synopsis translation.

![Manga Lens Screenshot](screenshot.png)

---

## ✨ Features

### 🔍 Normal & AI-Assisted Search

Search manga by title or simply describe your taste, and let AI recommend the perfect manga for you.

### 🖼️ Image Search

Upload a manga panel, cover, or anime screenshot to:

* Identify the manga using GPT-4o Vision
* Find the exact anime scene using trace.moe

### 📖 Manga Details

View comprehensive information about each manga:

* Score
* Rank
* Popularity
* Genres
* Chapters
* Volumes
* Author information
* Persian-translated synopsis

### 📝 User Reviews & AI Summary

Read community reviews and get an AI-generated summary highlighting the most frequently mentioned strengths and weaknesses.

### 💡 Recommendations

Discover similar manga based on the currently viewed title.

### 🌗 Dark & Light Mode

Fully supports both dark and light themes with:

* System preference detection
* Manual theme switching
* Persistent user preference

### 📱 Responsive Design

Optimized for:

* Mobile devices
* Tablets
* Desktop screens

### ⌨️ Keyboard Navigation

Navigate hero banners, search results, and trending manga using keyboard shortcuts and arrow keys.

---

## 🛠️ Tech Stack

| Category           | Technology                            |
| ------------------ | ------------------------------------- |
| Framework          | React (Vite)                          |
| Routing            | React Router                          |
| Styling            | Tailwind CSS + Custom CSS Variables   |
| API Calls          | Axios                                 |
| AI Integration     | OpenAI (GPT-4o Vision, Qwen3-30B-A3B) |
| Manga Data         | Jikan API (MyAnimeList)               |
| Anime Scene Search | trace.moe                             |
| Anime Info         | AniList GraphQL                       |
| Icons              | React Icons                           |
| Fonts              | Vazir                                 |

---

## 🚀 Getting Started

### Prerequisites

Before running the project, make sure you have:

* Node.js (v18 or newer)
* npm or yarn
* A local proxy server for AI requests (configured to use `/api/gpt`)

---

## 📦 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/manga-lens.git
cd manga-lens
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the project root:

```env
VITE_AI_API_KEY=your-ai-api-key
VITE_AI_VISION_API_KEY=your-vision-api-key
```

> **Note**
>
> These keys are only required for AI-powered features and image search. The application will still run without them, but those features will be unavailable.

### 4. Start the Development Server

```bash
npm run dev
```

Open:

```text
http://localhost:5173
```

---

## 🏗️ Production Build

Build the application:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

---

## 📂 Project Structure

```text
src/
├── assets/          # Fonts, images, global styles
├── components/      # Reusable UI components
├── layouts/         # MainLayout
├── lib/             # AI functions, API wrappers, external services
├── loaders/         # React Router loaders
├── pages/           # Application pages
├── router/          # Routing & Global Error Boundary
└── main.jsx         # Application entry point
```

---

## 🌟 Core Pages

* Home
* Search
* AI Search
* Manga Details
* Image Search

---

## 📜 License

This project is licensed under the MIT License.

---

## ❤️ About

Manga Lens was built to make manga discovery faster, smarter, and more enjoyable through a combination of modern UI design, AI-powered recommendations, and image recognition technologies.

Enjoy exploring the world of manga with **Manga Lens**!