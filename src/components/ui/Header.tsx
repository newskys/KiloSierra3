import {
  AppBar,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import InboxIcon from '@material-ui/icons/MoveToInbox'
import MailIcon from '@material-ui/icons/Mail'
import EventNoteIcon from '@material-ui/icons/EventNote'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'

const useStyles = makeStyles({
  title: {
    flexGrow: 1,
  },
  list: {
    width: 250,
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
  const [isDrawerOpened, setDrawerOpened] = useState<boolean>(false)
  const list = () => (
    <div
      className={classes.list}
      role="presentation"
      onClick={(e) => setDrawerOpened(false)}
      onKeyDown={(e) => setDrawerOpened(false)}>
      <List>
        <ListItem button>
          <ListItemIcon>
            <AccountCircleIcon />
          </ListItemIcon>
          <ListItemText primary={'My Account'} />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button onClick={(e) => onClickLogout(e)}>
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary={'Logout'} />
        </ListItem>
      </List>
    </div>
  )
  return (
    <AppBar position="absolute">
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="lecturer's profile">
          <AccountCircleIcon onClick={(e) => onClickHamburger(e)} />
        </IconButton>
        <Typography component="h1" variant="h6" className={classes.title}>
          Ramona
        </Typography>

        {isLogin ? (
          <>
            <IconButton color="inherit" aria-label="my schedule">
              <EventNoteIcon />
            </IconButton>
            <IconButton edge="end" color="inherit" aria-label="menu">
              <MenuIcon onClick={(e) => setDrawerOpened(true)} />
            </IconButton>
            <Drawer
              anchor={'right'}
              open={isDrawerOpened}
              onClose={(e) => setDrawerOpened(false)}>
              {list()}
            </Drawer>
          </>
        ) : (
          <Button color="inherit" onClick={(e) => onClickLogin(e)}>
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default Header
