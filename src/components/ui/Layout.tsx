import FooterContainer from '@components/common/FooterContainer';
import HeaderContainer from '@components/common/HeaderContainer';
import { Grid, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { HeaderState, headerState } from '@recoil/header';
import React from 'react';
import { useRecoilState } from 'recoil';

const useStyles = makeStyles({
  root: {
    position: 'relative',
    height: '100%',
    padding: '56px 0 66px',
    boxSizing: 'border-box',
  },
  main: {
    height: '100%',
  },
  footer: {
    position: 'absolute',
    left: '0',
    bottom: '0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '66px',
  },
})

interface Props {
  children?: any
}

const Layout: React.FC<Props> = ({ children }) => {
  const [headerStore, setHeaderStore] = useRecoilState<HeaderState>(headerState)
  const classes = useStyles()

  return (
    <Grid className={classes.root} container direction="column">
      {headerStore.isVisible && (
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
