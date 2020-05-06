import React, { useCallback, useState } from 'react';
import Router from 'next/router';
import { USER_CONST } from '../../../../src/common/globalConst';
import Loading from '../../../../src/components/user/common/Loading';
import { useSelector } from 'react-redux';
import Util from '../../../../src/common/util';

const InputCashScreen = () => {

  const InputCashInfoMap = {
    mobileNumber: {
      name: 'mobileNumber',
      label: '휴대폰 번호'
    },
    accountNumber: {
      name: 'accountNumber',
      label: '계좌 번호'
    },
    inputCash: {
      name: 'inputCash',
      label: '입금액'
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
    charge: 1000,
    sum: '',
    agentName: '',
    agentOTP: '',
    customerPIN: '',
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
      [name]: (name === InputCashInfoMap.inputCash.name || name === InputCashInfoMap.charge.name || name === InputCashInfoMap.sum.name) ? Util.numberWithoutCommas(value): value
    }));
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    phase === 0 && setPhase(1);
    if(phase === 1){
      setShowLoading(true);
      setLoadingStatement(<>Agent ({userInfo.username})의 계좌에서<br/>{inputCashInfo.mobileNumber} 님 계좌로 이체중입니다.</>);
      setTimeout((e) => {
        setShowLoading(false);
        setPhase(2);
      }, 3000);
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
            <h3>현금 입금</h3>
          </div>
          <form>
            {
              phase !== 2
              && <div className='joinFormTitle'>
                <p className='explanRequire'>
                  <span className='required' style={requireStyle}>*</span>&nbsp;가 표시된 필수 입력 항목입니다.
                </p>
                <br/><br/>
                <h3>입금 정보</h3>
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
                    <th scope='row'><span className='required' style={requireStyle}>*</span>&nbsp;{InputCashInfoMap.mobileNumber.label}
                    </th>
                    <td>
                      <input type='text' name={InputCashInfoMap.mobileNumber.name} value={inputCashInfo.mobileNumber}
                             onChange={handleInputCashInfoChange}
                             className='w30p'
                      />
                    </td>
                  </tr>
                  <tr>
                    <th><span className='required' style={requireStyle}>*</span>&nbsp;{InputCashInfoMap.accountNumber.label}</th>
                    <td><input type='text' name={InputCashInfoMap.accountNumber.name} value={inputCashInfo.accountNumber}
                               onChange={handleInputCashInfoChange} className='w30p'/></td>
                  </tr>
                  <tr>
                    <th scope='row'><span className='required' style={requireStyle}>*</span>&nbsp;{InputCashInfoMap.inputCash.label}</th>
                    <td><input type='text' name={InputCashInfoMap.inputCash.name} value={Util.numberWithCommas(inputCashInfo.inputCash)}
                               onChange={handleInputCashInfoChange} className='w50p'/>&nbsp;&nbsp;
                      <span className='explanEx'>숫자만 입력</span>
                    </td>
                  </tr>

                  <tr>
                    <th scope='row'><span className='required' style={requireStyle}>*</span>&nbsp;{InputCashInfoMap.charge.label}</th>
                    <td><input type='text' readOnly={true} name={InputCashInfoMap.charge.name} value={Util.numberWithCommas(inputCashInfo.charge)}
                               onChange={handleInputCashInfoChange} className='w50p'/>&nbsp;&nbsp;
                      <span className='explanEx'>숫자만 입력</span>
                    </td>
                  </tr>

                  <tr>
                    <th scope='row'><span className='required' style={requireStyle}>*</span>&nbsp;{InputCashInfoMap.sum.label}</th>
                    <td><input type='text' readOnly={true} name={InputCashInfoMap.sum.name} value={Util.numberWithCommas(parseInt(inputCashInfo.inputCash) + parseInt(inputCashInfo.charge))}
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
              phase === 1 ?
                <div className='tableBox'>
                  <table className='form'>
                    <colgroup>
                      <col style={{ width: '180px' }}/>
                    </colgroup>
                    <tbody>
                    <tr>
                      <th scope='row'><span className='required' style={requireStyle}>*</span>&nbsp;{InputCashInfoMap.agentOTP.label}
                      </th>
                      <td>
                        <input type='password' name={InputCashInfoMap.agentOTP.name} value={inputCashInfo.agentOTP}
                               onChange={handleInputCashInfoChange}
                               className='w30p'
                        />
                      </td>
                    </tr>
                    <tr>
                      <th><span className='required' style={requireStyle}>*</span>&nbsp;{InputCashInfoMap.customerPIN.label}</th>
                      <td><input type='password' name={InputCashInfoMap.customerPIN.name} value={inputCashInfo.customerPIN}
                                 onChange={handleInputCashInfoChange} className='w30p'/></td>
                    </tr>
                    </tbody>
                  </table>
                </div> :
                <div>Agent ({userInfo.username}) 님의 계좌에서 <b>{inputCashInfo.accountNumber}</b>의 계좌로
                  <br/> <b>{inputCashInfo.inputCash} 원</b> 입금이 완료 되었습니다.
                </div>

            }

            {phase !== 2 ?
              <>
                <div className='btnArea'>
                  <button onClick={handleSubmit} className='btn_l on'>다음</button>
                  &nbsp;
                  <button onClick={handleCancel} className='btn_l'>현금 입금 취소</button>
                </div>
              </>
              :
              <div className='btnArea'>
                <button onClick={handleCancel} className='btn_l'>메인화면으로 돌아가기</button>
              </div>
            }
          </form>
        </div>
      </div>
      <Loading isLoading={showLoading} label={loadingStatement}/>
    </>
  );
};

export default InputCashScreen;
