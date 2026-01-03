# 🍳 Recipe Rescue

A cute pixel-art recipe extractor that rescues recipes from ad-cluttered pages!

![Recipe Rescue](https://img.shields.io/badge/made%20with-💜-9381ff)

## Features

- 🔗 Paste any recipe URL and get a clean, readable recipe card
- ✅ Check off ingredients and steps as you cook
- 📋 Copy recipe to clipboard
- 🎮 Cute pixel art aesthetic with lavender/periwinkle vibes

## Deploy to Vercel

### Step 1: Push to GitHub

1. Create a new repository on GitHub
2. Push this code to your repository:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/recipe-rescue.git
git push -u origin main
```

### Step 2: Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click "Add New..." → "Project"
3. Import your `recipe-rescue` repository
4. **Important:** Add your environment variable before deploying:
   - Click "Environment Variables"
   - Add `ANTHROPIC_API_KEY` with your API key from [console.anthropic.com](https://console.anthropic.com)
5. Click "Deploy"

That's it! Your app will be live at `your-project.vercel.app` 🎉

## Local Development

1. Clone the repo
2. Copy `.env.example` to `.env.local` and add your Anthropic API key
3. Install dependencies and run:

```bash
npm install
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000)

## Tech Stack

- Next.js 14 (App Router)
- React 18
- Anthropic Claude API (with web search)
- Deployed on Vercel

---

Made with 💜 for clutter-free cooking
