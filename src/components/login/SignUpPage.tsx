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
import { checkEmail, checkPassword, checkUserId } from "@common/regex";

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
  const [userIdInvalidReason, setUserIdInvalidReason] = useState<string>(null);
  const [passwordInvalidReason, setPasswordInvalidReason] = useState<string>(null);
  const [confirmPasswordInvalidReason, setConfirmPasswordInvalidReason] = useState<string>(null);
  const [emailInvalidReason, setEmailInvalidReason] = useState<string>(null);
  const [isSignUpEnabled, setSignUpEnabled] = useState<boolean>(false);

  const setRef = (userId, password, confirmPassword, email, phone) => {
    setUserIdRef(userId);
    setPasswordRef(password);
    setConfirmPasswordRef(confirmPassword);
    setEmailRef(email);
    setPhoneRef(phone);
  };

  const handleChangeUserId = (e: KeyboardEvent<HTMLInputElement>) => {
    const message: string = validateUserId(e.currentTarget.value)
    setUserIdInvalidReason(message)

    validateSignUp()
  }

  const validateUserId = (value: string) => {
    return !checkUserId(value) ? '6 ~ 20자의 소문자, 숫자, 특수문자로 조합해주세요.' : null
  };

  const handleChangePassword = (e: KeyboardEvent<HTMLInputElement>) => {
    const message: string = validatePassword(e.currentTarget.value)
    setPasswordInvalidReason(message)

    const confirmMessage: string = validateConfirmPassword(confirmPasswordRef.value)
    setConfirmPasswordInvalidReason(confirmMessage)

    validateSignUp()
  }

  const validatePassword = (value: string) => {
    return !checkPassword(value) ? '8 ~ 20자의 소문자, 숫자, 특수문자로 조합해주세요.' : null
  }

  const handleChangeConfirmPassword = (e: KeyboardEvent<HTMLInputElement>) => {
    const message: string = validateConfirmPassword(e.currentTarget.value)
    setConfirmPasswordInvalidReason(message)

    validateSignUp()
  }

  const handleChangeEmail = (e: KeyboardEvent<HTMLInputElement>) => {
    const message: string = validateEmail(e.currentTarget.value)
    setEmailInvalidReason(message)

    validateSignUp()
  }

  const validateConfirmPassword = (value: string) => {
    return passwordRef.value !== value ? '비밀번호가 다릅니다.' : null
  };

  const validateEmail = (value: string) => {
    return !checkEmail(value) ? '이메일 형식에 맞지 않습니다.' : null
  };

  const validatePhone = (e: KeyboardEvent<HTMLInputElement>) => {};
  const submitSignUp = (e: KeyboardEvent<HTMLInputElement>) => {};

  const validateSignUp = () => {
    if (!validateUserId(userIdRef.value) && !validatePassword(passwordRef.value) && !validateConfirmPassword(confirmPasswordRef.value) && !validateEmail(emailRef.value)) {
      setSignUpEnabled(true)
    } else {
      setSignUpEnabled(false)
    }
  }

  return (
    <Layout useHeader={false}>
      <Box className={classes.root}>
        <SignUpInput
          setRef={setRef}
          onChangeUserId={handleChangeUserId}
          onChangePassword={handleChangePassword}
          onChangeConfirmPassword={handleChangeConfirmPassword}
          onChangeEmail={handleChangeEmail}
          validatePhone={validatePhone}
          submitSignUp={submitSignUp}
          userIdInvalidReason={userIdInvalidReason}
          passwordInvalidReason={passwordInvalidReason}
          confirmPasswordInvalidReason={confirmPasswordInvalidReason}
          emailInvalidReason={emailInvalidReason}
          isSignUpEnabled={isSignUpEnabled}
        />
      </Box>
    </Layout>
  );
};

export default SignUpPage;
