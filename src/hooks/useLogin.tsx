import { userState, UserState } from '@recoil/user'
import { useEffect } from 'react'
import { useRecoilState } from 'recoil'

export const useLogin = (): [boolean, string] => {
  const [userStore, setUserStore] = useRecoilState<UserState>(userState)

  useEffect(() => {
    return () => {}
  }, [])
  return [!!userStore.token, userStore.token]
}
