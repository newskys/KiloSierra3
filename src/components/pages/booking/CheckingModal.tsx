import { checkScheduleAvailablility, deleteSchedule, putSchedule } from '@apis/schedule'
import { RESERVATION } from '@common/lang'
import { checkPhone } from '@common/regex'
import { SAVED_INFO } from '@common/storage'
import ScheduleRequestInput from '@components/ui/ScheduleRequestInput'
import ScheduleViewInput from '@components/ui/ScheduleViewInput'
import { useLogin } from '@hooks/useLogin'
import { ScheduleCancelRequest, ScheduleRequest } from '@interfaces/schedule'
import { ScheduleModalMode } from '@interfaces/status'
import { ReservationBasicInfo } from '@interfaces/storage'
import {
  Backdrop,
  Button,

  CircularProgress,
  DialogActions,
  DialogContent,

  IconButton,
  Typography
} from '@material-ui/core'
import Dialog from '@material-ui/core/Dialog'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import { makeStyles } from '@material-ui/core/styles'
import CloseIcon from '@material-ui/icons/Close'
import moment from 'moment'
import React, {
  KeyboardEvent,
  useEffect, useState
} from 'react'

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
  },

  backdrop: {
    zIndex: 1500,
    color: '#fff',
  },
})

interface Props {
  tutorId: string
  isOpen: boolean
  setOpen: Function
  mode: ScheduleModalMode
  initSchedule: ScheduleRequest
}

const CheckingModal: React.FC<Props> = ({
  tutorId,
  isOpen,
  setOpen,
  mode,
  initSchedule,
  // setSchedule,
}) => {
  const classes = useStyles()
  const [isLogin] = useLogin()
  const [backdropOpen, setBackdropOpen] = useState<boolean>(false)

  useEffect(() => {
  }, [])

  const handleClickCancelSchedule = (e) => {
    
  }

  const handleClickConfirmSchedule = (e) => {
    
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

  const handleClose = () => {
    setOpen(false)
  }

  const actionButtons = () => {
    switch (mode) {
      case ScheduleModalMode.EDIT:
        return (
          <>
            <Button onClick={handleClose}>닫기</Button>
            <Button onClick={handleClickCancelSchedule}>예약 취소</Button>
          </>
        )
      case ScheduleModalMode.REQUEST:
        return (
          <>
            <Button onClick={handleClickConfirmSchedule}>예약 확정</Button>
            <Button onClick={handleClickCancelSchedule}>예약 취소</Button>
            <Button onClick={handleClose}>닫기</Button>
          </>
        )
    }
  }

  return (
    <>
      <Backdrop className={classes.backdrop} open={backdropOpen}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={isOpen}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          예약 신청 현황
        </DialogTitle>
        <DialogContent dividers>
          <ScheduleViewInput
            schedule={initSchedule}
          />
        </DialogContent>
        <DialogActions>
          {actionButtons()}
        </DialogActions>
      </Dialog>
    </>
  )
}

export default CheckingModal
