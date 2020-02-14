import React, { useEffect } from 'react';

const Layout = (props) => {
  const { routerInfo } = props;

  useEffect(() => {
    console.log('mount');
    return () => {
      console.log('unmount');
    };
  }, []);
  return (
    <div>Layout
      {props.children}
    </div>
  );
};

export default Layout;
