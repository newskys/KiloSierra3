import Footer from '@components/ui/Footer'
import { userState, UserState } from '@recoil/user'
import { Auth } from 'aws-amplify'
import React from 'react'
import { useRecoilState } from 'recoil'
import { useHistory, History } from 'react-router-dom'
import { LOGIN } from '@common/routePath'
import Header from '@components/ui/Header'
import Axios from 'axios'

const HeaderContainer = () => {
  const [user, setUserState] = useRecoilState<UserState>(userState)
  const history: History = useHistory()
  const isLogin: boolean = !!user.userId

  const handleClickHamburger = async (e) => {
    
    Axios.get(`https://hu5mcclx4l.execute-api.ap-northeast-2.amazonaws.com/prod/hasuser2?userId=test`, {
      // withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': user.token
      }
    })
  }

  const handleClickLogin = async (e) => {
    history.push(LOGIN)
  }

  const handleClickLogout = async (e) => {
    try {
      await Auth.signOut()
      location.reload()
    } catch (e) {
      console.error(e)
    }
    console.log('test')
  }

  return (
    <Header
      isLogin={isLogin}
      onClickHamburger={handleClickHamburger}
      onClickLogin={handleClickLogin}
      onClickLogout={handleClickLogout}
    />
  )
}

export default HeaderContainer
