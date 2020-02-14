import React, { useCallback, useEffect } from 'react';
import Router from 'next/router';

const InputRouter = (props) => {
  const welcomeString = 'input Router';

  useEffect(() => {
    console.log('input Router mount');

    return () => {
      console.log('input Router unmount');
    };
  }, []);

  const onClickButton = useCallback((e) => {
    e.preventDefault();
    Router.push('/router/outputRouter');
  }, []);

  return (
    <>
      {welcomeString}
      <br/>
      <button onClick={onClickButton}>To outputRouter</button>
    </>
  );
};

export default InputRouter;
