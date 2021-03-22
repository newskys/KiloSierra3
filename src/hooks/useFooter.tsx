import { footerState, FooterState } from '@recoil/footer'
import React, { useEffect } from 'react'
import { useRecoilState } from 'recoil'

export const useFooter = (isVisible = false) => {
  const [footerStore, setFooterStore] = useRecoilState<FooterState>(footerState)

  useEffect(() => {
    setFooterStore({
      ...footerStore,
      isVisible,
    })
    return () => {}
  }, [])

  return []
}
