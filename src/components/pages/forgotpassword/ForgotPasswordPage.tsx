import { HOME, RESET, TUTORS } from '@common/routePath';
import ForgotPasswordInput from '@components/ui/ForgotPasswordInput';
import Layout from '@components/ui/Layout';
import { useHeader } from '@hooks/useHeader';
import { UserRole, UserStatus } from '@interfaces/status';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { userState, UserState } from '@recoil/user';
import { Auth } from 'aws-amplify';
import React, { MouseEvent, useEffect, useState } from 'react';
import { History, useHistory } from 'react-router-dom';
import { useRecoilState } from 'recoil';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    padding: '16px',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
})

const ForgotPasswordPage: React.FC = () => {
  useHeader(false)
  const classes = useStyles()
  const [userIdRef, setUserIdRef] = useState<HTMLInputElement>(null)
  const [user, setUserState] = useRecoilState<UserState>(userState)
  const history: History = useHistory()
  const isNotAllowed: boolean = user.status !== UserStatus.ANONYMOUS

  useEffect(() => {
    if (isNotAllowed) {
      history.push(TUTORS)
    }
  }, [])

  useEffect(() => {
    if (user.status === UserStatus.RESET) {
      history.push(RESET)
    }
  }, [user])

  const setRef = (el: HTMLInputElement) => {
    setUserIdRef(el)
  }

  const handleClickForgot = (e: MouseEvent<HTMLInputElement>) => {
    e.preventDefault()

    forgotPassword(userIdRef.value)
  }

  const forgotPassword = async (userId: string) => {
    try {
      const result = await Auth.forgotPassword(userId)

      const userState: UserState = {
        isInit: true,
        userId,
        email: null,
        status: UserStatus.RESET,
        role: UserRole.UNDEFINED,
      }

      // 성공 처리
      alert('코드가 이메일로 발송되었습니다.')
      setUserState(userState)
    } catch (e) {
      console.error(e)
      if (e.code === "LimitExceededException") {
        
      }
    }
  }

  if (isNotAllowed) {
    return (<></>)
  }

  return (
    <Layout>
      <Box className={classes.root}>
        <ForgotPasswordInput setRef={setRef} onClickForgot={handleClickForgot} />
      </Box>
    </Layout>
  );
};

export default ForgotPasswordPage;