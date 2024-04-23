import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import "../Styles/History.css";

const History = () => {
  const user = useSelector(state => state.user.user);
  const [transactions, setTransactions] = useState([]);
  const [filter, setFilter] = useState('All');
  const [sortOrder, setSortOrder] = useState('Ascending');
  const [editingId, setEditingId] = useState(null);
  const [editCategory, setEditCategory] = useState('');

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(`https://expensetrackerbackend-y9nk.onrender.com/transactions?userId=${user.id}`);
        setTransactions(response.data);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    if (user) {
      fetchTransactions();
    }
  }, [user]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://expensetrackerbackend-y9nk.onrender.com/transactions/${id}`);
      setTransactions(transactions.filter(transaction => transaction.id !== id));
    } catch (error) {
      console.error('Error deleting transaction:', error);
    }
  };

  const handleEditClick = (transaction) => {
    setEditingId(transaction.id);
    setEditCategory(transaction.category);
  };

  const handleSave = async () => {
    try {
      const response = await axios.patch(`https://expensetrackerbackend-y9nk.onrender.com/transactions/${editingId}`, {
        category: editCategory,
      });
      const updatedTransactions = transactions.map(transaction => {
        if (transaction.id === editingId) {
          return { ...transaction, category: editCategory };
        }
        return transaction;
      });
      setTransactions(updatedTransactions);
      setEditingId(null);
    } catch (error) {
      console.error('Error updating transaction:', error);
    }
  };

  const filteredTransactions = transactions
    .filter(transaction => filter === 'All' || transaction.type === filter)
    .sort((a, b) => sortOrder === 'Ascending' ? new Date(a.date) - new Date(b.date) : new Date(b.date) - new Date(a.date));

  return (
    <div className="history-container">
      <h2 style={{ fontFamily: "cursive", fontSize: "45px" }}>History</h2>
      <div className="filters">
        <select value={filter} onChange={e => setFilter(e.target.value)}>
          <option value="All">All</option>
          <option value="Income">Income</option>
          <option value="Expense">Expense</option>
        </select>
        <select value={sortOrder} onChange={e => setSortOrder(e.target.value)}>
          <option value="Ascending">Ascending</option>
          <option value="Descending">Descending</option>
        </select>
      </div>
      {filteredTransactions.map(transaction => (
        <div className="card" key={transaction.id}>
          {editingId === transaction.id ? (
            <div className="edit-form">
              <input
                type="text"
                value={editCategory}
                onChange={(e) => setEditCategory(e.target.value)}
              />
              <button onClick={handleSave}>Save</button>
              <button onClick={() => setEditingId(null)}>Cancel</button>
            </div>
          ) : (
            <div className="card-info">
              <div className="card-title">{transaction.category}</div>
              <div className="card-date">{new Date(transaction.date).toDateString()}</div>
              <div className={`card-amount ${transaction.type === 'Income' ? 'income' : 'expense'}`}>
                {transaction.type === 'Income' ? '+' : '-'}₹{transaction.amount}
              </div>
              <div className="card-actions">
                <button className="edit-btn" onClick={() => handleEditClick(transaction)}>✏️</button>
                <button className="delete-btn" onClick={() => handleDelete(transaction.id)}>❌</button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default History;
