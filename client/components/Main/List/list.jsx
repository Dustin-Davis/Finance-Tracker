import React from 'react';
import { List as MUIList, ListItem, ListItemAvatar, ListItemText, Avatar, ListItemSecondaryAction, IconButton, Slide } from '@material-ui/core';
import { Delete, MoneyOff } from '@material-ui/icons';

import useStyles from './styles';

const List = () => {
  const classes = useStyles();

  const transactions = [
    { id: 1, type: 'Income', category: 'Salary', amount: 75, date: 'Thurs Feb 17' },
    { id: 2, type: 'Expense', category: 'Car', amount: 750, date: 'Thurs Feb 18' },
    { id: 3, type: 'Income', category: 'Salary', amount: 7500, date: 'Thurs Feb 19' }

  ];

  return (
    <MUIList dense={false} className={classes.list}>
      {transactions.map(transactions => (
        <Slide direction='down' in mountOnEnter unmountOnExit key={transactions.id}>
          <ListItem>
            <ListItemAvatar>
              <Avatar className={transactions.type === 'Income' ? classes.avatarIncome : classes.avatarExpense }>
                <MoneyOff />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={transactions.category} secondary={`$${transactions.amount} - ${transactions.date}`}/>
            <ListItemSecondaryAction>
              <IconButton edge='end' aria-label='delete'>
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
