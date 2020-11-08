import { matchPath } from 'react-router'
// import { CORPORATE_LOGIN } from './routePath'

const isMatched = (path: string, exact: boolean, location: string) => {
  return (
      matchPath(location, {
          path: path,
          exact,
          strict: false,
      }) !== null
  )
}

// export const isGeneralLogin = (location: string = window.location.pathname) => isMatched(GENERAL_LOGIN, true, location)
