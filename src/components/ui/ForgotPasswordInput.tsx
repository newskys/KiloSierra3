import React from 'react';
import {
  Avatar,
  Box,
  Button,
  Grid,
  TextField,
  Typography,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import VpnKeyIcon from '@material-ui/icons/VpnKey'

const useStyles = makeStyles({
  root: {}
})

const ForgotPasswordInput: React.FC = () => {
  const classes = useStyles()

  return (
    <>
      <Typography
        // className={classes.title}
        gutterBottom
        variant="h4"
        component="h2">
        FORGOT PASSWORD
      </Typography>
      <Box>
        <Avatar>
          <VpnKeyIcon />
        </Avatar>
      </Box>
      <TextField
        // inputRef={code}
        fullWidth
        // error={!!invalidReason}
        // className={classes.login_input}
        variant="outlined"
        label="Code *"
        margin="normal"
        // helperText={invalidReason || SIGN_UP.CONFIRM_CODE}
        type="number"
        // onChange={(e) => onChangeCode(e)}
      />

      <Button
        // className={classes.signup}
        fullWidth
        // disabled={!isConfirmEnabled}
        variant="contained"
        color="primary"
        // onClick={(e) => onClickConfirm(e)}
      >
        {'CONFIRM'}
      </Button>

    </>
  );
};

export default ForgotPasswordInput