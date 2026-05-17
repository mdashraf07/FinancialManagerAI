# 💰 FinanceAI — AI-Powered Finance Tracker

Full-stack finance tracker with Groq AI (Llama 3), MongoDB, React + Vite.

---

## 🚀 Run in 4 Commands (Everything is pre-configured!)

Open TWO terminal windows inside the `finance-tracker` folder:

**Terminal 1 — Server:**
```bash
cd server
npm install
npm run dev
```
✅ You should see: MongoDB Connected | Server running on port 5000

**Terminal 2 — Client:**
```bash
cd client
npm install
npm run dev
```
✅ Open browser → http://localhost:5173

That's it! No API keys to set up. Everything is already in .env ✅

---

## 📁 Folder Structure

```
finance-tracker/
├── server/
│   ├── controllers/   ← auth, transaction, AI logic
│   ├── middleware/    ← JWT auth check
│   ├── models/        ← User & Transaction schemas
│   ├── routes/        ← API route definitions
│   ├── server.js      ← Express entry point
│   └── .env           ← ✅ Keys already filled in
└── client/
    └── src/
        ├── components/ ← Navbar, Charts, Forms, List
        ├── context/    ← Auth state
        ├── pages/      ← Dashboard, Login, Register, AI
        └── services/   ← API calls
```

---

## ☁️ Deploy Free

**Server → Render.com**
- Build: `npm install` | Start: `npm start`
- Add the same env vars from `.env`

**Client → Vercel.com**
- Change proxy in `vite.config.js` to your Render URL
- Deploy client folder

