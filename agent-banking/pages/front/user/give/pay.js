import React, { useCallback, useState } from 'react';
import Router from 'next/router';
import { USER_CONST } from '../../../../src/common/globalConst';
import Loading from '../../../../src/components/user/common/Loading';
import { useSelector } from 'react-redux';
import Util from '../../../../src/common/util';

const Pay = () => {

  const OtherSendInfoMap = {
    mobileNumber: {
      name: 'mobileNumber',
      label: '휴대폰 번호'
    },
    accountNumber: {
      name: 'accountNumber',
      label: '대출 계좌 번호'
    },
    inputCash: {
      name: 'inputCash',
      label: '원리금 납부 금액'
    },
    balance: {
      name: 'balance',
      label: '잔액'
    },
    charge: {
      name: 'charge',
      label: '수수료'
    },
    sum: {
      name: 'sum',
      label: '합계'
    },
    agentName: {
      name: 'agentName',
    },
    agentOTP: {
      name: 'agentOTP',
      label: 'Agent OTP'
    },
    customerPIN: {
      name: 'customerPIN',
      label: '고객 PIN'
    }
  };

  const initialInputCashInfo = {
    mobileNumber: '',
    accountNumber: '',
    inputCash: 0,
    inputCashVND: 0,
    charge: 1000,
    sum: '',
    agentName: '',
    agentOTP: '',
    customerPIN: '',
    balance: '',
    outputCash: 0,
  };

  const { userInfo } = useSelector((state) => state.userLogin);

  const [phase, setPhase] = useState(0);
  const [inputCashInfo, setInputCashInfo] = useState(initialInputCashInfo);
  const [showLoading, setShowLoading] = useState(false);
  const [loadingStatement, setLoadingStatement] = useState('');

  const handleInputCashInfoChange = useCallback((e) => {
    const { name, value } = e.target;

    setInputCashInfo((prev) => ({
      ...prev,
      [name]: (name === OtherSendInfoMap.inputCash.name || name === OtherSendInfoMap.charge.name || name === OtherSendInfoMap.sum.name) ? Util.numberWithoutCommas(value) : value
    }));
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    if (phase === 0) {
      setShowLoading(true);
      setLoadingStatement(<>{inputCashInfo.mobileNumber}님 대출계좌로<br/> 원리금({Util.numberWithCommas(inputCashInfo.inputCash)} VND) 납부 진행 중입니다.</>);
      setTimeout((e) => {
        setLoadingStatement(<>Agent ({userInfo.username})의 계좌에서<br/>{inputCashInfo.mobileNumber} 님 계좌로 입금 처리중입니다.</>);
      }, 3000);
      setTimeout((e) => {
        setShowLoading(false);
        setPhase(1);
      }, 7000);
    }
  }, [inputCashInfo, phase]);

  const handleCancel = useCallback((e) => {
    e.preventDefault();
    Router.push(`${USER_CONST.BASE_ROUTER_PATH}/main`);
    setPhase(0);
    setLoadingStatement('');
    setInputCashInfo(initialInputCashInfo);
  }, []);

  const requireStyle = {
    fontWeight: 'bold',
    color: '#ed1c24'
  };

  return (
    <>
      <div className='inner'>
        <div id='contents' className='noLnb'>
          <div className='subTop'>
            <h3>대출 원리금 납부</h3>
          </div>
          <form>
            {
              phase === 0
              && <div className='joinFormTitle'>
                <p className='explanRequire'>
                  <span className='required' style={requireStyle}>*</span>&nbsp;가 표시된 필수 입력 항목입니다.
                </p>
                <br/><br/>
                <h3>송금 정보</h3>
              </div>
            }

            <br/>
            {phase === 0 ?
              <div className='tableBox'>
                <table className='form'>
                  <colgroup>
                    <col style={{ width: '180px' }}/>
                  </colgroup>
                  <tbody>
                  <tr>
                    <th scope='row'><span className='required' style={requireStyle}>*</span>&nbsp;{OtherSendInfoMap.mobileNumber.label}
                    </th>
                    <td>
                      <input type='text' name={OtherSendInfoMap.mobileNumber.name} value={inputCashInfo.mobileNumber}
                             onChange={handleInputCashInfoChange}
                             className='w30p'
                      />
                    </td>
                  </tr>
                  <tr>
                    <th><span className='required' style={requireStyle}>*</span>&nbsp;{OtherSendInfoMap.accountNumber.label}</th>
                    <td><input type='text' name={OtherSendInfoMap.accountNumber.name} value={inputCashInfo.accountNumber}
                               onChange={handleInputCashInfoChange} className='w30p'/></td>
                  </tr>
                  <tr>
                    <th scope='row'><span className='required' style={requireStyle}>*</span>&nbsp;{OtherSendInfoMap.inputCash.label}</th>
                    <td>
                      <div><input type='text' name={OtherSendInfoMap.inputCash.name} value={Util.numberWithCommas(inputCashInfo.inputCash)}
                                  onChange={handleInputCashInfoChange} className='w50p'/>&nbsp;&nbsp;
                        <span className='explanEx'>숫자만 입력</span></div>
                    </td>
                  </tr>

                  <tr>
                    <th scope='row'><span className='required' style={requireStyle}>*</span>&nbsp;{OtherSendInfoMap.charge.label}</th>
                    <td><input type='text' readOnly={true} name={OtherSendInfoMap.charge.name}
                               value={Util.numberWithCommas(inputCashInfo.charge)}
                               onChange={handleInputCashInfoChange} className='w50p'/>&nbsp;&nbsp;
                      <span className='explanEx'>숫자만 입력</span>
                    </td>
                  </tr>

                  <tr>
                    <th scope='row'><span className='required' style={requireStyle}>*</span>&nbsp;{OtherSendInfoMap.sum.label}</th>
                    <td><input type='text' readOnly={true} name={OtherSendInfoMap.sum.name}
                               value={Util.numberWithCommas(parseInt(inputCashInfo.inputCash) + parseInt(inputCashInfo.charge))}
                               onChange={handleInputCashInfoChange} className='w50p'/>&nbsp;&nbsp;
                      <span className='explanEx'>숫자만 입력</span>
                    </td>
                  </tr>
                  <tr>
                    <th scope='row'>Agent</th>
                    <td><b>{userInfo.username}</b></td>
                  </tr>
                  </tbody>
                </table>
              </div>
              :
              <>
                <div><b>{inputCashInfo.accountNumber}</b>의 계좌에서 Agent ({userInfo.username}) 님의 계좌로
                  <br/> <b>{inputCashInfo.inputCash} 원</b> 입금이 완료 되었습니다.
                </div>
              </>
            }

            {phase === 0 ?
              <>
                <div className='subTop'>
                  <h3>현금을 받고 원리금 납부를 진행합니다.</h3>
                </div>
                <div className='btnArea'>
                  <button onClick={handleSubmit} className='btn_l on'>다음</button>
                  &nbsp;
                  <button onClick={handleCancel} className='btn_l'>현금 입금 취소</button>
                </div>
              </>
              :
              <>
                <div className='btnArea'>
                  <button onClick={handleCancel} className='btn_l'>메인화면으로 돌아가기</button>
                </div>
              </>
            }
          </form>
        </div>
      </div>
      <Loading isLoading={showLoading} label={loadingStatement}/>
    </>
  );
};

export default Pay;
