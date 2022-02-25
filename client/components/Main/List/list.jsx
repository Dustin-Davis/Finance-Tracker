import React, { useContext, useEffect } from 'react';
import { List as MUIList, ListItem, ListItemAvatar, ListItemText, Avatar, ListItemSecondaryAction, IconButton, Slide } from '@material-ui/core';
import { Delete, MoneyOff } from '@material-ui/icons';

import { ExpenseTrackerContext } from '../../../Context/context';
import useStyles from './styles';

const List = () => {
  const classes = useStyles();
  const { deleteTransaction, getTransactions, transactions } = useContext(ExpenseTrackerContext);

  useEffect(() => {
    getTransactions();
  }, []);

  return (
    <MUIList dense={false} className={classes.list}>
      {transactions.map(transaction => (
        <Slide direction='down' in mountOnEnter unmountOnExit key={transaction.transactionId}>
          <ListItem>
            <ListItemAvatar>
              <Avatar className={transaction.type === 'Income' ? classes.avatarIncome : classes.avatarExpense }>
                <MoneyOff />
              </Avatar>
            </ListItemAvatar>
            <ListItemText key={transaction.transactionId} primary={transaction.category} secondary={`$${transaction.amount} - ${transaction.date}`}/>
            <ListItemSecondaryAction>
              <IconButton edge='end' aria-label='delete' onClick={() => deleteTransaction(transaction.transactionId)}>
                <Delete />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        </Slide>
      ))}
    </MUIList>
  );
};

export default List;
