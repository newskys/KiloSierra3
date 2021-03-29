import React from 'react'
import { Button, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  list: {
    display: 'block',
    paddingBottom: '8fpx',
  },
  item: {
    fontSize: '12px',
    textTransform: 'none',
    paddingBottom: '8px',
  },
  copyright: {
    display: 'block',
    fontSize: '12px',
    textTransform: 'none',
    padding: '8px',
  },
})

const Footer: React.FC = () => {
  const classes = useStyles()

  return (
    <>
      <div className={classes.list}>
        <Typography className={classes.item} component="small">
          이용약관
        </Typography>
        ・
        <Typography className={classes.item} component="small">
          개인정보처리방침
        </Typography>
        ・
        <Typography className={classes.item} component="small">
          사업자정보
        </Typography>
      </div>
      <Typography className={classes.copyright} component="small">
        Copyright &copy; Umlaut 2021
      </Typography>
    </>
  )
}

export default Footer
