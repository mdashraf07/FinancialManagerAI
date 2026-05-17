import React, { useState, useEffect } from 'react';
import { getTransactions, getStats } from '../services/api';
import TransactionForm from '../components/TransactionForm';
import TransactionList from '../components/TransactionList';
import Charts from '../components/Charts';

const StatCard = ({ title, value, icon, color }) => (
  <div className={`bg-white rounded-2xl shadow-sm border-l-4 ${color} p-5`}>
    <div className="flex justify-between items-center">
      <div>
        <p className="text-xs text-gray-400 uppercase tracking-wide">{title}</p>
        <p className="text-2xl font-extrabold text-gray-700 mt-1">
          ₹{value.toLocaleString('en-IN')}
        </p>
      </div>
      <span className="text-3xl">{icon}</span>
    </div>
  </div>
);

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [txRes, statsRes] = await Promise.all([getTransactions(), getStats()]);
      setTransactions(txRes.data);
      setStats(statsRes.data);
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAdd = (newTx) => {
    setTransactions((prev) => [newTx, ...prev]);
    fetchData();
  };

  const handleDelete = (id) => {
    setTransactions((prev) => prev.filter((t) => t._id !== id));
    fetchData();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96 text-gray-400">
        Loading your dashboard...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-extrabold text-gray-800 mb-2">📊 Dashboard</h1>
      <p className="text-gray-400 text-sm mb-8">Track your income, expenses, and savings all in one place.</p>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <StatCard title="Total Income" value={stats?.totalIncome || 0} icon="💵" color="border-green-500" />
        <StatCard title="Total Expenses" value={stats?.totalExpense || 0} icon="💸" color="border-red-400" />
        <StatCard
          title="Net Balance"
          value={stats?.balance || 0}
          icon={stats?.balance >= 0 ? '🏦' : '⚠️'}
          color={stats?.balance >= 0 ? 'border-indigo-500' : 'border-orange-400'}
        />
      </div>

      {/* Charts */}
      <div className="mb-8">
        <Charts stats={stats} />
      </div>

      {/* Form + List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TransactionForm onAdd={handleAdd} />
        <TransactionList transactions={transactions} onDelete={handleDelete} />
      </div>
    </div>
  );
};

export default Dashboard;
