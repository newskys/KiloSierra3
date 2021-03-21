import { HeaderDrawerVO } from '@components/common/HeaderContainer'
import {
  AppBar,
  Button,
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
    <div
      className={classes.list}
      role="presentation"
      onClick={(e) => setDrawerOpened(false)}
      onKeyDown={(e) => setDrawerOpened(false)}>
      {drawerItems.map((item, index) => {
        return (
          <List key={`drawer-list-${index}`}>
            <ListItem
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
          </List>
        )
      })}
    </div>
  )

  const onClickBack = (e: MouseEvent) => {
    e.preventDefault()
    history.goBack()
  }

  const left = () => {
    if (headerType === HeaderType.TUTOR) {
      return (
        <>
          <IconButton edge="start" color="inherit" aria-label="tutor's profile">
            <AccountCircleIcon onClick={(e) => onClickProfile(e)} />
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
        </>
      )
    } else if (headerType === HeaderType.MY_SCHEDULE) {
      return (
        <>
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
      )
    } else if (headerType === HeaderType.BOOKING) {
      return (
        <>
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
      )
    }

    return (
      <>
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
