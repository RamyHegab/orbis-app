# Orbis — The IO Buddy

International Office CRM built with Next.js + Supabase.

## Setup

1. Install dependencies:
```
npm install
```

2. Add environment variables — create `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

3. Run locally:
```
npm run dev
```

Open http://localhost:3000

## Deploy to Vercel

1. Push to GitHub
2. Connect repo in Vercel
3. Add environment variables in Vercel settings
4. Deploy

## Pages

- `/login` — Login page
- `/dashboard` — Home dashboard
- `/agents` — Agent database
- `/itinerary` — Trip planner
- `/forms` — Lead capture forms
- `/notes` — Visit notes
- `/mail` — Mailing

## Stack

- Next.js 14 (App Router)
- Supabase (PostgreSQL + Auth + RLS)
- Vercel (Hosting)
# orbis-app
