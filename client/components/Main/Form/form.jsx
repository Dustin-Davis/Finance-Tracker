import React, { useState, useContext, useEffect } from 'react';
import { TextField, Typography, Grid, Button, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { ExpenseTrackerContext } from '../../../Context/context';
import useStyles from './styles';
import formatDate from '../../../utils/formatDate';
import { incomeCategories, expenseCategories } from '../../../constants/categories';

const initialState = {
  amount: '',
  categoryId: '',
  type: '',
  date: formatDate(new Date())
};

const Form = () => {
  const classes = useStyles();
  // eslint-disable-next-line no-unused-vars
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState(initialState);
  const { addTransaction } = useContext(ExpenseTrackerContext);

  useEffect(() => {
    fetch('/api/categories')
      .then(resp => resp.json())
      .then(categories => {
        setCategories(categories);
      });
  }, []);

  const createTransaction = () => {
    const transaction = { ...formData };
    addTransaction(transaction);
    setFormData(initialState);
  };
  const Categories = formData.type === 'Income' ? incomeCategories : expenseCategories;
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
    <Typography align='center'></Typography>
      </Grid>
      <Grid item xs={6}>
        <FormControl fullWidth>
          <InputLabel>Type</InputLabel>
          <Select value={formData.type} onChange={e => setFormData({ ...formData, type: e.target.value }) }>
            <MenuItem value='Income'>Income</MenuItem>
            <MenuItem value='Expense'>Expense</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <FormControl fullWidth>
          <InputLabel>Category</InputLabel>
          <Select value={formData.categoryId} onChange={e => setFormData({ ...formData, categoryId: e.target.value })}>
            {
             Categories.map(cat => (
                <MenuItem key={cat.categoryId} value={cat.categoryId}>{cat.category}</MenuItem>
             ))
            }
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <TextField type='number' label='Amount' fullWidth value={formData.amount} onChange={e => setFormData({ ...formData, amount: e.target.value })}/>
      </Grid>
      <Grid item xs={6}>
        <TextField type='date' label='Date' fullWidth value={formData.date} onChange={e => setFormData({ ...formData, date: formatDate(e.target.value) })}/>
      </Grid>
      <Button className={classes.button} variant='outlined' color='primary' fullWidth onClick={createTransaction}>Create</Button>
    </Grid>
  );
};
export default Form;
