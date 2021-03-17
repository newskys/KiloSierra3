import Footer from '@components/ui/Footer'
import { userState, UserState } from '@recoil/user'
import { Auth } from 'aws-amplify'
import React, { ReactNode } from 'react'
import { useRecoilState } from 'recoil'
import { useHistory, History } from 'react-router-dom'
import { LOGIN, MY_SCHEDULE } from '@common/routePath'
import Header from '@components/ui/Header'
import axios from '@apis/axios'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'

export interface HeaderDrawerVO {
  title: string
  component: ReactNode
  onClick: Function
}

interface Props {
}

const HeaderContainer: React.FC<Props> = () => {
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

  const handleClickSchedule = async (e) => {
    console.log('d')
    history.push(MY_SCHEDULE)
  }

  const handleClickLogout = async (e) => {
    try {
      await Auth.signOut()
      location.reload()
    } catch (e) {
      console.error(e)
    }
  }

  const drawerItems: HeaderDrawerVO[] = [
    {
      component: <AccountCircleIcon />,
      title: 'My Account',
      onClick: () => {console.log('a')},
    },
    {
      component: <ExitToAppIcon />,
      title: 'Logout',
      onClick: (e) => handleClickLogout(e),
    },
  ]

  return (
    <Header
      isLogin={isLogin}
      onClickHamburger={handleClickHamburger}
      onClickLogin={handleClickLogin}
      onClickLogout={handleClickLogout}
      onClickSchedule={handleClickSchedule}
      drawerItems={drawerItems}
    />
  )
}

export default HeaderContainer
