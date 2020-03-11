import React, { useCallback } from 'react';
import Router from 'next/router';

const Home = (props) => {
  const welcomeString = 'Hello';

  const onClickButton = useCallback((e) => {
    e.preventDefault();
    Router.push('/router/inputRouter');
  }, []);

  return (
    <>
      {welcomeString}
      <br/>
      <button onClick={onClickButton}>To inputRouter</button>
    </>
  );
};

Home.getInitialProps = (props) => {
  console.log('*****************  Home get initial props  ***************************');
};

export default Home;
