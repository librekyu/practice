import React, { useCallback, useState } from 'react';
import Router from 'next/router';
import { USER_CONST } from '../../../../src/common/globalConst';
import Loading from '../../../../src/components/user/common/Loading';
import { useSelector } from 'react-redux';
import Util from '../../../../src/common/util';

const OutputCashScreen = () => {

  const OutputCashInfoMap = {
    mobileNumber: {
      name: 'mobileNumber',
      label: '휴대폰 번호'
    },
    accountNumber: {
      name: 'accountNumber',
      label: '계좌 번호'
    },
    outputCash: {
      name: 'outputCash',
      label: '출금액'
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

  const initialOutputCashInfo = {
    mobileNumber: '',
    accountNumber: '',
    outputCash: 0,
    charge: 1000,
    sum: '',
    agentName: '',
    agentOTP: '',
    customerPIN: '',
  };

  const { userInfo } = useSelector((state) => state.userLogin);

  const [phase, setPhase] = useState(0);
  const [outputCashInfo, setOutputCashInfo] = useState(initialOutputCashInfo);
  const [showLoading, setShowLoading] = useState(false);
  const [loadingStatement, setLoadingStatement] = useState('');

  const handleOutputCashInfoChange = useCallback((e) => {
    const { name, value } = e.target;

    setOutputCashInfo((prev) => ({
      ...prev,
      [name]: (name === OutputCashInfoMap.outputCash.name || name === OutputCashInfoMap.charge.name || name === OutputCashInfoMap.sum.name) ? Util.numberWithoutCommas(value): value
    }));
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    phase === 0 && setPhase(1);
    if(phase === 1){
      setShowLoading(true);
      setLoadingStatement(<>{outputCashInfo.mobileNumber} 님 계좌에서<br/>Agent ({userInfo.username})의 계좌로 이체중입니다.</>);
      setTimeout((e) => {
        setShowLoading(false);
        setPhase(2);
      }, 3000);
    }
  }, [outputCashInfo, phase]);

  const handleCancel = useCallback((e) => {
    e.preventDefault();
    Router.push(`${USER_CONST.BASE_ROUTER_PATH}/main`);
    setPhase(0);
    setLoadingStatement('');
    setOutputCashInfo(initialOutputCashInfo);
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
            <h3>현금 출금</h3>
          </div>
          <form>
            {
              phase !== 2
              && <div className='joinFormTitle'>
                <p className='explanRequire'>
                  <span className='required' style={requireStyle}>*</span>&nbsp;가 표시된 필수 입력 항목입니다.
                </p>
                <br/><br/>
                <h3>출금 정보</h3>
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
                    <th scope='row'><span className='required' style={requireStyle}>*</span>&nbsp;{OutputCashInfoMap.mobileNumber.label}
                    </th>
                    <td>
                      <input type='text' name={OutputCashInfoMap.mobileNumber.name} value={outputCashInfo.mobileNumber}
                             onChange={handleOutputCashInfoChange}
                             className='w30p'
                      />
                    </td>
                  </tr>
                  <tr>
                    <th><span className='required' style={requireStyle}>*</span>&nbsp;{OutputCashInfoMap.accountNumber.label}</th>
                    <td><input type='text' name={OutputCashInfoMap.accountNumber.name} value={outputCashInfo.accountNumber}
                               onChange={handleOutputCashInfoChange} className='w30p'/></td>
                  </tr>
                  <tr>
                    <th scope='row'><span className='required' style={requireStyle}>*</span>&nbsp;{OutputCashInfoMap.outputCash.label}</th>
                    <td><input type='text' name={OutputCashInfoMap.outputCash.name} value={Util.numberWithCommas(outputCashInfo.outputCash)}
                               onChange={handleOutputCashInfoChange} className='w50p'/>&nbsp;&nbsp;
                      <span className='explanEx'>숫자만 입력</span>
                    </td>
                  </tr>

                  <tr>
                    <th scope='row'><span className='required' style={requireStyle}>*</span>&nbsp;{OutputCashInfoMap.charge.label}</th>
                    <td><input type='text' readOnly={true} name={OutputCashInfoMap.charge.name} value={Util.numberWithCommas(outputCashInfo.charge)}
                               onChange={handleOutputCashInfoChange} className='w50p'/>&nbsp;&nbsp;
                      <span className='explanEx'>숫자만 입력</span>
                    </td>
                  </tr>

                  <tr>
                    <th scope='row'><span className='required' style={requireStyle}>*</span>&nbsp;{OutputCashInfoMap.sum.label}</th>
                    <td><input type='text' readOnly={true} name={OutputCashInfoMap.sum.name} value={Util.numberWithCommas(parseInt(outputCashInfo.outputCash) + parseInt(outputCashInfo.charge))}
                               onChange={handleOutputCashInfoChange} className='w50p'/>&nbsp;&nbsp;
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
                      <th scope='row'><span className='required' style={requireStyle}>*</span>&nbsp;{OutputCashInfoMap.agentOTP.label}
                      </th>
                      <td>
                        <input type='password' name={OutputCashInfoMap.agentOTP.name} value={outputCashInfo.agentOTP}
                               onChange={handleOutputCashInfoChange}
                               className='w30p'
                        />
                      </td>
                    </tr>
                    <tr>
                      <th><span className='required' style={requireStyle}>*</span>&nbsp;{OutputCashInfoMap.customerPIN.label}</th>
                      <td><input type='password' name={OutputCashInfoMap.customerPIN.name} value={outputCashInfo.customerPIN}
                                 onChange={handleOutputCashInfoChange} className='w30p'/></td>
                    </tr>
                    </tbody>
                  </table>
                </div> :
                <div>{outputCashInfo.accountNumber}님의 계좌에서 <b>Agent ({userInfo.username})</b>의 계좌로
                  <br/> <b>{outputCashInfo.outputCash} 원</b> 출금이 완료 되었습니다.
                </div>

            }

            {phase !== 2 ?
              <>
                <div className='btnArea'>
                  <button onClick={handleSubmit} className='btn_l on'>다음</button>
                  &nbsp;
                  <button onClick={handleCancel} className='btn_l'>현금 출금 취소</button>
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

export default OutputCashScreen;
