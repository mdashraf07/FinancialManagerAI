import React, { useState } from 'react';
import { getInsights, chatWithAI } from '../services/api';

const QUICK_QUESTIONS = [
  'How much did I spend on food?',
  'What is my biggest expense category?',
  'Am I saving enough this month?',
  'Give me tips to reduce my spending.'
];

const AIInsights = () => {
  const [insights, setInsights] = useState('');
  const [loadingInsights, setLoadingInsights] = useState(false);
  const [question, setQuestion] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [loadingChat, setLoadingChat] = useState(false);

  const fetchInsights = async () => {
    setLoadingInsights(true);
    try {
      const res = await getInsights();
      setInsights(res.data.insight);
    } catch {
      setInsights('❌ Could not fetch insights. Check your API key and try again.');
    } finally {
      setLoadingInsights(false);
    }
  };

  const handleChat = async (q) => {
    const userQ = q || question;
    if (!userQ.trim()) return;
    setQuestion('');
    setLoadingChat(true);
    setChatHistory((prev) => [...prev, { role: 'user', text: userQ }]);
    try {
      const res = await chatWithAI(userQ);
      setChatHistory((prev) => [...prev, { role: 'ai', text: res.data.answer }]);
    } catch {
      setChatHistory((prev) => [
        ...prev,
        { role: 'ai', text: '❌ Sorry, I could not answer that. Please try again.' }
      ]);
    } finally {
      setLoadingChat(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleChat();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-extrabold text-gray-800 mb-1">🤖 AI Financial Insights</h1>
      <p className="text-gray-400 text-sm mb-8">Powered by Claude AI — Smart analysis of your spending habits</p>

      {/* AI Analysis Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-5">
          <div>
            <h2 className="text-lg font-bold text-gray-700">📊 Spending Analysis</h2>
            <p className="text-xs text-gray-400 mt-1">AI will analyze your transactions and give smart insights</p>
          </div>
          <button
            onClick={fetchInsights}
            disabled={loadingInsights}
            className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-indigo-700 disabled:opacity-50 transition whitespace-nowrap"
          >
            {loadingInsights ? '⏳ Analyzing...' : '✨ Analyze My Spending'}
          </button>
        </div>

        {insights ? (
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-5 text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
            {insights}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-gray-300">
            <span className="text-5xl mb-3">🔍</span>
            <p className="text-sm text-gray-400">Click the button above to get your AI-powered financial insights</p>
          </div>
        )}
      </div>

      {/* Chat Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-bold text-gray-700 mb-1">💬 Chat With Your Finances</h2>
        <p className="text-xs text-gray-400 mb-5">Ask anything about your spending, savings, or financial habits</p>

        {/* Chat messages */}
        <div className="min-h-48 max-h-80 overflow-y-auto mb-4 space-y-3">
          {chatHistory.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-3xl mb-3">💭</p>
              <p className="text-gray-400 text-sm mb-4">Ask me anything about your finances!</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {QUICK_QUESTIONS.map((q) => (
                  <button
                    key={q}
                    onClick={() => handleChat(q)}
                    className="bg-gray-100 text-gray-600 px-3 py-1.5 rounded-full text-xs hover:bg-indigo-50 hover:text-indigo-600 transition"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            chatHistory.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-sm lg:max-w-lg px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-indigo-600 text-white rounded-br-sm'
                      : 'bg-gray-100 text-gray-700 rounded-bl-sm'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))
          )}
          {loadingChat && (
            <div className="flex justify-start">
              <div className="bg-gray-100 text-gray-400 px-4 py-3 rounded-2xl text-sm rounded-bl-sm">
                🤖 Thinking...
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask about your finances..."
            disabled={loadingChat}
            className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
          />
          <button
            type="submit"
            disabled={loadingChat || !question.trim()}
            className="bg-indigo-600 text-white px-5 py-3 rounded-xl text-sm font-semibold hover:bg-indigo-700 disabled:opacity-50 transition"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default AIInsights;
