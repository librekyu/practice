import React from 'react';
import Home from '../index';

const OutputRouter = (props) => {
  const welcomeString = 'output Router';

  return (
    <>
      {welcomeString}
    </>
  );
};

OutputRouter.getInitialProps = (props) => {
  console.log('*****************  OutputRouter get initial props  ***************************');
};

export default OutputRouter;
