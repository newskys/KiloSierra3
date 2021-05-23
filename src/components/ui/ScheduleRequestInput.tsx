import { RESERVATION } from '@common/lang'
import { ScheduleRequest } from '@interfaces/schedule'
import { ReservationBasicInfo } from '@interfaces/storage'
import {
  Accordion,
  AccordionDetails,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,

  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from '@material-ui/core'
import MuiAccordionSummary from '@material-ui/core/AccordionSummary'
import { makeStyles } from '@material-ui/core/styles'
import ArrowForwardIosSharpIcon from '@material-ui/icons/ArrowForwardIosSharp'
import ChatIcon from '@material-ui/icons/Chat'
import LocationOnIcon from '@material-ui/icons/LocationOn'
import PhoneIcon from '@material-ui/icons/Phone'
import ScheduleIcon from '@material-ui/icons/Schedule'
import {
  LocalizationProvider, MobileDateTimePicker
} from '@material-ui/pickers'
import MomentAdapter from '@material-ui/pickers/adapter/moment'
import moment from 'moment'
import 'moment/locale/ko'
import React, {
  MouseEvent, useEffect,
  useRef,
  useState
} from 'react'
import NumberFormat from 'react-number-format'

const useStyles = makeStyles({
  root: {
    padding: '16px',
  },

  formControl: {
    marginTop: '16px',
    // minWidth: 120,
  },

  avatar_wrap: {
    color: '#FF1493',
    padding: '16px 0 0 0',
  },

  avatar: {
    margin: '0 auto',
    backgroundColor: '#FF1493',
  },

  login_input: {
    margin: '16px 0 0 0',
  },

  signin: {
    margin: '16px 0 0 0',
    padding: '8px',
  },

  text_link: {
    margin: '8px 0 0 0',
  },

  text_button: {
    textTransform: 'none',
  },
  accordion_summary: {
    backgroundColor: 'rgba(0, 0, 0, .03)',
    // flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIcon.Mui-expanded': {
      transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
      // marginLeft: '8px',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  },
  accordion_details: {
    flexDirection: 'column',
  },
  saveinfo_label: {
    marginRight: '8px',
    '& .MuiFormControlLabel-label': {
      fontSize: '0.9rem',
    },
  },
})

interface Props {
  onClickClose: Function
  setRef: Function
  setPhoneRef: Function
  schedule: ScheduleRequest
  timeInvalidReason: string
  placeInvalidReason: string
  onChangeTime: Function
  onChangeDuration: Function
  onChangePlace: Function
}

const ScheduleRequestInput: React.FC<Props> = ({
  onClickClose,
  setRef,
  setPhoneRef,
  schedule,
  timeInvalidReason,
  placeInvalidReason,
  onChangeTime,
  onChangeDuration,
  onChangePlace,
}) => {
  const classes = useStyles()
  const startTimeRef = useRef<HTMLInputElement>()
  const endTimeRef = useRef<HTMLInputElement>()
  const requestRef = useRef<HTMLInputElement>()
  const placeRef = useRef<HTMLInputElement>()
  const [selectedDate, setDate] = useState(moment(schedule.startDate))
  const [hour, setHour] = useState<number>(2)

  const handleClickInfoSave = (e: MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    // setSaveInfo()
    // setSaveInfoOn(!saveInfoOn)
  }
  // const [inputValue, setInputValue] = useState(moment().format('YYYY-MM-DD'))

  // console.log('inputValue', inputValue)
  // console.log('selectedDate', selectedDate)
  const onDateChange = (date, value) => {
    console.log('date changed', date, value)
    // setDate(date)
    // setInputValue(value)
    // onChangeTime()
  }

  const onAccept = (date) => {
    const newDate: Date = new Date(date)
    // setDate(newDate)
    // console.log('onaccept', moment(date).toString())
    onChangeTime(newDate)
  }

  // const selectLocale = (newLocale: any) => {
  //   moment.locale(newLocale);

  //   setLocale(newLocale);
  // };

  // const handleChangeLevel = (e) => {
  //   setLevel(e.target.value)
  // }

  const handleChangeHour = (e) => {
    setHour(e.target.value)
    onChangeDuration(e.target.value)
  }

  useEffect(() => {
    setRef(
      startTimeRef.current,
      endTimeRef.current,
      requestRef.current,
      placeRef.current,
      // phoneRef.current,
    )
    // console.log(startTimeRef.current, placeRef.current, phoneRef.current)
  }, [])

  // const AccordionSummary = (props) => (
  //   <MuiAccordionSummary
  //     expandIcon={<ArrowForwardIosSharpIcon style={{ fontSize: '0.9rem' }} />}
  //     {...props}
  //     className={classes.accordion_summary}
  //   />
  // )

  // const phoneNumberInput = (props) => {
  //   let inheritProps = {
  //     ...props,
  //   }
  //   delete inheritProps.inputRef

  //   return (
  //     <NumberFormat
  //       {...inheritProps}
  //       format="01#-####-####"
  //       defaultValue={savedInfo?.phone || undefined}
  //       allowEmptyFormatting
  //       value={tempPhone}
  //       mask="_" />
  //   )
  // }

  return (
    <>
      <LocalizationProvider
        dateLibInstance={moment}
        dateAdapter={MomentAdapter}
        locale={'ko'}>
        <MobileDateTimePicker
          // disabled={true}
          disablePast
          minutesStep={30}
          allowKeyboardControl={false}
          showToolbar={true}
          // disableCloseOnSelect={true}
          // openPickerIcon={<></>}
          renderInput={(props) => (
            <TextField
              {...props}
              inputRef={startTimeRef}
              fullWidth
              variant="outlined"
              // helperText={timeInvalidReason || RESERVATION.MINIMUM_TIME_INTERVAL}
              error={!!timeInvalidReason}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="select date and time"
                      disabled={true}
                      edge="end">
                      <ScheduleIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          )}
          toolbarFormat={'MM.DD a'}
          toolbarPlaceholder={''}
          // ToolbarComponent={ToolbarComponent}
          label="수업일"
          value={selectedDate}
          inputFormat={'yyyy.MM.DD a hh:mm'}
          onChange={onDateChange}
          minTime={new Date(0, 0, 0, 9, 0)}
          maxTime={new Date(0, 0, 0, 21, 0)}
          onError={console.log}
          onAccept={onAccept}
          // maxDate={new Date(0, 0, 31)}
        />
      </LocalizationProvider>
      <FormControl
        variant="outlined"
        fullWidth
        className={classes.formControl}
        error={!!timeInvalidReason}>
        <InputLabel id="demo-simple-select-outlined-label">
          수업 시간
        </InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={hour}
          onChange={handleChangeHour}
          label="수업 시간">
          <MenuItem value={0}>1시간</MenuItem>
          <MenuItem value={1}>1시간 30분</MenuItem>
          <MenuItem value={2}>2시간</MenuItem>
          <MenuItem value={3}>2시간 30분</MenuItem>
          <MenuItem value={4}>3시간</MenuItem>
        </Select>
        <FormHelperText>
          {timeInvalidReason || RESERVATION.MINIMUM_TIME_INTERVAL}
        </FormHelperText>
      </FormControl>

      <TextField
        inputRef={placeRef}
        fullWidth
        required
        className={classes.login_input}
        variant="outlined"
        label="희망 장소"
        margin="normal"
        // placeholder="수업을 원하는 장소를 입력해주세요."
        helperText={placeInvalidReason}
        error={!!placeInvalidReason}
        onChange={(e) => onChangePlace(e)}
        inputProps={{
          maxLength: 30,
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton aria-label="input place" disabled={true} edge="end">
                <LocationOnIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <TextField
        inputRef={requestRef}
        fullWidth
        className={classes.login_input}
        variant="outlined"
        label="요청 사항 (선택)"
        margin="normal"
        // placeholder="(선택) 요청 사항을 입력해주세요."
        inputProps={{
          maxLength: 30,
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="input requests"
                disabled={true}
                edge="end">
                <ChatIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <FormControlLabel
        style={{ display: 'block', textAlign: 'right' }}
        control={<Checkbox name="recurring_check" />}
        disabled={true}
        label="같은 요일/시간 반복"
      />
    </>
  )
}

export default ScheduleRequestInput
