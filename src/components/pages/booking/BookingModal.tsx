import ScheduleRequestInput from '@components/ui/ScheduleRequestInput'
import { useHeader } from '@hooks/useHeader'
import { HeaderType } from '@interfaces/header'
import {
  Button,
  DialogActions,
  DialogContent,
  IconButton,
  Typography,
} from '@material-ui/core'
import Dialog from '@material-ui/core/Dialog'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import { makeStyles } from '@material-ui/core/styles'
import CloseIcon from '@material-ui/icons/Close'
import React from 'react'

const useStyles = makeStyles({
  root: {
    display: 'flex',
    padding: '16px',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100%',
  },

  closeButton: {
    position: 'absolute',
    right: '8px',
    top: '8px',
    // right: theme.spacing(1),
    // top: theme.spacing(1),
    // color: ''theme.palette.grey[500]'',
  },
})

// const styles = (theme) => ({
//   root: {
//     margin: 0,
//     padding: theme.spacing(2),
//   },
//   closeButton: {
//     position: 'absolute',
//     right: theme.spacing(1),
//     top: theme.spacing(1),
//     color: theme.palette.grey[500],
//   },
// })

const BookingModal: React.FC = () => {
  const classes = useStyles()

  const setRef = (startTimeEl, endTimeEl) => {}
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  const DialogTitle = (props) => {
    const { children, onClose, ...other } = props
    return (
      <MuiDialogTitle disableTypography className={classes.root} {...other}>
        <Typography variant="h6" component="div">
          {children}
        </Typography>
        {onClose ? (
          <IconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={onClose}>
            <CloseIcon />
          </IconButton>
        ) : null}
      </MuiDialogTitle>
    )
  }

  return (
    <>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={false}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Modal title
        </DialogTitle>
        <DialogContent dividers>
          <ScheduleRequestInput
          setRef={setRef}
          onClick={()=>{}}
        />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>
            Save changes
          </Button>
        </DialogActions>
      </Dialog>
      
    </>
  )
}

export default BookingModal
