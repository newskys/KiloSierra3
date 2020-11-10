import React from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import {createMuiTheme, ThemeProvider} from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {pink} from "@material-ui/core/colors";
import Header from "@components/common/Header";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    margin: '16px 0 16px 0',
  },
  container: {
    display: 'flex',
    marginTop: '64px',
    alignItems: 'center',
    flexDirection: 'column',
  },
  media: {
    height: 140,
  },
  pink: {
    color: theme.palette.getContrastText(pink[500]),
    backgroundColor: pink[500],
  },
  button: {
    margin: '24px 0px 16px 0px',
    lineHeight: '1.75',
  },
  bottom: {
    marginTop: '64px',
  }
}))

const Main: React.FC = () => {
  const prefersDarkMode = false || useMediaQuery('(prefers-color-scheme: dark)');

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: /*prefersDarkMode ? 'dark' :*/ 'light',
        },
      }),
    [prefersDarkMode],
  );
  const classes = useStyles()

  return (
    <>
      <Header />
      <ThemeProvider theme={theme}>
      test
      </ThemeProvider>
    </>
  )
}

export default Main
