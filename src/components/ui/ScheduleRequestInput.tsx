import { ScheduleRequest } from '@interfaces/schedule'
import {
  Accordion,
  AccordionDetails,
  Checkbox,
  FormControl,
  FormControlLabel,
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
import { DateTimePicker, LocalizationProvider } from '@material-ui/pickers'
import MomentAdapter from '@material-ui/pickers/adapter/moment'
import moment from 'moment'
import 'moment/locale/ko'
import React, { useEffect, useRef, useState, MouseEvent, ChangeEvent } from 'react'

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
    }
  }
})

interface Props {
  onClickClose: Function
  onClickSave: Function
  setRef: Function
  initDateTime: Date
  schedule?: ScheduleRequest
  setSchedule: Function
  hasSavedInfo: boolean
}

const ScheduleRequestInput: React.FC<Props> = ({
  onClickSave,
  onClickClose,
  setRef,
  initDateTime,
  schedule,
  setSchedule,
  hasSavedInfo,
}) => {
  const [expanded, setExpanded] = React.useState<boolean>(!hasSavedInfo)
  const [saveInfoOn, setSaveInfoOn] = React.useState<boolean>(hasSavedInfo)
  const [selectedDate, setDate] = useState(moment(initDateTime))

  const handleChangeAccordion = (e, isExpanded) => {
    // e.preventDefault()
    // e.stopPropagation()
    setExpanded(isExpanded)
  }

  const handleClickInfoSave = (e: MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setSaveInfoOn(!saveInfoOn)
  }
  // const [inputValue, setInputValue] = useState(moment().format('YYYY-MM-DD'))

  // console.log('inputValue', inputValue)
  // console.log('selectedDate', selectedDate)
  const onDateChange = (date, value) => {
    // console.log('date changed', date, value)
    // setDate(date)
    // setInputValue(value)
  }

  const onAccept = (date) => {
    setDate(date)
    // console.log('onaccept', moment(date).toString())
  }

  // const selectLocale = (newLocale: any) => {
  //   moment.locale(newLocale);

  //   setLocale(newLocale);
  // };

  const classes = useStyles()
  const startTimeRef = useRef<HTMLInputElement>()
  const endTimeRef = useRef<HTMLInputElement>()
  const titleRef = useRef<HTMLInputElement>()
  const placeRef = useRef<HTMLInputElement>()
  const phoneRef = useRef<HTMLInputElement>()
  const [hour, setHour] = useState<number>(2)
  const [level, setLevel] = useState<number>(1)

  const handleChangeLevel = (e) => {
    setLevel(e.target.value)
  }

  const handleChangeHour = (e) => {
    setHour(e.target.value)
  }

  useEffect(() => {
    setRef(
      startTimeRef.current,
      endTimeRef.current,
      titleRef.current,
      placeRef.current,
      phoneRef.current
    )
  }, [])

  const AccordionSummary = (props) => (
    <MuiAccordionSummary
      expandIcon={<ArrowForwardIosSharpIcon style={{ fontSize: '0.9rem' }} />}
      {...props}
      className={classes.accordion_summary}
    />
  )

  return (
    <>
      {/* <Grid container spacing={2}>
        <Grid item xs={6}> */}
      <LocalizationProvider
        dateLibInstance={moment}
        dateAdapter={MomentAdapter}
        locale={'ko'}>
        <DateTimePicker
          disabled={true}
          disablePast
          minutesStep={30}
          allowKeyboardControl={false}
          showToolbar={true}
          // disableCloseOnSelect={true}
          // openPickerIcon={<></>}
          renderInput={(props) => (
            <TextField
              {...props}
              fullWidth
              variant="outlined"
              helperText={''}
            />
          )}
          toolbarFormat={'MM.DD a'}
          // ToolbarComponent={<></>}
          label="Request Time"
          value={selectedDate}
          inputFormat={'yyyy.MM.DD a hh:mm'}
          onChange={onDateChange}
          // minTime={new Date(0, 0, 0, 9, 0)}
          // maxTime={new Date(0, 0, 0, 21, 0)}
          onError={console.log}
          onAccept={onAccept}
          // maxDate={new Date(0, 0, 31)}
        />
      </LocalizationProvider>
      <FormControl variant="outlined" fullWidth className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">Duration</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={hour}
          onChange={handleChangeHour}
          label="duration">
          <MenuItem value={0}>1 Hour</MenuItem>
          <MenuItem value={1}>1 Hour 30 Minutes</MenuItem>
          <MenuItem value={2}>2 Hours</MenuItem>
          <MenuItem value={3}>2 Hours 30 Minutes</MenuItem>
          <MenuItem value={4}>3 Hours</MenuItem>
        </Select>
      </FormControl>
      <TextField
        inputRef={placeRef}
        fullWidth
        className={classes.login_input}
        variant="outlined"
        label="Place"
        margin="normal"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="input location"
                disabled={true}
                edge="end">
                <LocationOnIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <TextField
        inputRef={titleRef}
        fullWidth
        className={classes.login_input}
        variant="outlined"
        label="Requests"
        margin="normal"
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
      <Accordion
        style={{ marginTop: '16px' }}
        expanded={expanded}
        onChange={(e, isExpanded) => handleChangeAccordion(e, isExpanded)}>
        <AccordionSummary>
          기본 정보
          <FormControlLabel
            onClick={handleClickInfoSave}
            className={classes.saveinfo_label}
            control={
              <Checkbox
                checked={saveInfoOn}
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
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={level}
              onChange={handleChangeLevel}
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
            inputRef={phoneRef}
            fullWidth
            className={classes.login_input}
            variant="outlined"
            label="Phone Number"
            margin="normal"
            type="tel"
            InputProps={{
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
