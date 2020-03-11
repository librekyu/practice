import React, { useCallback } from 'react';
import Router from 'next/router';
import Layout from '../src/components/layout';

const Home = (props) => {
  const welcomeString = 'Hello';

  const onClickButton = useCallback((e) => {
    e.preventDefault();
    Router.push('/router/inputRouter');
  }, []);

  return (
    <Layout>
      {welcomeString}
      <br/>
      <button onClick={onClickButton}>To inputRouter</button>
    </Layout>
  );
};

Home.getInitialProps = (props) => {
  console.log('*****************  Home get initial props  ***************************');
};

export default Home;
