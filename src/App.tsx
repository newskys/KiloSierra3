import Auth from '@components/common/Auth'
import Router from '@components/common/Router'
import CssBaseline from '@material-ui/core/CssBaseline'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import { RecoilExternalStatePortal } from '@recoil/RecoilExternalStatePortal'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { RecoilRoot } from 'recoil'

// https://material-ui.com/customization/default-theme/#default-theme
const theme = createMuiTheme({
  overrides: {
    MuiCssBaseline: {
      '@global': {
        html: {
          height: '100%',
        },
        body: {
          height: '100%',
        },
        '#root': {
          height: '100%',
        },
      },
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
  },
})

declare global {
  interface Window {
    __token: string
  }
}

const App: React.FC = () => (
  <RecoilRoot>
    <RecoilExternalStatePortal />
    <Auth>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Router />
        </ThemeProvider>
      </BrowserRouter>
    </Auth>
  </RecoilRoot>
)

export default App
