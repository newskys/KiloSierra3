import { checkScheduleAvailablility } from '@apis/schedule'
import { RESERVATION } from '@common/lang'
import { checkPhone } from '@common/regex'
import { SAVED_INFO } from '@common/storage'
import ScheduleRequestInput from '@components/ui/ScheduleRequestInput'
import { useHeader } from '@hooks/useHeader'
import { useLogin } from '@hooks/useLogin'
import { HeaderType } from '@interfaces/header'
import { ScheduleRequest } from '@interfaces/schedule'
import { ReservationBasicInfo } from '@interfaces/storage'
import {
  Button,
  Checkbox,
  DialogActions,
  DialogContent,
  FormControlLabel,
  IconButton,
  Typography,
} from '@material-ui/core'
import Dialog from '@material-ui/core/Dialog'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import { makeStyles } from '@material-ui/core/styles'
import CloseIcon from '@material-ui/icons/Close'
import moment from 'moment'
import React, {
  useState,
  KeyboardEvent,
  useEffect,
  useMemo,
  useRef,
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
  const [isLogin, token] = useLogin()
  // const phoneRef = useRef<HTMLInputElement>()
  const [startTimeEl, setStartTimeEl] = useState<HTMLInputElement>(null)
  const [endTimeEl, setEndTimeEl] = useState<HTMLInputElement>(null)
  const [titleEl, setTitleEl] = useState<HTMLInputElement>(null)
  const [placeEl, setPlaceEl] = useState<HTMLInputElement>(null)
  const [levelEl, setLevelEl] = useState<HTMLSelectElement>(null)
  const [phoneEl, setPhoneEl] = useState<HTMLInputElement>(null)
  const [tempLevel, setTempLevel] = useState<number>(null)
  const [tempPhone, setTempPhone] = useState<string>(null)
  const [timeInvalidReason, setTimeInvalidReason] = useState<string>(null)
  const [placeInvalidReason, setPlaceInvalidReason] = useState<string>(null)
  const [phoneInvalidReason, setPhoneInvalidReason] = useState<string>(null)
  const [savedInfo, setSavedInfo] = useState<ReservationBasicInfo>(null)
  const [isSaveInfo, setSaveInfo] = useState<boolean>(null)

  useEffect(() => {
    const savedInfo: ReservationBasicInfo = JSON.parse(
      window.localStorage.getItem(SAVED_INFO)
    )
    console.log('savedinfo', savedInfo)
    if (
      savedInfo &&
      Number.isInteger(savedInfo.level) &&
      validatePhone(savedInfo.phone)
    ) {
      setSavedInfo(savedInfo)
      setSaveInfo(true)
      setTempLevel(savedInfo.level)
      setTempPhone(savedInfo.phone)
    }

  }, [])

  const saveNewInfo = (isSaveInfo: boolean, level: number, phone: string) => {
    const newInfo: ReservationBasicInfo = {
      level,
      phone,
    }

    window.localStorage.setItem(SAVED_INFO, isSaveInfo ? JSON.stringify(newInfo) : null)
  }

  const setRef = (
    startTimeEl,
    endTimeEl,
    titleEl,
    placeEl,
    levelEl,
    phoneEl
  ) => {
    setStartTimeEl(startTimeEl)
    setEndTimeEl(endTimeEl)
    setTitleEl(titleEl)
    setPlaceEl(placeEl)
    setLevelEl(levelEl)
    // setPhoneEl(phoneEl)
  }

  const setPhoneRef = (phoneEl) => {
    setPhoneEl(phoneEl)
    console.log('pe', phoneEl)
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

    if (validateAll()) {
      saveNewInfo(isSaveInfo, tempLevel, tempPhone)
      alert(RESERVATION.OK)
      setSchedule(newSchedule)
      setOpen(false)
    } else {
    }
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

  const handleChangeSaveInfo = (e) => {
    setSaveInfo(!isSaveInfo)
  }

  const handleChangeLevel = (e: React.ChangeEvent) => {
    const value: number = parseInt(e.currentTarget.getAttribute('data-value'))
    setTempLevel(value)
  }

  const handleChangeTime = async (value: string) => {
    let message: string = null

    if (!(await validateTime(value))) {
      message = RESERVATION.TIME_ERROR
    }

    setTimeInvalidReason(message)
  }

  const handleChangeDuration = async (value: string) => {
    let message: string = null

    if (!(await validateTime(value))) {
      message = RESERVATION.TIME_ERROR
    }

    setTimeInvalidReason(message)
  }

  const validateTime = async (value: string) => {
    const startDate: Date = moment('22:00:00', 'hh:mm:ss').toDate()
    const endDate: Date = moment('24:00:00', 'hh:mm:ss').toDate()
    const result = await checkScheduleAvailablility('umlaut', startDate, endDate, token)
    console.log('result', result)
    return true
  }

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

  const validateAll = (): boolean => {
    return validatePlace(placeEl.value) && validatePhone(tempPhone)
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
            setSchedule={setSchedule}
            savedInfo={savedInfo}
            isSaveInfo={isSaveInfo}
            setSaveInfo={handleChangeSaveInfo}
            timeInvalidReason={timeInvalidReason}
            placeInvalidReason={placeInvalidReason}
            phoneInvalidReason={phoneInvalidReason}
            level={tempLevel}
            onChangeLevel={handleChangeLevel}
            onChangeDuration={handleChangeDuration}
            onChangeTime={handleChangeTime}
            onChangePlace={handleChangePlace}
            onChangePhone={handleChangePhone}
            onBlurPhone={handleBlurPhone}
            tempPhone={tempPhone}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickSave}>예약</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default BookingModal
