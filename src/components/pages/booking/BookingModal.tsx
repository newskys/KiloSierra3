import ScheduleRequestInput from '@components/ui/ScheduleRequestInput'
import { useHeader } from '@hooks/useHeader'
import { HeaderType } from '@interfaces/header'
import { ScheduleRequest } from '@interfaces/schedule'
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
import React, { useState } from 'react'

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

interface Props {
  isOpen: boolean
  setOpen: Function
  setSchedule: Function
  initDateTime: Date
}

const BookingModal: React.FC<Props> = ({
  isOpen,
  setOpen,
  initDateTime,
  setSchedule,
}) => {
  const classes = useStyles()
  const [startTimeEl, setStartTimeEl] = useState<HTMLInputElement>(null)
  const [endTimeEl, setEndTimeEl] = useState<HTMLInputElement>(null)
  const [titleEl, setTitleEl] = useState<HTMLInputElement>(null)
  const [placeEl, setPlaceEl] = useState<HTMLInputElement>(null)
  const [phoneEl, setPhoneEl] = useState<HTMLInputElement>(null)

  const setRef = (startTimeEl, endTimeEl, titleEl, placeEl, phoneEl) => {
    startTimeEl
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleClickSave = (e) => {
    const newSchedule: ScheduleRequest = {
      startDate: null,
      endDate: null,
      title: null,
      level: null,
      place: null,
      phone: null,
    }

    setSchedule(newSchedule)
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
        open={isOpen}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          예약 신청
        </DialogTitle>
        <DialogContent dividers>
          <ScheduleRequestInput
            initDateTime={initDateTime}
            setRef={setRef}
            onClickClose={handleClose}
            onClickSave={handleClickSave}
            setSchedule={setSchedule}
            hasSavedInfo={true}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickSave}>Save changes</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default BookingModal
