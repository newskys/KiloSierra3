import React from 'react';
import '@scss/components/ui/Layout.scss';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    height: '100%'
  },
  header: {
    position: 'sticky',
    top: 0,
    left: 0,
    height: '50px',
  },
  main: {
    flex: '1 1 auto',
  },
  footer: {
    flex: '0 0 auto',
    height: '50px',
  }
});

const Layout: React.FC = () => {
  const classes = useStyles();

  return (
    <Grid
      className={classes.root}
      container
      direction='column'
    >
      <Grid className={classes.header} component='header' item>Grid Item Header</Grid>
      <Grid className={classes.main} component='main' item>Grid Item main</Grid>
      <Grid className={classes.footer} component='footer' item>Grid Item footer</Grid>
    </Grid>
  );
};

export default Layout;