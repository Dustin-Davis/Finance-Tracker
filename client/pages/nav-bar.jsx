import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { ExpenseTrackerContext } from '../Context/context';

const useStyles = makeStyles(theme => ({
  root: {
    paddingBottom: '35px'
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

export default function ButtonAppBar() {
  const classes = useStyles();
  const { logout } = useContext(ExpenseTrackerContext);

  return (
    <div className={classes.root}>
      <AppBar>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
          </Typography>
          <Button href='#' color="inherit" onClick={logout}>Sign Out</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
