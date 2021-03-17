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
import React, { ReactNode, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import InboxIcon from '@material-ui/icons/MoveToInbox'
import MailIcon from '@material-ui/icons/Mail'
import EventNoteIcon from '@material-ui/icons/EventNote'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import { HeaderDrawerVO } from '@components/common/HeaderContainer'
import { useRecoilState } from 'recoil'
import { headerState, HeaderState } from '@recoil/header'

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
  list: {
    width: 250,
  },
})

interface Props {
  isLogin: boolean
  title: string
  onClickProfile: Function
  onClickLogin: Function
  onClickLogout: Function
  onClickSchedule: Function
  drawerItems: HeaderDrawerVO[]
}

const Header: React.FC<Props> = ({
  isLogin,
  title,
  onClickProfile,
  onClickLogin,
  onClickLogout,
  onClickSchedule,
  drawerItems,
}) => {
  const classes = useStyles()
  const [isDrawerOpened, setDrawerOpened] = useState<boolean>(false)
  const list = () => (
    <div
      className={classes.list}
      role="presentation"
      onClick={(e) => setDrawerOpened(false)}
      onKeyDown={(e) => setDrawerOpened(false)}>
      {drawerItems.map((item, index) => {
        return (
          <List key={`drawer-list-${index}`}>
            <ListItem key={`drawer-item-${index}`} button onClick={(e) => item.onClick(e)}>
              <ListItemIcon key={`drawer-item-icon-${index}`}>
                {item.component}
              </ListItemIcon>
              <ListItemText key={`drawer-item-text-${index}`} primary={item.title} />
            </ListItem>
          </List>
        )
      })}
    </div>
  )
  return (
    <AppBar position="sticky">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="tutor's profile">
          <AccountCircleIcon onClick={(e) => onClickProfile(e)} />
        </IconButton>
        <Typography component="h1" variant="h6" className={classes.title}>
          {title}
        </Typography>

        {isLogin ? (
          <>
            <IconButton color="inherit" aria-label="my schedule">
              <EventNoteIcon onClick={(e) => onClickSchedule(e)} />
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
