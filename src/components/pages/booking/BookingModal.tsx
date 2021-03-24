import { RESERVATION } from '@common/lang'
import { checkPhone } from '@common/regex'
import { SAVED_INFO } from '@common/storage'
import ScheduleRequestInput from '@components/ui/ScheduleRequestInput'
import { useHeader } from '@hooks/useHeader'
import { HeaderType } from '@interfaces/header'
import { ScheduleRequest } from '@interfaces/schedule'
import { ReservationBasicInfo } from '@interfaces/storage'
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
import React, { useState, KeyboardEvent, useEffect, useMemo, useRef } from 'react'

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
})

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
  // const phoneRef = useRef<HTMLInputElement>()
  const [startTimeEl, setStartTimeEl] = useState<HTMLInputElement>(null)
  const [endTimeEl, setEndTimeEl] = useState<HTMLInputElement>(null)
  const [titleEl, setTitleEl] = useState<HTMLInputElement>(null)
  const [placeEl, setPlaceEl] = useState<HTMLInputElement>(null)
  const [phoneEl, setPhoneEl] = useState<HTMLInputElement>(null)
  const [tempPhone, setTempPhone] = useState<string>(null)
  const [timeInvalidReason, setTimeInvalidReason] = useState<string>(null)
  const [placeInvalidReason, setPlaceInvalidReason] = useState<string>(null)
  const [phoneInvalidReason, setPhoneInvalidReason] = useState<string>(null)

  useEffect(() => {
  }, [])

  const savedInfo = (() => {
    const savedInfo: ReservationBasicInfo = JSON.parse(window.localStorage.getItem(SAVED_INFO))
    console.log('savedinfo', savedInfo)
    if (!savedInfo || !Number.isInteger(savedInfo.level) || !validatePhone(savedInfo.phone)) {
      return null
    }
  
    return savedInfo
  })()

  const setRef = (startTimeEl, endTimeEl, titleEl, placeEl, phoneEl) => {
    setStartTimeEl(startTimeEl)
    setEndTimeEl(endTimeEl)
    setTitleEl(titleEl)
    setPlaceEl(placeEl)
    // setPhoneEl(phoneEl)
  }

  const setPhoneRef = (phoneEl) => {
    setPhoneEl(phoneEl)
    console.log('pe',phoneEl)
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

  const handleChangeTime = (value: string) => {}

  const validateTime = () => {}

  const handleChangePlace = (e: KeyboardEvent<HTMLInputElement>) => {
    const value: string = e.currentTarget.value
    let message: string = null

    if (!validatePlace(value)) {
      message = RESERVATION.PLACE_ERROR_REGEX
    }

    setPlaceInvalidReason(message)
  }

  const validatePlace = (value: string) => {
    return value.trim() !== ''
  }

  const handleChangePhone = (e: KeyboardEvent<HTMLInputElement>) => {
    const value: string = e.currentTarget.value
    if (validatePhone(value)) {
      setTempPhone(value)
      setPhoneInvalidReason(null)

      // phoneEl.blur()
    }
  }

  const handleBlurPhone = (e: KeyboardEvent<HTMLInputElement>) => {
    const value: string = e.currentTarget.value
    let message: string = null

    if (!validatePhone(value)) {
      message = RESERVATION.PHONE_ERROR_REGEX
    }

    setTempPhone(value)
    setPhoneInvalidReason(message)
  }

  const validatePhone = (value: string) => {
    return checkPhone(value)
  }

  return (
    <>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={isOpen}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          수업 예약 신청
        </DialogTitle>
        <DialogContent dividers>
          <ScheduleRequestInput
            initDateTime={initDateTime}
            setRef={setRef}
            setPhoneRef={setPhoneRef}
            // phoneRef={phoneRef}
            onClickClose={handleClose}
            onClickSave={handleClickSave}
            setSchedule={setSchedule}
            savedInfo={savedInfo}
            timeInvalidReason={timeInvalidReason}
            placeInvalidReason={placeInvalidReason}
            phoneInvalidReason={phoneInvalidReason}
            onChangeTime={handleChangeTime}
            onChangePlace={handleChangePlace}
            onChangePhone={handleChangePhone}
            onBlurPhone={handleBlurPhone}
            tempPhone={tempPhone}
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
