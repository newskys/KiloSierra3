import React from 'react'
import { Button, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  copyright: {
    fontSize: '12px',
    textTransform: 'none',
  },
})

interface Props {
  isLogin: boolean
  onClickLogin: Function
  onClickLogout: Function
}

const Footer: React.FC<Props> = () => {
  const classes = useStyles()

  return (
    <>
      <Typography className={classes.copyright} component="small">
        Copyright &copy; Umlaut 2021
      </Typography>
    </>
  )
}

export default Footer;
