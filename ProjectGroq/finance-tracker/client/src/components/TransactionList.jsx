import React from 'react';
import { deleteTransaction } from '../services/api';

const CATEGORY_EMOJI = {
  Food: '🍔', Transport: '🚗', Shopping: '🛍️', Entertainment: '🎬',
  Health: '💊', Utilities: '💡', Education: '📚', Rent: '🏠',
  Salary: '💼', Freelance: '💻', Investment: '📈', Business: '🏢',
  Bonus: '🎁', Other: '📌'
};

const TransactionList = ({ transactions, onDelete }) => {
  const handleDelete = async (id) => {
    if (!window.confirm('Delete this transaction?')) return;
    try {
      await deleteTransaction(id);
      onDelete(id);
    } catch {
      alert('Error deleting transaction.');
    }
  };

  if (transactions.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
        <p className="text-4xl mb-3">📭</p>
        <p className="text-gray-400 text-sm">No transactions yet. Add one!</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <h2 className="text-lg font-semibold text-gray-700 mb-5">🧾 Recent Transactions</h2>
      <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
        {transactions.map((t) => (
          <div
            key={t._id}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">
                {CATEGORY_EMOJI[t.category] || '📌'}
              </span>
              <div>
                <p className="text-sm font-medium text-gray-700">{t.description}</p>
                <p className="text-xs text-gray-400">
                  {t.category} · {new Date(t.date).toLocaleDateString('en-IN')}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span
                className={`font-bold text-sm ${
                  t.type === 'income' ? 'text-green-600' : 'text-red-500'
                }`}
              >
                {t.type === 'income' ? '+' : '-'}₹{t.amount.toLocaleString('en-IN')}
              </span>
              <button
                onClick={() => handleDelete(t._id)}
                className="text-gray-300 hover:text-red-400 transition text-sm"
                title="Delete"
              >
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionList;
