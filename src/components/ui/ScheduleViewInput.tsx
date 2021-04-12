import { ScheduleRequest } from '@interfaces/schedule'
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import ChatIcon from '@material-ui/icons/Chat'
import LocationOnIcon from '@material-ui/icons/LocationOn'
import PhoneIcon from '@material-ui/icons/Phone'
import ScheduleIcon from '@material-ui/icons/Schedule'
import moment from 'moment'
import 'moment/locale/ko'
import React, { useState } from 'react'

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
  schedule: ScheduleRequest
}

const ScheduleViewInput: React.FC<Props> = ({ schedule }) => {
  const classes = useStyles()

  const durationStr: string = (() => {
    const timeDiff: number = (schedule.endDate - schedule.startDate) / 1000 / 60

    switch (timeDiff) {
      case 60:
        return '1시간'
      case 90:
        return '1시간 30분'
      case 120:
        return '2시간'
      case 180:
        return '2시간 30분'
      case 240:
        return '3시간'
      default:
        return '알 수 없음'
    }
  })()

  return (
    <>
      <TextField
        disabled
        fullWidth
        required
        className={classes.login_input}
        variant="outlined"
        label="수업일"
        margin="normal"
        value={moment(schedule.startDate).format('LLL')}
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
      <TextField
        disabled
        fullWidth
        required
        className={classes.login_input}
        variant="outlined"
        label="시간"
        margin="normal"
        value={durationStr}
        // InputProps={{
        //   endAdornment: (
        //     <InputAdornment position="end">
        //       <IconButton aria-label="input place" disabled={true} edge="end">
        //         <LocationOnIcon />
        //       </IconButton>
        //     </InputAdornment>
        //   ),
        // }}
      />

      <TextField
        disabled
        fullWidth
        className={classes.login_input}
        variant="outlined"
        label="희망 장소"
        margin="normal"
        value={schedule.place}
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
        disabled
        fullWidth
        className={classes.login_input}
        variant="outlined"
        label="요청 사항"
        margin="normal"
        value={schedule.request || '(없음)'}
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
      <FormControl fullWidth variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">Level</InputLabel>
        <Select
          disabled={true}
          labelId="demo-simple-select-outlined-label"
          value={schedule.level}
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
        disabled
        fullWidth
        className={classes.login_input}
        variant="outlined"
        margin="normal"
        value={schedule.phone}
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
    </>
  )
}

export default ScheduleViewInput
