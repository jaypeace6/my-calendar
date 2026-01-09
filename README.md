# My Calendar
A React + Vite app using FullCalendar to display events from public Google Calendars.

## Features

- Display a Google Calendar in a calendar grid.
- Fetch events from **public Google Calendars** using an API key.
- Fully client-side (no server required).

## Prerequisites

- Node.js (v18+ recommended)
- npm or yarn
- Google Cloud account to get a **Google Calendar API key**  

## Setup

1. **Clone the repository**

```bash
git clone https://github.com/your-username/my-calendar.git
cd my-calendar
```

2. Install dependencies
` npm install `

3. (May be needed) Introduce yourself with GitHub credentials so you can push/pull
- I used VSCode, in which you will also need to run in the terminal:

```bash
git config --global user.email "you@example.com"
git config --global user.name "Your Name"
```

4. Create API Key from Google then create .env file in project root
  - (yes annoyingly will require getting a trial attached to a payment in case you run over usage)
  - Navigate to Google Cloud Console (https://console.cloud.google.com/) -> APIs and Services -> Library. Search for Google Calendar and enable the API
  - now navigate to Credentails -> API key and generate an API Key
  - Under "API restrictions", select "Restrict key" and check "Google Calendar API".
  - Under "Application restrictions", optionally restrict to websites (e.g., http://localhost:5173/* for local dev). Leave unrestricted for now.
Click "Save".
  - Each dev needs their own API key in .env -- do not share key publicly
  - Note: works only with public Google Calendars until we implement OAuth.
  - In .env file, add the following line, replacing 'YOUR_API_KEY_HERE' with the one you created
`VITE_GOOGLE_CALENDAR_API_KEY=YOUR_API_KEY_HERE`

5. Run the app 
` npm run dev `

6. View the app running on http://localhost:5173/
  - You should also get a popup to confirm app is running and what port the app is running on. If you don't see a popup, check the terminal in the IDE).
  - You should see a calendar, and if your api key was set correctly, you will see a US Holiday on it's appropriate date pulled from the Google US Public Holidays calendar

7. CTL + C to stop the process, localhost sould show not available.

# Troubleshooting

1. If you see localhost continue to run or not show updates, run
` netstat -ano | findstr :5173 `


2. Use the last column to replace all as '{EACH_PID}' including brackets below, until all are terminated:
` taskkill /PID {EACH_PID} /F `

3. You should see localhost show as unavailable.

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
