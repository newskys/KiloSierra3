import {
  AppBar,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'

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
  isLogin: boolean
  onClickHamburger: Function
  onClickLogin: Function
  onClickLogout: Function
}

const Header: React.FC<Props> = ({
  isLogin,
  onClickHamburger,
  onClickLogin,
  onClickLogout,
}) => {
  const classes = useStyles()

  return (
    <AppBar position="sticky">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <AccountCircleIcon onClick={(e) => onClickHamburger(e)} />
        </IconButton>
        <Typography component="h1" variant="h6" className={classes.title}>
          Ramona
        </Typography>

        {isLogin ? (
          <MenuIcon />
        ) : (
          <Button
            color="inherit"
            onClick={(e) => onClickLogin(e)
            }>Login</Button>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default Header
