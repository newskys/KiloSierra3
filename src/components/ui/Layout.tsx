import React from 'react';
import '@scss/components/ui/Layout.scss';

const Layout: React.FC = () => {
  return (
    <>
    {/* skip navigation
     <div>
      <a href="#main">본문 바로가기</a>
    </div> */}
    <div className='wrap'>
      <header className='header'>header</header>
      <main id='main' className='main'>
        main
      </main>
      <footer className='footer'>
        footer
      </footer>
    </div>
    </>
  );
};

export default Layout;