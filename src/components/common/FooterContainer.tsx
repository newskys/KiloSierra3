import Footer from '@components/ui/Footer'
import { userState, UserState } from '@recoil/user'
import { Auth } from 'aws-amplify'
import React from 'react'
import { useRecoilState } from 'recoil'
import { useHistory, History } from 'react-router-dom'
import { LOGIN } from '@common/routePath'

const FooterContainer = () => {
  const [user, setUserState] = useRecoilState<UserState>(userState)
  const history: History = useHistory()
  const isLogin: boolean = !!user.userId

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
    <Footer
      isLogin={isLogin}
      onClickLogin={handleClickLogin}
      onClickLogout={handleClickLogout}
    />
  )
}

export default FooterContainer
