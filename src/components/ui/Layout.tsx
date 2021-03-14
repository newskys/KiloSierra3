import FooterContainer from '@components/common/FooterContainer';
import HeaderContainer from '@components/common/HeaderContainer';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles({
  root: {
    flexWrap: 'nowrap',
    height: '100%',
  },
  main: {
    flex: '1 1 auto',
    height: 'calc(100vh - 56px - 66px)',
    backgroundColor: 'pink',
  },
  footer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: '0 0 auto',
    height: '66px',
  },
})

interface Props {
  useHeader?: boolean
  children?: any
}

const Layout: React.FC<Props> = ({ children, useHeader = true }) => {
  const classes = useStyles()

  return (
    <Grid className={classes.root} container direction="column">
      {useHeader && (
        <HeaderContainer />
      )}
      <Grid className={classes.main} component="main" item>
        {children}
      </Grid>
      <Grid className={classes.footer} component="footer" item>
        <FooterContainer />
      </Grid>
    </Grid>
  )
}

export default Layout
