import { SIGN_UP } from '@common/routePath'
import LoginConfig from '@components/ui/LoginConfig'
import React, { MouseEvent } from 'react'
import { useHistory, History } from 'react-router-dom'

const LoginAccountConfigContainer = () => {
  const history: History = useHistory()

  const handleClickForgot = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
  }

  const handleClickSignUp = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    history.push(SIGN_UP)
  }

  return (
    <LoginConfig
      onClickForgot={handleClickForgot}
      onClickSignUp={handleClickSignUp}
    />
  )
}

export default LoginAccountConfigContainer
