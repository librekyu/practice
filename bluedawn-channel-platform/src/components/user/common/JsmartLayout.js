import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import FooterComponent from './FooterComponent';
import HeaderComponent from './HeaderComponent';
import Auth from '../../../common/user/Auth';
import { USER_LOG_IN_ACTION } from '../../../reducers/user/userInfo/login';
import { USER_CONST } from '../../../common/globalConst';
import Router, { useRouter } from 'next/router';
import ModalComponent from '../../common/jsmartModal';

/**
 * 최상단과 두번째 상단의 메뉴바 및 메뉴 depth 표시와 하부 컴포넌트를 표시하고 footer를 보여준다.
 * 최상단, 두번째 상단 메뉴바, footer는 모든 화면에서 고정이다.
 * */
const JsmartLayout = ({ children, pageInfo, routerInfo }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isOverlay, setIsOverlay] = useState(false);
  const { isLoggedIn } = useSelector((state) => state.userLogin);
  const { isLoading, modalParam } = useSelector((state) => state.globalReducer);
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    const instance = Auth.getInstance();
    const isUserAutorized = instance.validAccessToken();

    if (!isLoggedIn && isUserAutorized) {
      const now = new Date().getTime();
      if (now < isUserAutorized.exp * 1000) {
        /** 만료일이 안지남 > 로그인 처리  */
        dispatch({
          type: USER_LOG_IN_ACTION.USER_CONFIRM_AUTH_REQUEST
        });
        // dispatch({
        //   type: USER_LOG_IN_ACTION.USER_CONFIRM_AUTH_SUCCESS
        // });
      } else if (now > isUserAutorized.exp * 1000) {
        /** 만료일이 지남 > 리프레쉬 토큰 처리  */
        dispatch({
          type: USER_LOG_IN_ACTION.USER_AUTH_FETCH_REQUEST,
        });
      }
    }

  }, []);

  /** 실제 로딩 화면 설정 */
  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => {
        setShowLoading(true);
      }, 500);
      return () => clearTimeout(timer);
    }
    setShowLoading(false);
  }, [isLoading]);

  useEffect(() => {

    //   Router.onRouteChangeStart = (url) => {
    //     console.log('onRouteChangeStart');
    //     const urlArray = url.split('?');
    //
    //     url = urlArray[1] && urlArray[0] + '?' + escape(urlArray[1]);
    //     console.log(url);
    //
    //     return false;
    //   };
    //
    // Router.beforePopState((e) => {
    //   console.log('beforePopState');
    //   return false;
    // });

  }, [router.pathname]);

  return (
    <>
      <div id="wrap" className={pageInfo && (pageInfo === USER_CONST.BASE_ROUTER_PATH)
      || (pageInfo === `${USER_CONST.BASE_ROUTER_PATH}/`)
      || (pageInfo === `${USER_CONST.BASE_ROUTER_PATH}/main`) ? 'main' : null}>
        {/** 상단 메뉴 */}
        {pageInfo.includes('/map/')
          ? <>{children}</>
          : <>
            <HeaderComponent pageInfo={pageInfo} isLoggedIn={isLoggedIn} isOverlay={isOverlay}
                             setIsOverlay={setIsOverlay} />
            <div id='container'>
              {/*<UpperPicComponent pageInfo={pageInfo} />*/}

              {/** 하단부 컴포넌트 */}
              {/** 주 화면의 좌측 메뉴정보가 필요 없어도 되는 경우 */}
              {pageInfo
              && ((pageInfo === USER_CONST.BASE_ROUTER_PATH) || (pageInfo === `${USER_CONST.BASE_ROUTER_PATH}/`) || (pageInfo === `${USER_CONST.BASE_ROUTER_PATH}/main`)             // 메인 화면
                || pageInfo.includes('login')   // 로그인 관련 화면
                || pageInfo.includes('join')    // 회원가입 관련 화면
                || pageInfo.includes('find')    // 아이디/비밀번호 찾기 화면
              )
                ? <>{children}</>
                : <div className="inner">

                  {/*<ContentLnb />*/}
                  {children}
                </div>}
            </div>
            {/** Footer */}
            <FooterComponent />
          </>}
      </div>
      {/*<Loading isLoading={showLoading}/>*/}
      <ModalComponent param={modalParam} />
    </>
  );
};

JsmartLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default JsmartLayout;
