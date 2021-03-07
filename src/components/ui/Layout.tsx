import React from 'react'
import { Grid, AppBar, Toolbar, IconButton, Typography, Button, } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu';
import FooterContainer from '@components/common/FooterContainer'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  root: {
    flexWrap: 'nowrap',
    height: '100%',
  },
  title: {
    flexGrow: 1,
  },
  main: {
    flex: '1 1 auto',
    height: 'calc(100vh - 56px - 66px)',
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
        <AppBar position="sticky">
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu">
              <MenuIcon />
            </IconButton>
            <Typography component="h1" variant="h6" className={classes.title}>
              News
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
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
