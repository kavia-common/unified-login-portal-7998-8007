# Rainbow Burst Login Portal Frontend

A playful, vibrant React web app for authentication, user profile management, and security settings. Built with React Router, custom CSS, and a delightful Rainbow Burst theme.

## Features

- Responsive layout with Sidebar + Topbar + Main content
- OAuth login placeholders: Google, GitHub, Facebook
- Email/password login and signup (placeholder)
- Profile page: view/edit user info
- Security page: password change, sessions, connected providers, 2FA setup placeholder
- Organized structure: components, pages, theme, utils, routing
- .env.example for required environment variables
- No heavy UI frameworks; handcrafted CSS design

## Getting Started

1) Install dependencies
   npm install

2) Configure environment
   Copy .env.example to .env and update values.

3) Run the app
   npm start

4) Build for production
   npm run build

## Environment Variables

See .env.example. Important keys:
- REACT_APP_API_BASE_URL: Backend API origin for auth endpoints
- REACT_APP_SITE_URL: App URL used for redirect configuration
- REACT_APP_GOOGLE_CLIENT_ID, REACT_APP_GITHUB_CLIENT_ID, REACT_APP_FACEBOOK_APP_ID: client IDs (typically backend handles OAuth, but include here for reference)

## Code Structure

- src/components/layout: Sidebar and Topbar for the app shell
- src/pages: Login, Dashboard, Profile, Security, Settings
- src/theme/ThemeContext.jsx: Theme toggler and context
- src/utils/api.js: Placeholder REST API integration
- src/utils/auth.js: Simple auth context (in-memory)

## Wiring OAuth and REST

- Replace placeholder methods in src/utils/api.js with real network calls to your backend (e.g., fetch or axios).
- Common flows:
  - OAuth: redirect to `${API_BASE}/auth/{provider}` then handle callback to set session cookie; fetch current user from `${API_BASE}/me`.
  - Email/password: POST to `${API_BASE}/auth/login` and `${API_BASE}/auth/signup`.
  - Profile: PATCH `${API_BASE}/me`.
  - Security: POST `${API_BASE}/me/password`, POST `${API_BASE}/me/2fa/start`, GET/DELETE `${API_BASE}/me/sessions`.

## Style Guide

Rainbow Burst palette:
- Primary: #EC4899
- Secondary: #8B5CF6
- Success: #10B981
- Error: #EF4444
- Background: #FDF2F8
- Surface: #FFFFFF
- Text: #374151

Enjoy the playful gradients, rounded corners, and energetic UI! 🌈
