import React from 'react';
import { Card, CardHeader, CardContent, Typography } from '@material-ui/core';
import useStyles from './styles';

const Details = ({ title }) => {
  const classes = useStyles();
  return (
      <Card className={title === 'Income' ? classes.income : classes.expense}>
        <CardHeader title={title} />
        <CardContent>
          <Typography variant='h5'>$100</Typography>
        </CardContent>
      </Card>
  );
};

export default Details;
