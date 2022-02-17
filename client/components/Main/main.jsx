import React from 'react';
import { Card, CardHeader, CardContent, Typography, Grid, Divider } from '@material-ui/core';
import useStyles from './styles';
import Form from './Form/form';

const Main = () => {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardHeader title='Finance Tracker' />
      <CardContent>
        <Typography align='center' variant='h5'>Total Balance $550</Typography>
        <Divider />
        <Form />
      </CardContent>
      <CardContent className={classes.CardContent}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {/* <List /> */}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Main;
