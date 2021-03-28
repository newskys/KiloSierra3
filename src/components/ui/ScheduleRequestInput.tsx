import { ScheduleRequest } from '@interfaces/schedule'
import {
  Accordion,
  AccordionDetails,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core'
import MuiAccordionSummary from '@material-ui/core/AccordionSummary'
import { makeStyles } from '@material-ui/core/styles'
import ArrowForwardIosSharpIcon from '@material-ui/icons/ArrowForwardIosSharp'
import ChatIcon from '@material-ui/icons/Chat'
import LocationOnIcon from '@material-ui/icons/LocationOn'
import PhoneIcon from '@material-ui/icons/Phone'
import {
  MobileDateTimePicker,
  LocalizationProvider,
} from '@material-ui/pickers'
import MomentAdapter from '@material-ui/pickers/adapter/moment'
import moment from 'moment'
import 'moment/locale/ko'
import React, {
  useEffect,
  useRef,
  useState,
  MouseEvent,
  ChangeEvent,
  KeyboardEvent,
  FormEvent,
  RefObject,
} from 'react'
import NumberFormat from 'react-number-format'
import ScheduleIcon from '@material-ui/icons/Schedule'
import { ReservationBasicInfo } from '@interfaces/storage'
import { RESERVATION } from '@common/lang'

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
  // phoneRef: RefObject<HTMLInputElement>
  onClickClose: Function
  setRef: Function
  setPhoneRef: Function
  initDateTime: Date
  schedule?: ScheduleRequest
  setSchedule: Function
  savedInfo: ReservationBasicInfo
  isSaveInfo: boolean
  setSaveInfo: Function
  timeInvalidReason: string
  placeInvalidReason: string
  phoneInvalidReason: string
  level: number
  onChangeTime: Function
  onChangeDuration: Function
  onChangePlace: Function
  onChangeLevel: Function
  onChangePhone: Function
  onBlurPhone: Function
  tempPhone: string
}

const ScheduleRequestInput: React.FC<Props> = ({
  // phoneRef,
  onClickClose,
  setRef,
  setPhoneRef,
  initDateTime,
  schedule,
  setSchedule,
  savedInfo,
  isSaveInfo,
  setSaveInfo,
  timeInvalidReason,
  placeInvalidReason,
  phoneInvalidReason,
  onChangeTime,
  onChangeDuration,
  onChangePlace,
  onChangeLevel,
  level,
  onChangePhone,
  onBlurPhone,
  tempPhone,
}) => {
  const classes = useStyles()
  const startTimeRef = useRef<HTMLInputElement>()
  const endTimeRef = useRef<HTMLInputElement>()
  const requestRef = useRef<HTMLInputElement>()
  const placeRef = useRef<HTMLInputElement>()
  const levelRef = useRef<HTMLSelectElement>()
  const phoneRef = useRef<HTMLInputElement>()
  // const isExpanded: boolean = !isSaveInfo
  // const [saveInfoOn, setSaveInfoOn] = React.useState<boolean>(isSaveInfo)
  const [selectedDate, setDate] = useState(moment(initDateTime))
  // const [phoneNumberTimeout, setPhoneNumberTimeout] = useState<number>(null)
  const [hour, setHour] = useState<number>(2)
  // const [level, setLevel] = useState<number>(savedInfo?.level ?? null)

  const handleChangeAccordion = (e, isExpanded) => {
    // e.preventDefault()
    // e.stopPropagation()
    // setExpanded(!isExpanded)
  }

  const handleClickInfoSave = (e: MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setSaveInfo()
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
      levelRef.current,
      // phoneRef.current,
    )
    // console.log(startTimeRef.current, placeRef.current, phoneRef.current)
  }, [])

  const AccordionSummary = (props) => (
    <MuiAccordionSummary
      expandIcon={<ArrowForwardIosSharpIcon style={{ fontSize: '0.9rem' }} />}
      {...props}
      className={classes.accordion_summary}
    />
  )

  const phoneNumberInput = (props) => (
    <NumberFormat
      {...props}
      format="01#-####-####"
      // inputRef={phoneRef}
      // ref={phoneRef}
      defaultValue={savedInfo?.phone || undefined}
      allowEmptyFormatting
      value={tempPhone}
      mask="_"
    />
  )

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
      variant="outlined" fullWidth className={classes.formControl} error={!!timeInvalidReason}>
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
        <FormHelperText>{timeInvalidReason || RESERVATION.MINIMUM_TIME_INTERVAL}</FormHelperText>
      </FormControl>

      <TextField
        inputRef={placeRef}
        fullWidth
        className={classes.login_input}
        variant="outlined"
        label="희망 장소"
        margin="normal"
        // placeholder="수업을 원하는 장소를 입력해주세요."
        helperText={placeInvalidReason}
        error={!!placeInvalidReason}
        onChange={(e) => onChangePlace(e)}
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
        label="요청 사항"
        margin="normal"
        // placeholder="(선택) 요청 사항을 입력해주세요."
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
        label="이번 달 같은 요일/시간 반복"
      />
      <Accordion
        style={{ marginTop: '16px' }}
        defaultExpanded={!isSaveInfo}
        // onChange={(e, isExpanded) => handleChangeAccordion(e, isExpanded)}
      >
        <AccordionSummary>
          기본 정보
          <FormControlLabel
            onClick={handleClickInfoSave}
            className={classes.saveinfo_label}
            control={
              <Checkbox
                checked={isSaveInfo}
                // onChange={(e) => {
                //   console.log(e)
                // }}
                name="saveInfoCheck"
                color="primary"
              />
            }
            label="다음에도 사용"
          />
        </AccordionSummary>
        <AccordionDetails className={classes.accordion_details}>
          <FormControl
            fullWidth
            variant="outlined"
            className={classes.formControl}>
            <InputLabel id="demo-simple-select-outlined-label">
              Level
            </InputLabel>
            <Select
              // labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              
              value={level}
              onChange={(e) => onChangeLevel(e)}
              label="Level">
              <MenuItem value={0}>Test</MenuItem>
              <MenuItem value={1}>A1 (Beginner)</MenuItem>
              <MenuItem value={2}>A2</MenuItem>
              <MenuItem value={3}>B1</MenuItem>
              <MenuItem value={4}>B2</MenuItem>
              <MenuItem value={5}>C1</MenuItem>
              <MenuItem value={6}>C2 (Native)</MenuItem>
            </Select>
          </FormControl>
          <TextField
            fullWidth
            className={classes.login_input}
            variant="outlined"
            inputRef={phoneRef}
            // label="연락처"
            margin="normal"
            helperText={phoneInvalidReason}
            // value={tempPhone}
            error={!!phoneInvalidReason}
            onChange={(e) => onChangePhone(e)}
            onBlur={(e) => onBlurPhone(e)}
            InputProps={{
              inputComponent: phoneNumberInput,
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="input location"
                    disabled={true}
                    edge="end">
                    <PhoneIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </AccordionDetails>
      </Accordion>
    </>
  )
}

export default ScheduleRequestInput
