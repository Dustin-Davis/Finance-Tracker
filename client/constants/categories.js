const incomeColors = ['#123123', '#154731', '#165f40', '#16784f', '#14915f', '#10ac6e', '#0bc77e', '#04e38d', '#00ff9d'];
const expenseColors = ['#b50d12', '#bf2f1f', '#c9452c', '#d3583a', '#dc6a48', '#e57c58', '#ee8d68', '#f79d79', '#ffae8a', '#cc474b', '#f55b5f'];

export const incomeCategories = [
  { categoryId: 1, category: 'Business', amount: 0, color: incomeColors[0] },
  { categoryId: 2, category: 'Investments', amount: 0, color: incomeColors[1] },
  { categoryId: 3, category: 'Extra income', amount: 0, color: incomeColors[2] },
  { categoryId: 4, category: 'Deposits', amount: 0, color: incomeColors[3] },
  { categoryId: 5, category: 'Lottery', amount: 0, color: incomeColors[4] },
  { categoryId: 6, category: 'Gifts', amount: 0, color: incomeColors[5] },
  { categoryId: 7, category: 'Salary', amount: 0, color: incomeColors[6] },
  { categoryId: 8, category: 'Savings', amount: 0, color: incomeColors[7] },
  { categoryId: 9, category: 'Rental income', amount: 0, color: incomeColors[8] }
];

export const expenseCategories = [
  { categoryId: 10, category: 'Bills', amount: 0, color: expenseColors[0] },
  { categoryId: 11, category: 'Car', amount: 0, color: expenseColors[1] },
  { categoryId: 12, category: 'Clothes', amount: 0, color: expenseColors[2] },
  { categoryId: 13, category: 'Travel', amount: 0, color: expenseColors[3] },
  { categoryId: 14, category: 'Food', amount: 0, color: expenseColors[4] },
  { categoryId: 15, category: 'Shopping', amount: 0, color: expenseColors[5] },
  { categoryId: 16, category: 'House', amount: 0, color: expenseColors[6] },
  { categoryId: 17, category: 'Entertainment', amount: 0, color: expenseColors[7] },
  { categoryId: 18, category: 'Phone', amount: 0, color: expenseColors[8] },
  { categoryId: 19, category: 'Pets', amount: 0, color: expenseColors[9] },
  { categoryId: 20, category: 'Other', amount: 0, color: expenseColors[10] }
];

export const resetCategories = () => {
  // eslint-disable-next-line no-return-assign
  incomeCategories.forEach(c => c.amount = 0);
  // eslint-disable-next-line no-return-assign
  expenseCategories.forEach(c => c.amount = 0);
};
