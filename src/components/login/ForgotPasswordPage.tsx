import React, { useEffect, useState, MouseEvent } from 'react';
import { Auth } from 'aws-amplify';
import Layout from '@components/ui/Layout';
import { Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import ForgotPasswordInput from '@components/ui/ForgotPasswordInput';
import { useRecoilState } from 'recoil';
import { userState, UserState } from '@recoil/user';
import { UserStatus } from '@interfaces/status';
import { useHistory, History } from 'react-router-dom'
import { CONFIRM_CODE } from '@common/routePath';

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
  const classes = useStyles()
  const [userIdRef, setUserIdRef] = useState<HTMLInputElement>(null)
  const [user, setUserState] = useRecoilState<UserState>(userState)
  const history: History = useHistory()

  useEffect(() => {
    if (user.status === UserStatus.TEMP) {
      console.log('test')
      history.push(CONFIRM_CODE)
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
      await Auth.forgotPassword(userId)

      const userState: UserState = {
        isInit: true,
        userId,
        email: null,
        emailVerified: null,
        phone: null,
        phoneVerified: null,
        status: UserStatus.TEMP,
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

  return (
    <Layout useHeader={false}>
      <Box className={classes.root}>
        <ForgotPasswordInput setRef={setRef} onClickForgot={handleClickForgot} />
      </Box>
    </Layout>
  );
};

export default ForgotPasswordPage;