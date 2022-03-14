// Reducer => a function that takes in the old state, and an action (action specify how do we want to change the state) => new state...
const contextReducer = (state, action) => {
  let transactions;
  switch (action.type) {
    case 'DELETE_TRANSACTION':
      transactions = state.transactions.filter(transaction => transaction.transactionId !== action.payload);
      return { ...state, transactions };

    case 'ADD_TRANSACTION':
      transactions = [action.payload, ...state.transactions];
      return { ...state, transactions };

    case 'ADD_USER':
      return { ...state, user: action.payload };

    case 'CHECK_USER':
      return { ...state, user: action.payload };

    case 'GET_TRANSACTION':
      return { ...state, transactions: [...action.payload] };

    default:
      return state;
  }
};
export default contextReducer;
