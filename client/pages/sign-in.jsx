import React, { useContext, useState } from 'react';
import { ExpenseTrackerContext } from '../Context/context';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const initialState = {
  email: '',
  password: ''
};

const guestState = {
  email: 'Guest@mail.com',
  password: 'guest1234'
};

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  errorCode: {
    color: 'red'
  }
}));

export default function SignIn() {
  const classes = useStyles();
  const [formData, setFormData] = useState(initialState);
  const [guestData, setGuestData] = useState(guestState);
  const [errorMessage, setErrorMessage] = useState('');
  const { login } = useContext(ExpenseTrackerContext);

  const handleSignIn = event => {
    event.preventDefault();
    const user = { ...formData };
    login(user)
      .then(user => {
        if (user.error) {
          setErrorMessage('Invalid Email/Password');
        }
      });
    setFormData(initialState);
  };

  const guestSignIn = event => {
    event.preventDefault();
    const guest = { ...guestData };
    login(guest);
    setGuestData(guestState);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={handleSignIn}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            required
            value={formData.email}
            onChange={e => setFormData({ ...formData, email: e.target.value })}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            required
            value={formData.password}
            onChange={e => setFormData({ ...formData, password: e.target.value })}
          />
          <div className={classes.errorCode}>{errorMessage}</div>
          <Button
            type='submit'
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link onClick={guestSignIn} variant="body2">
                Guest Sign In
              </Link>
            </Grid>
            <Grid item>
              <Link href="#sign-up" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
      </Box>
    </Container>
  );
}
