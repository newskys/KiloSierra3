import { Avatar, Box, Button, TextField, Typography } from "@material-ui/core";
import React, { useEffect, useRef } from "react";
import AssignmentIcon from "@material-ui/icons/AssignmentInd";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    display: "flex",
    padding: "16px",
    flexDirection: "column",
    justifyContent: "center",
    height: "100%",
  },

  title: {
    textAlign: "center",
  },

  avatar_wrap: {
    color: "#FF1493",
    // padding: "16px 0 0 0",
  },

  avatar: {
    margin: "0 auto",
    backgroundColor: "#FF1493",
  },

  login_input: {
    margin: "16px 0 0 0",
  },

  signup: {
    margin: "16px 0 0 0",
    padding: "8px",
  },
});

interface Props {
  setRef: Function;
  validatePassword: Function;
  onChangeConfirmPassword: Function;
  validateEmail: Function;
  validatePhone: Function;
  submitSignUp: Function;
  passwordInvalidReason: string;
  confirmPasswordInvalidReason: string;
  emailInvalidReason: string;
}

const SignUpInput: React.FC<Props> = ({
  setRef,
  validatePassword,
  onChangeConfirmPassword,
  validateEmail,
  validatePhone,
  submitSignUp,
  passwordInvalidReason,
  confirmPasswordInvalidReason,
  emailInvalidReason,
}) => {
  const classes = useStyles();
  const userId = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const confirmPassword = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);
  const phone = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setRef(
      userId.current,
      password.current,
      confirmPassword.current,
      email.current,
      phone.current
    );
  }, []);

  return (
    <>
      <Typography
        className={classes.title}
        gutterBottom
        variant="h4"
        component="h2"
      >
        SIGN UP
      </Typography>
      <Box className={classes.avatar_wrap}>
        <Avatar className={classes.avatar}>
          <AssignmentIcon />
        </Avatar>
      </Box>

      <TextField
        inputRef={userId}
        fullWidth
        className={classes.login_input}
        variant="outlined"
        label="ID *"
        margin="normal"
      />
      <TextField
        inputRef={password}
        fullWidth
        error={!!passwordInvalidReason}
        className={classes.login_input}
        variant="outlined"
        label="Password *"
        margin="normal"
        helperText={'8 ~ 20자의 소문자, 숫자, 특수문자로 조합해주세요.'}
        type="password"
        onChange={(e) => validatePassword(e)}
      />
      <TextField
        inputRef={confirmPassword}
        fullWidth
        error={!!confirmPasswordInvalidReason}
        className={classes.login_input}
        variant="outlined"
        label="Confirm Password *"
        margin="normal"
        helperText={confirmPasswordInvalidReason}
        type="password"
        onChange={(e) => onChangeConfirmPassword(e)}
      />
      <TextField
        inputRef={email}
        fullWidth
        error={!!emailInvalidReason}
        className={classes.login_input}
        variant="outlined"
        label="Email *"
        margin="normal"
        helperText={emailInvalidReason}
        type="email"
        onChange={(e) => validateEmail(e)}
      />
      {/* <TextField
        inputRef={phone}
        error
        fullWidth
        className={classes.login_input}
        variant="outlined"
        label="Phone Number *"
        margin="normal"
        helperText="Incorrect entry."
        type="tel"
        onChange={(e) => validatePhone(e)}
      /> */}
      <Button
        className={classes.signup}
        fullWidth
        variant="contained"
        color="primary"
        onClick={(e) => submitSignUp(e)}
      >
        SIGN UP
      </Button>
    </>
  );
};

export default SignUpInput;
