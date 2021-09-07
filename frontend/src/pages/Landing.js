import React from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  landing: {
    position: 'relative',
    height: '100vh',
  },
  darkOverlay: {
    backgroundColor: 'black',
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
  },
  landingInner: {
    color: '#fff',
    height: '100%',
    width: '80%',
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    width: '200px',
  },
  large: {
    fontSize: '2rem',
  },
  lead: {
    fontSize: '2rem',
  },
}));

const Landing = () => {
  const classes = useStyles();
  const history = useHistory();

  const routeChange = () => {
    history.push('/login');
  };

  return (
    <section className={classes.landing}>
      <div className={classes.darkOverlay}>
        <div className={classes.landingInner}>
          <h1 className={classes.large}>Welcome to MyOwnMercedesAPP!</h1>
          <p className={classes.large}>
            Here will use Mercedes SandBox API to test our own virtual car.
          </p>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            style={{ borderRadius: 50 }}
            className={classes.submit}
            onClick={routeChange}
          >
            Login
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Landing;
