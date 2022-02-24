import React, { useReducer, createContext } from 'react';
import contextReducer from './contextReducer';

const initialState = [];

export const ExpenseTrackerContext = createContext(initialState);

export const Provider = ({ children }) => {

  const [transactions, dispatch] = useReducer(contextReducer, initialState);
  // Action Creators
  // Dispatch is changing the state of transaction
  const deleteTransaction = transactionId => {
    const fetchConfig = { method: 'DELETE' };
    fetch(`/api/transactions/${transactionId}`, fetchConfig)
      .then(id => {
        dispatch({ type: 'DELETE_TRANSACTION', payload: transactionId });
      });

  };

  const addTransaction = transaction => {
    const fetchConfig = { method: 'POST', body: JSON.stringify(transaction), headers: { 'Content-Type': 'application/json' } };
    fetch('/api/transactions', fetchConfig)
      .then(resp => resp.json())
      .then(newTransaction => {
        dispatch({ type: 'ADD_TRANSACTION', payload: newTransaction });
      });
  };

  const balance = transactions.reduce((acc, currVal) => (currVal.type === 'Expense' ? parseFloat(acc) - parseFloat(currVal.amount) : parseFloat(acc) + parseFloat(currVal.amount)), 0);

  return (
    <ExpenseTrackerContext.Provider value={{
      transactions,
      balance,
      deleteTransaction,
      addTransaction
    }}>
      {children}
    </ExpenseTrackerContext.Provider>
  );
};
