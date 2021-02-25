import Layout from "@components/ui/Layout";
import {
  Avatar,
  Box,
  Button,
  Card,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useState, KeyboardEvent } from "react";
import AssignmentIcon from "@material-ui/icons/AssignmentInd";
import { makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import SignUpInput from "@components/ui/SignUpInput";
import { checkEmail, checkPassword } from "@common/regex";

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

const SignUpPage = () => {
  const classes = useStyles();
  const matches = useMediaQuery("(min-width:600px)");

  const [userIdRef, setUserIdRef] = useState<HTMLInputElement>(null);
  const [passwordRef, setPasswordRef] = useState<HTMLInputElement>(null);
  const [
    confirmPasswordRef,
    setConfirmPasswordRef,
  ] = useState<HTMLInputElement>(null);
  const [emailRef, setEmailRef] = useState<HTMLInputElement>(null);
  const [phoneRef, setPhoneRef] = useState<HTMLInputElement>(null);
  const [passwordInvalidReason, setPasswordInvalidReason] = useState<string>(null);
  const [confirmPasswordInvalidReason, setConfirmPasswordInvalidReason] = useState<string>(null);
  const [emailInvalidReason, setEmailInvalidReason] = useState<string>(null);

  const setRef = (userId, password, confirmPassword, email, phone) => {
    setUserIdRef(userId);
    setPasswordRef(password);
    setConfirmPasswordRef(confirmPassword);
    setEmailRef(email);
    setPhoneRef(phone);
  };

  const validatePassword = (e: KeyboardEvent<HTMLInputElement>) => {
    const value: string = e.currentTarget.value
    if (!checkPassword(value)) {
      setPasswordInvalidReason('8 ~ 20자의 소문자, 숫자, 특수문자로 조합해주세요.')
    } else {
      setPasswordInvalidReason(null)
    }

    validateConfirmPassword(confirmPasswordRef.value)
  };

  const handleChangeConfirmPassword = (e: KeyboardEvent<HTMLInputElement>) => {
    validateConfirmPassword(e.currentTarget.value)
  }

  const validateConfirmPassword = (value: string) => {
    if (passwordRef.value !== value) {
      setConfirmPasswordInvalidReason('비밀번호가 다릅니다.')
    } else {
      setConfirmPasswordInvalidReason(null)
    }
  };
  const validateEmail = (e: KeyboardEvent<HTMLInputElement>) => {
    const value: string = e.currentTarget.value
    if (!checkEmail(value)) {
      setEmailInvalidReason('이메일 형식에 맞지 않습니다.')
    } else {
      setEmailInvalidReason(null)
    }
  };
  const validatePhone = (e: KeyboardEvent<HTMLInputElement>) => {};
  const submitSignUp = (e: KeyboardEvent<HTMLInputElement>) => {};

  return (
    <Layout useHeader={false}>
      <Box className={classes.root}>
        <SignUpInput
          setRef={setRef}
          validatePassword={validatePassword}
          onChangeConfirmPassword={handleChangeConfirmPassword}
          validateEmail={validateEmail}
          validatePhone={validatePhone}
          submitSignUp={submitSignUp}
          passwordInvalidReason={passwordInvalidReason}
          confirmPasswordInvalidReason={confirmPasswordInvalidReason}
          emailInvalidReason={emailInvalidReason}
        />
      </Box>
    </Layout>
  );
};

export default SignUpPage;
