import { HeaderDrawerVO } from '@components/common/HeaderContainer'
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
import { makeStyles } from '@material-ui/core/styles'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import EventNoteIcon from '@material-ui/icons/EventNote'
import MenuIcon from '@material-ui/icons/Menu'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import React, { useState, MouseEvent } from 'react'
import { History, useHistory } from 'react-router-dom'
import { HeaderType } from '@interfaces/header'
import FooterContainer from '@components/common/FooterContainer'
import { UserRole } from '@interfaces/status'

const useStyles = makeStyles({
  title: {
    flexGrow: 1,
  },
  list: {
    width: 250,
  },
  list_bottom: {
    position: 'absolute',
    bottom: '0',
    textAlign: 'center',
    width: '100%',
    padding: '16px',
  },
})

interface Props {
  isLogin: boolean
  userRole: UserRole
  title: string
  profileUrl: string
  onClickProfile: Function
  onClickLogin: Function
  onClickSchedule: Function
  headerItems: any[]
  headerType: HeaderType
  drawerItems: HeaderDrawerVO[]
}

const Header: React.FC<Props> = ({
  isLogin,
  userRole,
  title,
  profileUrl,
  onClickProfile,
  onClickLogin,
  onClickSchedule,
  headerItems,
  headerType,
  drawerItems,
}) => {
  const classes = useStyles()
  const history: History = useHistory()
  const [isDrawerOpened, setDrawerOpened] = useState<boolean>(false)
  const list = (): JSX.Element => (
    <>
      <List
        className={classes.list}
        role="presentation"
        onClick={(e) => setDrawerOpened(false)}
        onKeyDown={(e) => setDrawerOpened(false)}>
        {drawerItems.map((item, index) => {
          return (
            <ListItem
              component="li"
              key={`drawer-item-${index}`}
              button
              onClick={(e) => item.onClick(e)}>
              <ListItemIcon key={`drawer-item-icon-${index}`}>
                {item.component}
              </ListItemIcon>
              <ListItemText
                key={`drawer-item-text-${index}`}
                primary={item.title}
              />
            </ListItem>
          )
        })}
      </List>
      <div className={classes.list_bottom}>
        <FooterContainer />
      </div>
    </>
  )

  const onClickBack = (e: MouseEvent) => {
    e.preventDefault()
    history.goBack()
  }

  const left = () => {
    if (headerType === HeaderType.TUTOR) {
      return (
        <>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="tutor's profile"
            onClick={(e) => onClickProfile(e)}>
            <AccountCircleIcon />
          </IconButton>
          <Typography component="h1" variant="h6" className={classes.title}>
            {title}
          </Typography>
        </>
      )
    } else if (headerType === HeaderType.MY_SCHEDULE) {
      return (
        <>
          <IconButton
            edge="start"
            color="inherit"
            onClick={(e) => onClickBack(e)}
            aria-label="back to previous page">
            <ArrowBackIcon />
          </IconButton>
          <Typography component="h1" variant="h6" className={classes.title}>
            {title}
          </Typography>
        </>
      )
    }

    return (
      <>
        <IconButton
          edge="start"
          color="inherit"
          onClick={(e) => onClickBack(e)}
          aria-label="back to previous page">
          <ArrowBackIcon />
        </IconButton>
        <Typography component="h1" variant="h6" className={classes.title}>
          {title}
        </Typography>
      </>
    )
  }

  const right = () => {
    if (headerType === HeaderType.TUTOR) {
      return (
        <>
          {isLogin ? (
            <>
              {userRole !== UserRole.TUTOR && (
                <IconButton
                  color="inherit"
                  aria-label="my schedule"
                  onClick={(e) => onClickSchedule(e)}>
                  <EventNoteIcon />
                </IconButton>
              )}
              <IconButton
                edge="end"
                color="inherit"
                aria-label="menu"
                onClick={(e) => setDrawerOpened(true)}>
                <MenuIcon />
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
        </>
      )
    } else if (headerType === HeaderType.MY_SCHEDULE) {
      return (
        <>
          <IconButton
            edge="end"
            color="inherit"
            aria-label="menu"
            onClick={(e) => setDrawerOpened(true)}>
            <MenuIcon />
          </IconButton>
          <Drawer
            anchor={'right'}
            open={isDrawerOpened}
            onClose={(e) => setDrawerOpened(false)}>
            {list()}
          </Drawer>
        </>
      )
    } else if (headerType === HeaderType.BOOKING) {
      return (
        <>
          {userRole !== UserRole.TUTOR && (
            <IconButton
              color="inherit"
              aria-label="my schedule"
              onClick={(e) => onClickSchedule(e)}>
              <EventNoteIcon />
            </IconButton>
          )}
          <Drawer
            anchor={'right'}
            open={isDrawerOpened}
            onClose={(e) => setDrawerOpened(false)}>
            {list()}
          </Drawer>
        </>
      )
    }

    return (
      <>
        {isLogin ? (
          <>
            <IconButton
              color="inherit"
              aria-label="my schedule"
              onClick={(e) => onClickSchedule(e)}>
              <EventNoteIcon />
            </IconButton>
            <IconButton
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={(e) => setDrawerOpened(true)}>
              <MenuIcon />
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
      </>
    )
  }

  return (
    <AppBar position="absolute">
      <Toolbar>
        {left()}
        {right()}
      </Toolbar>
    </AppBar>
  )
}

export default Header
