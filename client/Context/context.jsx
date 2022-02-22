import React, { useReducer, createContext } from 'react';
import contextReducer from './contextReducer';

const initialState = [];

export const ExpenseTrackerContext = createContext(initialState);

export const Provider = ({ children }) => {

  const [transactions, dispatch] = useReducer(contextReducer, initialState);

  // Action Creators
  // Dispatch is changing the state of transaction
  const deleteTransaction = id => {
    dispatch({ type: 'DELETE_TRANSACTION', payload: id });
  };

  const addTransaction = transaction => {
    const fetchConfig = { method: 'POST', body: JSON.stringify(transaction), headers: { 'Content-Type': 'application/json' } }; // add config for fetch here
    // eslint-disable-next-line no-console
    console.log('Transaction in addTransaction', transaction);
    fetch('/api/transactions', fetchConfig)
      .then(resp => resp.json())
      .then(newTransaction => {
        dispatch({ type: 'ADD_TRANSACTION', payload: newTransaction });
      });
  };

  return (
    <ExpenseTrackerContext.Provider value={{
      deleteTransaction,
      addTransaction,
      transactions
    }}>
      {children}
    </ExpenseTrackerContext.Provider>
  );
};
