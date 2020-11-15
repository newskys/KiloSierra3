import React from 'react'
import RootRouter from './route/RootRouter'
import BaseLayout from "@components/common/BaseLayout";

const App = ({}) => {
  return (
      <BaseLayout>
        <RootRouter />
      </BaseLayout>
    )
}

export default App
