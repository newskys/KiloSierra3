import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter } from 'react-router-dom';
import Router from '@components/Router';

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
});

const App = ({}) => {
  return (
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Router />
        </ThemeProvider>
      </BrowserRouter>
    )
}

export default App

// react 컴포넌트 만들 때 방법 2가지
// java class랑 비슷
//  1. 클래스로 만든다 (class A extends React.Component)
//     - lifecycle
//     - state
//  2. 함수로 만든다 (const A = () => {})
//     - lifecycle X
//     - state X : 변수여서 상태값을 가질 수 없다
//     - BUT, 최근 hook 등 여러 가지 기능들 추가, 클래스보다 함수로 만드는 추세 : https://ko.reactjs.org/docs/hooks-intro.html