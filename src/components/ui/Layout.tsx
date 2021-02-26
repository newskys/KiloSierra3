import FooterContainer from '@components/common/FooterContainer'
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import '@scss/components/ui/Layout.scss'
import React from 'react'
import Header from './Header'

const useStyles = makeStyles({
  root: {
    height: "100%",
    flexWrap: "nowrap",
  },
  header: {
    position: "sticky",
    top: 0,
    left: 0,
    height: "50px",
  },
  main: {
    flex: "1 1 auto",
  },
  footer: {
    flex: '0 0 auto',
    height: '66px',
    textAlign: 'center',
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
        <Grid className={classes.header} component="header" item>
          <Header />
        </Grid>
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
