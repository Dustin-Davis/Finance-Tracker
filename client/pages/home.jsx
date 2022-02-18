import React from 'react';
import { Grid } from '@material-ui/core';
import Main from '../components/Main/main';
import Details from '../components/Details/details';
import useStyles from './styles';

export default function Home(props) {
  const classes = useStyles();
  return <>
  <div>
    <Grid className={classes.grid} container spacing={0} alignItems='center' justifyContent='center' style={{ height: '100vh' }}>
      <Grid item xs={12} sm={4}>
        <Details title='Income' />
      </Grid>
      <Grid item xs={12} sm={3}>
          <Main />
      </Grid>
        <Grid item xs={12} sm={4}>
          <Details title='Expense' />
        </Grid>
    </Grid>
  </div>
  </>;
}
