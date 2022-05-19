import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  desktop: {
    [theme.breakpoints.up('sm')]: {
      display: 'none'
    }
  },
  mobile: {
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },
  tablet: {
    display: 'none',
    [theme.breakpoints.between('sm', 'xl')]: {
      display: 'block'
    }
  },
  main: {
    [theme.breakpoints.up('sm')]: {
      paddingBottom: '5%',
      'max-width': '30%'
    }
  },
  last: {
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(3)
      // paddingBottom: '200px'
    }
  },
  grid: {
    '& > *': {
      margin: '2px'
    }
  }
}));
