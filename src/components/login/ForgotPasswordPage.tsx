import React from 'react';
import Layout from '@components/ui/Layout';
import { Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import ForgotPasswordInput from '@components/ui/ForgotPasswordInput';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    padding: '16px',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100%',
  },
})

const ForgotPasswordPage: React.FC = () => {
  const classes = useStyles()

  return (
    <Layout useHeader={false}>
      <Box className={classes.root}>
        <ForgotPasswordInput />
      </Box>
    </Layout>
  );
};

export default ForgotPasswordPage;