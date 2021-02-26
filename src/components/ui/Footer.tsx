import React from 'react'
import { Button, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  text: {
    fontSize: '12px',
    textTransform: 'none',
  },
  copyright: {
    display: 'block',
    fontSize: '12px',
    textTransform: 'none',
  },
})

interface Props {
  isLogin: boolean
  onClickLogin: Function
  onClickLogout: Function
}

const Footer: React.FC<Props> = ({ isLogin, onClickLogin, onClickLogout }) => {
  const classes = useStyles()

  return (
    <>
      {
        <Button
          href={'#'}
          className={classes.text}
          onClick={(e) => (isLogin ? onClickLogout(e) : onClickLogin(e))}>
          {isLogin ? 'Logout' : 'Login'}
        </Button>
      }
      <Typography className={classes.copyright} component="small">
        Copyright &copy; Umlaut 2021
      </Typography>
    </>
  )
}

export default Footer;
