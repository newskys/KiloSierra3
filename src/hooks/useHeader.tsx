import { headerState, HeaderState } from '@recoil/header'
import React, { useEffect } from 'react'
import { useRecoilState } from 'recoil'

export const useHeader = (isVisible = true, title = '', hasProfile = false, profileUrl = '', onClickProfile = () => {}) => {
  const [headerStore, setHeaderStore] = useRecoilState<HeaderState>(headerState)

  useEffect(() => {
    setHeaderStore({
      ...headerStore,
      isVisible,
      title,
      hasProfile,
      profileUrl,
      onClickProfile,
    })
    return () => {}
  }, [])
  return []
}
