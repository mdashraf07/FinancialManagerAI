const Groq = require('groq-sdk');
const Transaction = require('../models/Transaction');

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

exports.getInsights = async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user.id })
      .sort({ date: -1 })
      .limit(60);

    if (transactions.length === 0) {
      return res.json({
        insight: 'No transactions found. Add some income and expenses first to get AI insights!'
      });
    }

    const summary = transactions
      .map(
        (t) =>
          `${t.type.toUpperCase()}: ₹${t.amount} | Category: ${t.category} | ${t.description} | Date: ${new Date(t.date).toLocaleDateString()}`
      )
      .join('\n');

    const completion = await groq.chat.completions.create({
      model: 'llama3-70b-8192',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: `You are a smart personal finance advisor. Analyze these transactions and give 4-5 clear, specific, and actionable bullet points. Include spending patterns, savings tips, and budget recommendations. Be direct and practical.\n\nTransactions:\n${summary}`
        }
      ]
    });

    res.json({ insight: completion.choices[0].message.content });
  } catch (err) {
    res.status(500).json({ message: 'AI error', error: err.message });
  }
};

exports.chat = async (req, res) => {
  try {
    const { question } = req.body;

    const transactions = await Transaction.find({ user: req.user.id }).sort({ date: -1 });

    const summary = transactions
      .map(
        (t) =>
          `${t.type.toUpperCase()}: ₹${t.amount} | ${t.category} | ${t.description} | ${new Date(t.date).toLocaleDateString()}`
      )
      .join('\n');

    const completion = await groq.chat.completions.create({
      model: 'llama3-70b-8192',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: `You are a helpful personal finance assistant. The user has these transactions:\n\n${summary}\n\nUser question: "${question}"\n\nAnswer clearly, specifically using their actual data. Be concise and helpful.`
        }
      ]
    });

    res.json({ answer: completion.choices[0].message.content });
  } catch (err) {
    res.status(500).json({ message: 'AI error', error: err.message });
  }
};
