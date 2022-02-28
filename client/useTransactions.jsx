import { useContext } from 'react';
import { ExpenseTrackerContext } from './Context/context';

import { incomeCategories, expenseCategories, resetCategories } from './constants/categories';

const useTransactions = title => {
  resetCategories();
  const { transactions } = useContext(ExpenseTrackerContext);
  const transactionsPerType = transactions.filter(t => t.type === title);
  const total = transactionsPerType.reduce((acc, currVal) => parseFloat(acc) + parseFloat(currVal.amount), 0);
  const categories = title === 'Income' ? incomeCategories : expenseCategories;
  transactionsPerType.forEach(t => {
    const category = categories.find(c => c.type === t.category);

    if (category) category.amount = parseFloat(category.amount) + parseFloat(t.amount);
  });

  const filteredCategories = categories.filter(c => c.amount > 0);

  const chartData = {
    datasets: [{
      data: filteredCategories.map(c => parseFloat(c.amount)),
      backgroundColor: filteredCategories.map(c => c.color)
    }],
    labels: filteredCategories.map(c => c.type)
  };

  return { filteredCategories, total, chartData };
};

export default useTransactions;
