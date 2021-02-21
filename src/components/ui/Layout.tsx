import React from 'react';
import '@scss/components/ui/Layout.scss';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    height: '100%',
    flexWrap: 'nowrap',
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
  },
  copyright: {
    display: 'block',
    textAlign: 'center',
    fontSize: '12px',
  }
});

interface Props {
  useHeader?: boolean,
  children?: any
}

const Layout: React.FC<Props> = ({ children, useHeader = true }) => {
  const classes = useStyles();

  return (
    <Grid
      className={classes.root}
      container
      direction='column'
    >
      {useHeader &&
        <Grid className={classes.header} component='header' item>Grid Item Header dd</Grid>}
      <Grid className={classes.main} component='main' item>
        {children}
      </Grid>
      <Grid className={classes.footer} component='footer' item>
        <Typography className={classes.copyright} component='small'>Copyright &copy; Umlaut 2021</Typography>
      </Grid>
    </Grid>
  );
};

export default Layout;