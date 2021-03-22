import Layout from '@components/ui/Layout'
import { useHeader } from '@hooks/useHeader'
import { makeStyles } from '@material-ui/core/styles'
import React from 'react'

const useStyles = makeStyles({
})

const HomePage: React.FC = () => {
  useHeader(true)
  const classes = useStyles()

  return (
    <Layout>
    </Layout>
  )
}

export default HomePage
