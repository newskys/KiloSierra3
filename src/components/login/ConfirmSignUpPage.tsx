import React, { useState, KeyboardEvent } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Layout from '@components/ui/Layout'
import { Box, Button, TextField } from '@material-ui/core'
import ConfirmSignUpInput from '@components/ui/ConfirmSignUpInput'

const useStyles = makeStyles({
  root: {
    display: 'flex',
    padding: '16px',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100%',
  },
})

const ConfirmSignUpPage = () => {
  const classes = useStyles()
  const [invalidReason, setInvalidReason] = useState<string>(null)
  const [isConfirmEnabled, setConfirmEnabled] = useState<boolean>(false)

  const handleChangeCode = (e: KeyboardEvent<HTMLInputElement>) => {}

  const handleClickConfirm = (e: KeyboardEvent<HTMLInputElement>) => {}

  return (
    <Layout useHeader={false}>
      <Box className={classes.root}>
        <ConfirmSignUpInput
          invalidReason={invalidReason}
          isConfirmEnabled={isConfirmEnabled}
          onChangeCode={handleChangeCode}
          onClickConfirm={handleClickConfirm}
        />
      </Box>
    </Layout>
  )
}

export default ConfirmSignUpPage
