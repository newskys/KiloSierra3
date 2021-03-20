import React, { useRef, useEffect, useState } from 'react'
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

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
})

interface Props {
  onClick: Function
  setRef: Function
}

const ScheduleRequestInput: React.FC<Props> = ({ onClick, setRef }) => {
  const classes = useStyles()
  const startTimeRef = useRef<HTMLInputElement>()
  const endTimeRef = useRef<HTMLInputElement>()
  const titleRef = useRef<HTMLInputElement>()
  const placeRef = useRef<HTMLInputElement>()
  const phoneRef = useRef<HTMLInputElement>()
  const [level, setLevel] = useState<number>(0);

  const handleChange = (event) => {
    setLevel(event.target.value);
  }

  useEffect(() => {
    setRef(startTimeRef.current, endTimeRef.current, titleRef.current, placeRef.current, phoneRef.current)
    startTimeRef.current.min = '09:00'
    startTimeRef.current.max = '22:00'
    startTimeRef.current.step = '1800'
  }, [])

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={6}>
        <TextField
          inputRef={startTimeRef}
          fullWidth
          className={classes.login_input}
          variant="outlined"
          // label="StartDate"
          margin="normal"
          type="time"
        />
        </Grid>
        <Grid item xs={6}>
        <TextField
          inputRef={endTimeRef}
          fullWidth
          className={classes.login_input}
          variant="outlined"
          // label="EndDate"
          margin="normal"
          type="time"
        />
        </Grid>
      </Grid>
      <TextField
        inputRef={titleRef}
        fullWidth
        className={classes.login_input}
        variant="outlined"
        label="Request"
        margin="normal"
      />
      <TextField
        inputRef={placeRef}
        fullWidth
        className={classes.login_input}
        variant="outlined"
        label="Place"
        margin="normal"
      />
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">Level</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={level}
          onChange={handleChange}
          label="Level"
        >
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
      />
      <Button
        onClick={(e) => onClick(e)}
        className={classes.signin}
        fullWidth
        variant="contained"
        color="primary">
        SIGN IN
      </Button>
    </>
  )
}

export default ScheduleRequestInput
