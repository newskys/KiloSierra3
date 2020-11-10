import * as React from 'react'

import RootRouter from './route/RootRouter'
import BaseLayout from "@components/common/BaseLayout";
import '@scss/common/global.scss'

const App = ({}) => {
  return (
      <BaseLayout>
        <RootRouter />
      </BaseLayout>
    )
}

export default App
