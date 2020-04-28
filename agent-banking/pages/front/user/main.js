import React, { useCallback, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import Router from 'next/router';
import window from 'global';
import { initialState, USER_INFO_ACTIONS } from '../../../src/reducers/user/userInfo/userInfo';
import CONST, { USER_CONST } from '../../../src/common/globalConst';

/**
 * 홈 화면.
 * */
const Main = (props) => {
  const { isLoggedIn } = useSelector((state) => state.userLogin);
  const dispatch = useDispatch();
  // var favoritesAirQuailty = [];
  /**
   * 정책
   - 로그인 상태 : 서비스 미가입 계정에게만 출력
   > 미가입 계정 컨펌 : 회원가입 시 보관되어있는 휴대폰 번호로 예보문자가 발송됩니다. 동의하십니까?
   > 확인 얼럿: 예보문자신청이 완료되었습니다. 서비스를 중지하길 원하시면 [마이페이지]에서 중지할 수 있습니다.

   - 로그아웃 상태 컨펌 : 로그인이 필요한 서비스입니다. 지금 회원가입하시겠습니까?
   > 확인 : 회원 가입페이지로 이동, 취소 : 컨펌창 닫기
   * */

  /** 미세먼지 예보문자 신청 */
  const subscriptionForecastSms = useCallback(() => {
    // TODO: 서비스 가입 여부 체크 필요...
    if (isLoggedIn) {
      const answer = confirm('회원가입 시 보관되어있는 휴대폰 번호로 예보문자가 발송됩니다. 동의하십니까?');
      if (answer) {
        alert('예보문자신청이 완료되었습니다. 서비스를 중지하길 원하시면 [마이페이지]에서 중지할 수 있습니다.');
      }
    } else {
      const answer = confirm('로그인이 필요한 서비스입니다. 지금 회원가입하시겠습니까?');
      if (answer) {
        Router.push(`${USER_CONST.BASE_ROUTER_PATH}/account/join`);
      }
    }
  }, [isLoggedIn]);

  function getClassName(type) {
    var result = '';
    switch (type) {
      case '좋음':
        result = 'state colorPlus1';
        return result;
      case '보통':
        result = 'state colorZero';
        return result;
      case '나쁨':
        result = 'state colorMinus1';
        return result;
      case '매우나쁨':
        result = 'state colorMinus2';
        return result;
      default :
        result = 'default';
        return result;
    }
  }

  const deleteFavorite = useCallback((e, placeId) => {
    e.preventDefault();
    const answer = confirm('나의 공기질 측정소에서 삭제하시겠습니까?');
    if (answer) {
      dispatch({
        type: USER_INFO_ACTIONS.USER_INFO_MYFAVORITES_AIR_QUAILTY_LIST_DELETE_REQUEST,
        data: {
          id: placeId,
        },
      });
    }
  }, []);

  useEffect(() => {
    dispatch({
      type: USER_INFO_ACTIONS.USER_INFO_MYFAVORITES_AIR_QUAILTY_LIST_REQUEST
    });
  }, [isLoggedIn]);

  return (
    <>
      <div className="mainSection section1">
        <div className="inner">
          <div className="text1">&nbsp;&nbsp;<b></b></div>
          <div className="text2">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;여신</div>
          <Link href={`${USER_CONST.BASE_ROUTER_PATH}/receive/inputCash`}><a className="btn">입금</a></Link>
          <Link href={`${USER_CONST.BASE_ROUTER_PATH}/receive/outputCash`}><a className="btn">출금</a></Link>
          <Link href={`${USER_CONST.BASE_ROUTER_PATH}/receive/transfer`}><a className="btn">계좌이체</a></Link>
          <div className="text2">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;수신</div>
          <Link href={`${USER_CONST.BASE_ROUTER_PATH}'/give/pay'`}><a className="btn">대출원리금 납부</a></Link>
          <div className="text2">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;카드</div>
          <Link href={`${USER_CONST.BASE_ROUTER_PATH}/card/new`}><a className="btn">카드신청/신규</a></Link>
          <Link href={`${USER_CONST.BASE_ROUTER_PATH}/card/pay`}><a className="btn">신용카드 결제</a></Link>
          <div className="text2">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;기타</div>
          <Link href={`${USER_CONST.BASE_ROUTER_PATH}/etc/pay`}><a className="btn">공과금 납부</a></Link>
        </div>
      </div>

    </>
  );
};

Main.getInitialProps = async (context) => {

};
export default Main;
