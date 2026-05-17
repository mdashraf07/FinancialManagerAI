💰 FinanceAI — Your Personal Finance Tracker, Powered by AI
Most people don't fail at earning money. They fail at understanding where it goes.
FinanceAI was built to fix that. It's a full-stack web application that lets you log your income and expenses, visualize your spending patterns through charts, and then ask an AI — powered by Groq's Llama 3 — real questions about your financial habits and actually get useful answers back.
Not "you spent too much." More like — "Your food spending is 43% of your total expenses this month. Here's how to bring it down."
What This App Does

Track transactions — Add income or expenses in seconds with category, amount, description, and date
See the full picture — A monthly bar chart shows income vs expenses over 6 months. A pie chart breaks down exactly where your money goes by category
Talk to your finances — Ask the AI anything. "How much did I spend on food?" or "Am I saving enough this month?" and it answers using your actual data
Get smart analysis — One click generates a full AI spending analysis with actionable tips specific to your transactions
Stay secure — Every user gets their own account with JWT-based authentication. Your data stays yours


Tech Stack
Frontend

React 18 with Vite (fast dev + fast build)
Tailwind CSS (clean, responsive UI)
Recharts (bar + pie charts)
Axios (API calls)
React Router v6 (page navigation)

Backend

Node.js + Express
MongoDB Atlas + Mongoose (cloud database)
JSON Web Tokens (auth)
bcryptjs (password hashing)

AI

Groq API — Llama 3 70B model (blazing fast inference, free tier available)


Project Structure
finance-tracker/
│
├── client/                        ← Everything the user sees
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx         ← Top navigation bar
│   │   │   ├── TransactionForm.jsx← Add income/expense form
│   │   │   ├── TransactionList.jsx← Scrollable transaction history
│   │   │   └── Charts.jsx         ← Bar chart + Pie chart
│   │   ├── context/
│   │   │   └── AuthContext.jsx    ← Global auth state
│   │   ├── pages/
│   │   │   ├── Login.jsx          ← Login page
│   │   │   ├── Register.jsx       ← Register page
│   │   │   ├── Dashboard.jsx      ← Main dashboard
│   │   │   └── AIInsights.jsx     ← AI chat + analysis page
│   │   ├── services/
│   │   │   └── api.js             ← All Axios API calls in one place
│   │   ├── App.jsx                ← Routes + private route guard
│   │   ├── main.jsx               ← React entry point
│   │   └── index.css              ← Tailwind base styles
│   ├── index.html
│   ├── vite.config.js             ← Dev proxy to backend
│   ├── tailwind.config.js
│   └── postcss.config.js
│
└── server/                        ← Everything the server handles
    ├── controllers/
    │   ├── authController.js      ← Register, login, get user
    │   ├── transactionController.js← CRUD + stats calculation
    │   └── aiController.js        ← Groq AI insights + chat
    ├── middleware/
    │   └── auth.js                ← JWT verification middleware
    ├── models/
    │   ├── User.js                ← User schema (with password hashing)
    │   └── Transaction.js         ← Transaction schema
    ├── routes/
    │   ├── auth.js                ← /api/auth routes
    │   ├── transactions.js        ← /api/transactions routes
    │   └── ai.js                  ← /api/ai routes
    ├── server.js                  ← Express app + MongoDB connection
    ├── package.json
    └── .env                       ← Your secrets (never commit this)

Getting Started
You need Node.js 18 or above installed. That's the only requirement.
Step 1 — Install server dependencies
bashcd finance-tracker/server
npm install
Step 2 — Install client dependencies
bashcd finance-tracker/client
npm install
Step 3 — Run both
Open two terminal windows:
Terminal 1:
bashcd finance-tracker/server
npm run dev
Terminal 2:
bashcd finance-tracker/client
npm run dev
Open your browser and go to http://localhost:5173
The .env file is already configured with the database and AI key. No setup needed — register an account and start adding transactions.

API Reference
Auth
MethodEndpointDescriptionPOST/api/auth/registerCreate new accountPOST/api/auth/loginLogin and get tokenGET/api/auth/meGet logged-in user
Transactions
MethodEndpointDescriptionGET/api/transactionsGet all transactions (with filters)POST/api/transactionsAdd new transactionDELETE/api/transactions/:idDelete a transactionGET/api/transactions/statsGet totals, breakdown, monthly data
AI
MethodEndpointDescriptionGET/api/ai/insightsAI analysis of your spendingPOST/api/ai/chatAsk a question about your finances
All routes except register and login require a Bearer token in the Authorization header.

Deploying to the Internet (Free)
Backend → Render.com

Push your server/ folder to a GitHub repository
Go to render.com and create a new Web Service
Connect your GitHub repo
Set the following:

Build Command: npm install
Start Command: npm start


Add your environment variables (same as .env file) under the Environment tab
Click Deploy and copy your live URL (e.g. https://financeai.onrender.com)

Frontend → Vercel.com

Open client/vite.config.js and change the proxy target to your Render URL:

jsproxy: {
  '/api': 'https://your-app-name.onrender.com'
}

Push your client/ folder to GitHub
Go to vercel.com, import the repo, and deploy
Your live frontend URL is ready in under a minute


Environment Variables
The .env file lives in the server/ folder:
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secret_key
GROQ_API_KEY=your_groq_api_key
Never push this file to GitHub. Add .env to your .gitignore.

Features at a Glance

✅ JWT Authentication (register, login, logout)
✅ Add, view, and delete income/expense transactions
✅ Filter transactions by type, category, month, year
✅ Monthly income vs expense bar chart (last 6 months)
✅ Category-wise expense pie chart
✅ Summary cards — total income, total expenses, net balance
✅ AI spending analysis with one click
✅ AI chat — ask anything about your own financial data
✅ Fully responsive — works on mobile and desktop
✅ Secure password hashing with bcrypt
✅ All data scoped per user — complete data isolation


What's Next (Ideas to Extend)

Export transactions to CSV or PDF
Monthly budget goals with progress tracking
Recurring transaction reminders
Email reports every month
Dark mode
