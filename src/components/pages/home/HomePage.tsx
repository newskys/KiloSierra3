import { getTutors } from '@apis/tutor'
import Layout from '@components/ui/Layout'
import { useHeader } from '@hooks/useHeader'
import { makeStyles } from '@material-ui/core/styles'
import React, { useEffect } from 'react'

const useStyles = makeStyles({
})

const HomePage: React.FC = () => {
  useHeader(true)
  const classes = useStyles()

  useEffect(() => {
    getTutorsProfile()
  }, [])

  const getTutorsProfile = async () => {
    await getTutors()
  }

  return (
    <Layout>
    </Layout>
  )
}

export default HomePage
