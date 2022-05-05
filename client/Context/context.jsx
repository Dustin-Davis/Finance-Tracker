import React, { useReducer, createContext } from 'react';
import contextReducer from './contextReducer';

const initialState = {
  transactions: [],
  user: null
};

export const ExpenseTrackerContext = createContext(initialState);

export const Provider = ({ children }) => {

  const token = window.localStorage.getItem('user');
  const payload = JSON.parse(token);
  if (payload) {
    initialState.user = payload;
  }

  const [state, dispatch] = useReducer(contextReducer, initialState);
  const { transactions, user } = state;

  const deleteTransaction = transactionId => {
    const fetchConfig = { method: 'DELETE' };
    fetch(`/api/transactions/${transactionId}`, fetchConfig)
      .then(id => {
        dispatch({ type: 'DELETE_TRANSACTION', payload: transactionId });
      });

  };

  const addTransaction = (transaction, user) => {
    const fetchConfig = { method: 'POST', body: JSON.stringify(transaction), headers: { 'Content-Type': 'application/json', 'x-access-token': user.token } };
    fetch('/api/transactions', fetchConfig)
      .then(resp => resp.json())
      .then(newTransaction => {
        dispatch({ type: 'ADD_TRANSACTION', payload: newTransaction });
      });
  };

  const addUser = user => {
    const fetchConfig = { method: 'POST', body: JSON.stringify(user), headers: { 'Content-Type': 'application/json' } };
    fetch('/api/users/sign-up', fetchConfig)
      .then(resp => resp.json())
      .then(newUser => {
        dispatch({ type: 'ADD_USER', payload: newUser });
      });
  };

  const login = user => {
    const fetchConfig = { method: 'POST', body: JSON.stringify(user), headers: { 'Content-Type': 'application/json' } };
    fetch('/api/users/sign-in', fetchConfig)
      .then(resp => resp.json())
      .then(user => {
        dispatch({ type: 'CHECK_USER', payload: user });
        localStorage.setItem('user', JSON.stringify(user));
      });
  };

  const logout = user => {
    localStorage.removeItem('user');
  };

  const getTransactions = user => {
    const fetchConfig = { method: 'GET', headers: { 'x-access-token': user.token } };
    fetch('/api/transactions', fetchConfig)
      .then(resp => resp.json())
      .then(transactions => {
        dispatch({ type: 'GET_TRANSACTION', payload: transactions });
      });
  };

  const balance = transactions.reduce((acc, currVal) => (currVal.type === 'Expense'
    ? parseFloat(acc) - parseFloat(currVal.amount)
    : parseFloat(acc) + parseFloat(currVal.amount)), 0);

  return (
    <ExpenseTrackerContext.Provider value={{
      transactions,
      balance,
      deleteTransaction,
      addTransaction,
      getTransactions,
      addUser,
      login,
      logout,
      user
    }}>
      {children}
    </ExpenseTrackerContext.Provider>
  );
};
