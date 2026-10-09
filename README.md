# 📰 Bangla News 24

**Bangla News 24** is a modern, responsive Bangla news website that helps users stay updated with the latest news across different categories. It features a clean interface, breaking news ticker, featured articles, most-read news, and user authentication.

## ✨ Features

* 🏠 **Homepage:** Displays featured news and articles from multiple categories.
* 🔴 **Latest News Ticker:** A scrolling marquee for the latest headlines.
* 📂 **News Categories:** Browse news by category.
* 🔥 **Most Read News:** Discover popular and widely read articles.
* 📰 **News Details:** Read individual news articles.
* 🔐 **User Authentication:** Sign-in and sign-up functionality.
* 👤 **User Profile:** Access user information and account options.
* 📱 **Responsive Design:** Optimized for mobile, tablet, and desktop devices.
* ⚡ **Fast Performance:** Built with Next.js and optimized data fetching.
* 🇧🇩 **Bangla Interface:** Designed for Bangla-speaking readers.

## 🛠️ Technologies Used

* **Next.js** — React framework
* **React** — User interface development
* **TypeScript** — Type safety
* **Tailwind CSS** — Responsive styling
* **REST API** — News and category data
* **Next.js Image** — Image optimization
* **Authentication** — User sign-in and sign-up
* **Vercel** — Deployment

## 🌐 Live Website

🔗 [Visit Bangla News 24](https://bangla-news-24.vercel.app/)

> Replace the link above with your actual deployed website URL if it is different.

## 📦 Installation

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

### 2. Navigate to the project folder

```bash
cd bangla-news-24
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create a `.env.local` file in the root directory and add the environment variables required by your authentication provider and application.

```env
# Add your required environment variables here
```

### 5. Start the development server

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

## 📁 Project Structure

```text
bangla-news-24/
├── public/
│   └── logo.webp
├── src/
│   ├── app/
│   │   ├── page.tsx
│   │   ├── category/
│   │   └── news/
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── NavLink.tsx
│   │   ├── Marquee.tsx
│   │   ├── MainNews.tsx
│   │   ├── NewsCard.tsx
│   │   ├── MostRead.tsx
│   │   └── UserInfo.tsx
│   └── lib/
└── package.json
```

*Note: The structure above is illustrative. Adjust file names and folders to match your actual project.*

## 📡 News API

The application fetches news and category data from the following API endpoints:

* News sections: `https://news-api-v2.vercel.app/api/news/sections`
* News categories: `https://news-api-v2.vercel.app/api/categories`
* Latest headlines: `https://news-api-v2.vercel.app/api/news?limit=10`
* Most-read news: `https://news-api-v2.vercel.app/api/news/most-read`

## 🚀 Deployment

The project can be deployed on **Vercel**.

1. Push your code to GitHub.
2. Import the repository into Vercel.
3. Configure the required environment variables.
4. Deploy the application.

## 🎯 Project Goal

The goal of Bangla News 24 is to provide a simple, accessible, and user-friendly platform where readers can explore the latest news and popular stories in Bangla.

## 👨‍💻 Author

Developed with ❤️ using Next.js and modern web technologies.

---

⭐ If you like this project, consider giving the repository a star!
