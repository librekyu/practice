import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ADMIN_CONST, USER_CONST } from '../src/common/globalConst';

function Error({ routerInfo }) {
  const [path, setPath] = useState(ADMIN_CONST.BASE_ROUTER_PATH);

  useEffect(() => {
    routerInfo.asPath.includes(ADMIN_CONST.BASE_ROUTER_PATH)
      ? setPath(ADMIN_CONST.BASE_ROUTER_PATH)
      : setPath(USER_CONST.BASE_ROUTER_PATH);
  }, [routerInfo]);

  return (
    <>
      <h2>오류 안내</h2>
      <div className="contentBox">
        <div className="titleBar bordered">
          <h4>요청하신 페이지를 찾을 수 없습니다.</h4>
          <div>
            <Link href={`${path}/main`}>
              <a className="btn_inline black">홈으로</a>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
