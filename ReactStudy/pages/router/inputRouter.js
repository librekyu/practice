import React, { useCallback } from 'react';
import Router from 'next/router';

const InputRouter = (props) => {
  const welcomeString = 'input Router';

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
