import { HeaderType } from '@interfaces/header'
import { headerState, HeaderState } from '@recoil/header'
import React, { useEffect } from 'react'
import { useRecoilState } from 'recoil'

export const useHeader = (isVisible = true, headerType = HeaderType.COMMON, title = '', profileUrl = '', onClickProfile = () => {}) => {
  const [headerStore, setHeaderStore] = useRecoilState<HeaderState>(headerState)

  useEffect(() => {
    setHeaderStore({
      ...headerStore,
      isVisible,
      headerType,
      title,
      profileUrl,
      onClickProfile,
    })
    return () => {}
  }, [])
  return []
}
