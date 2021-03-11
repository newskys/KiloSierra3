import Footer from '@components/ui/Footer'
import { userState, UserState } from '@recoil/user'
import { Auth } from 'aws-amplify'
import React from 'react'
import { useRecoilState } from 'recoil'
import { useHistory, History } from 'react-router-dom'
import { LOGIN } from '@common/routePath'
import Header from '@components/ui/Header'
import axios from '@apis/axios'

const HeaderContainer = () => {
  const [user, setUserState] = useRecoilState<UserState>(userState)
  const history: History = useHistory()
  const isLogin: boolean = !!user.userId
  console.log(user)

  const handleClickHamburger = async (e) => {
    
    axios.get(`/hasuser2?userId=test`, {
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
