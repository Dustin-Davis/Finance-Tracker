import React from 'react';
import { Grid } from '@material-ui/core';
import Main from '../components/Main/main';
import Details from '../components/Details/details';
import useStyles from './styles';
import NavBar from './nav-bar';

export default function Home(props) {
  const classes = useStyles();
  return <>
  <div>
      <Grid className={classes.grid} container alignItems='center' justifyContent='center' style={{ height: '100vh' }}>
        <NavBar />
      <Grid item xs={12} sm={4} className={classes.tablet}>
        <Details title='Income' />
      </Grid>
      {/* <Grid item xs={12} sm={4} className={classes.tablet}>
        <Details title='Income' />
      </Grid> */}
      <Grid item xs={12} sm={3} className={classes.main}>
          <Main />
      </Grid>
        <Grid item xs={12} sm={4} className={classes.desktop}>
          <Details title="Income" />
        </Grid>
        <Grid item xs={12} sm={4} className={classes.last}>
          <Details title='Expense' />
        </Grid>
    </Grid>
  </div>
  </>;
}
