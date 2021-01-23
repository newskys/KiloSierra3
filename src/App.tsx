import React from 'react';
import Layout from '@components/ui/Layout';
import '@scss/common/reset.scss';

const App = ({}) => {
  return (
      <>
        <Layout />
      </>
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