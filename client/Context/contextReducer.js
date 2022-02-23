// Reducer => a function that takes in the old state, and an action => new state...
const contextReducer = (state, action) => {
  let transactions;

  switch (action.type) {
    case 'DELETE_TRANSACTION':
      transactions = state.filter(transaction => transaction.transactionId !== action.payload);

      return transactions;
    case 'ADD_TRANSACTION':
      transactions = [action.payload, ...state];

      return transactions;
    default:
      return state;
  }
};

export default contextReducer;
