import { checkScheduleAvailablility, putSchedule } from '@apis/schedule'
import { RESERVATION } from '@common/lang'
import { checkPhone } from '@common/regex'
import { SAVED_INFO } from '@common/storage'
import ScheduleRequestInput from '@components/ui/ScheduleRequestInput'
import { useHeader } from '@hooks/useHeader'
import { useLogin } from '@hooks/useLogin'
import { HeaderType } from '@interfaces/header'
import { Schedule, ScheduleRequest } from '@interfaces/schedule'
import { ReservationBasicInfo } from '@interfaces/storage'
import {
  Backdrop,
  Button,
  Checkbox,
  CircularProgress,
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

  backdrop: {
    zIndex: 1500,
    color: '#fff',
  },
})

interface Props {
  tutorId: string
  isOpen: boolean
  setOpen: Function
  isEdit?: boolean
  // setSchedule: Function
  initSchedule: ScheduleRequest
}

const BookingModal: React.FC<Props> = ({
  tutorId,
  isOpen,
  setOpen,
  isEdit = false,
  initSchedule,
  // setSchedule,
}) => {
  const classes = useStyles()
  const [isLogin] = useLogin()
  // const phoneRef = useRef<HTMLInputElement>()
  const [startTimeEl, setStartTimeEl] = useState<HTMLInputElement>(null)
  const [endTimeEl, setEndTimeEl] = useState<HTMLInputElement>(null)
  const [requestEl, setRequestEl] = useState<HTMLInputElement>(null)
  const [placeEl, setPlaceEl] = useState<HTMLInputElement>(null)
  const [levelEl, setLevelEl] = useState<HTMLSelectElement>(null)
  const [phoneEl, setPhoneEl] = useState<HTMLInputElement>(null)
  const [tempLevel, setTempLevel] = useState<number>(0)
  const [tempPhone, setTempPhone] = useState<string>(null)
  const [timeInvalidReason, setTimeInvalidReason] = useState<string>(null)
  const [placeInvalidReason, setPlaceInvalidReason] = useState<string>(null)
  const [phoneInvalidReason, setPhoneInvalidReason] = useState<string>(null)
  const [savedInfo, setSavedInfo] = useState<ReservationBasicInfo>(null)
  const [isSaveInfo, setSaveInfo] = useState<boolean>(null)
  const [tempTime, setTempTime] = useState<Date>(null)
  const [tempDuration, setTempDuration] = useState<number>(null)
  const [backdropOpen, setBackdropOpen] = useState<boolean>(false)

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

  useEffect(() => {
    if (!isOpen) {
      return
    }

    initialDataCheck(initSchedule)
  }, [isOpen])

  const initialDataCheck = async (schedule: ScheduleRequest) => {
    setTempTime(new Date(schedule.startDate))
    setTempLevel(schedule.level ?? 0)
    setTempPhone(schedule.phone ?? null)

    let duration: number = null

    if (isEdit) {
      duration = getIndexFromTimeGap(schedule.startDate, schedule.endDate)
      console.log(duration)
    } else {
      duration = getDurationTimeFromIndex(2)
    }
    setTempDuration(duration)

    if (!isEdit && !(await validateTime(new Date(schedule.startDate), duration))) {
      setTimeInvalidReason(RESERVATION.TIME_ERROR)
    }
  }

  const saveNewInfo = (isSaveInfo: boolean, level: number, phone: string) => {
    const newInfo: ReservationBasicInfo = {
      level,
      phone,
    }

    window.localStorage.setItem(
      SAVED_INFO,
      isSaveInfo ? JSON.stringify(newInfo) : null
    )
  }

  const setRef = (
    startTimeEl,
    endTimeEl,
    requestEl,
    placeEl,
    levelEl,
    phoneEl
  ) => {
    setStartTimeEl(startTimeEl)
    setEndTimeEl(endTimeEl)
    setRequestEl(requestEl)
    setPlaceEl(placeEl)
    setLevelEl(levelEl)
    // setPhoneEl(phoneEl)
  }

  const setPhoneRef = (phoneEl) => {
    setPhoneEl(phoneEl)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleClickSave = async (e) => {
    setBackdropOpen(true)
    const newSchedule: ScheduleRequest = {
      startDate: null,
      endDate: null,
      level: null,
      place: null,
      phone: null,
      request: null,
    }

    if (await validateAll()) {
      saveNewInfo(isSaveInfo, tempLevel, tempPhone)
      // setSchedule(newSchedule)
      setOpen(false)

      const scheduleRequest: ScheduleRequest = {
        startDate: tempTime.getTime(),
        endDate: moment(tempTime).add(tempDuration, 'minute').valueOf(),
        request: requestEl.value,
        place: placeEl.value,
        level: tempLevel,
        phone: tempPhone,
      }
      console.log('scheduleRequest', scheduleRequest)
      await putSchedule(tutorId, scheduleRequest)
      alert(RESERVATION.OK)
    }

    setBackdropOpen(false)
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
    const date: Date = new Date(value)

    console.log('value', value)
    setTempTime(date)

    if (!(await validateTime(date, tempDuration))) {
      message = RESERVATION.TIME_ERROR
    }

    setTimeInvalidReason(message)
  }

  const getDurationTimeFromIndex = (index: number): number => {
    return 60 + (index * 30)
  }

  const getIndexFromTimeGap = (startDate: number, endDate: number): number => {
    const duration: number = (endDate - startDate) / 1000 / 60
    
    return (duration - 60) / 30
  }

  const handleChangeDuration = async (value: number) => {
    let message: string = null
    const duration: number = getDurationTimeFromIndex(value)
    setTempDuration(duration)
    console.log('t', tempTime, duration)

    if (!(await validateTime(tempTime, duration))) {
      message = RESERVATION.TIME_ERROR
    }

    setTimeInvalidReason(message)
  }

  const validateTime = async (time: Date, duration: number) => {
    setBackdropOpen(true)
    let result: boolean = null
    
    try {
      const startDate: Date = time
      const endDate: Date = moment(time).add(duration, 'minute').toDate()
      console.log(startDate, endDate)
      result = await checkScheduleAvailablility(
        'umlaut',
        startDate,
        endDate,
      )
    } catch (e) {
      console.error(e)
      result = false
    }

    setBackdropOpen(false)
    return result
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

  const validateAll = async (): Promise<boolean> => {
    let isValid: boolean = true
    
    if (!validatePlace(placeEl.value)) {
      setPlaceInvalidReason(RESERVATION.PLACE_ERROR_REGEX)
      isValid = false
    }

    if (!validatePhone(tempPhone)) {
      setPhoneInvalidReason(RESERVATION.PHONE_ERROR_REGEX)
      isValid = false
    }

    if (!(await validateTime(tempTime, tempDuration))) {
      setTimeInvalidReason(RESERVATION.TIME_ERROR)
      isValid = false
    }

    return isValid
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
          수업 예약 신청
        </DialogTitle>
        <DialogContent dividers>
          <ScheduleRequestInput
            schedule={initSchedule}
            setRef={setRef}
            setPhoneRef={setPhoneRef}
            // phoneRef={phoneRef}
            onClickClose={handleClose}
            // setSchedule={setSchedule}
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
