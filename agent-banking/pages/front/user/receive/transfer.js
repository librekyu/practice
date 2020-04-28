import React, { useCallback, useState } from 'react';
import Router from 'next/router';
import { USER_CONST } from '../../../../src/common/globalConst';
import Loading from '../../../../src/components/user/common/Loading';
import { useSelector } from 'react-redux';
import Util from '../../../../src/common/util';

const Transfer = () => {

  const transferInfoMap = {
    mobileNumber: {
      name: 'mobileNumber',
      label: '휴대폰 번호'
    },
    outAccountNumber: {
      name: 'outAccountNumber',
      label: '출금 계좌 번호'
    },
    inAccountNumber: {
      name: 'inAccountNumber',
      label: '입금 계좌 번호'
    },
    inAccountBank: {
      name: 'outAccountNumber',
      label: '입금 은행'
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

  const initialTransferInfo = {
    mobileNumber: '',
    outAccountNumber: '',
    inputCash: 0,
    charge: 1000,
    inAccountBank: '',
    inAccountNumber: '',
    agentOTP: '',
    customerPIN: '',
  };

  const { userInfo } = useSelector((state) => state.userLogin);

  const [phase, setPhase] = useState(0);
  const [transferInfo, setTransferInfo] = useState(initialTransferInfo);
  const [showLoading, setShowLoading] = useState(false);
  const [loadingStatement, setLoadingStatement] = useState('');
  const [accountList, setAccountList] = useState([]);

  const handleInputCashInfoChange = useCallback((e) => {
    const { name, value } = e.target;

    setTransferInfo((prev) => ({
      ...prev,
      [name]: (name === transferInfoMap.inputCash.name || name === transferInfoMap.charge.name || name === transferInfoMap.sum.name) ? Util.numberWithoutCommas(value) : value
    }));
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    phase === 0 && setPhase(1);
    if (phase === 1) {
      setShowLoading(true);
      setLoadingStatement(<>{transferInfo.mobileNumber}의 계좌에서<br/>{transferInfo.inAccountBank}({transferInfo.inAccountNumber}) 님 계좌로<br/> 이체
        중입니다.</>);
      setTimeout((e) => {
        setShowLoading(false);
        setPhase(2);
      }, 3000);
    }
  }, [transferInfo, phase]);

  const handleCancel = useCallback((e) => {
    e.preventDefault();
    Router.push(`${USER_CONST.BASE_ROUTER_PATH}/main`);
    setPhase(0);
    setLoadingStatement('');
    setTransferInfo(initialTransferInfo);
    setAccountList([]);
  }, []);

  const handleShow = useCallback((e) => {
    e.preventDefault();
    setAccountList([{ accountValue: '1111-1234-4321' }]);
  }, []);

  const renderAccountList = useCallback(() => {
    const options = accountList.map((account, index) => <option key={index} value={account.accountValue}>{account.accountValue}</option>);
    return (
      <select name={transferInfoMap.outAccountNumber.name} value={transferInfo.outAccountNumber} onChange={handleInputCashInfoChange}>
        {options}
      </select>
    );
  }, [accountList]);

  const requireStyle = {
    fontWeight: 'bold',
    color: '#ed1c24'
  };

  return (
    <>
      <div className='inner'>
        <div id='contents' className='noLnb'>
          <div className='subTop'>
            <h3>계좌 이체</h3>
          </div>
          <form>
            {
              phase !== 2
              && <div className='joinFormTitle'>
                <p className='explanRequire'>
                  <span className='required' style={requireStyle}>*</span>&nbsp;가 표시된 필수 입력 항목입니다.
                </p>
                <br/><br/>
                <h3>이체 정보</h3>
              </div>
            }

            <br/>
            {phase === 0 ?
              <>
                <div className='tableBox'>
                  <table className='form'>
                    <colgroup>
                      <col style={{ width: '180px' }}/>
                    </colgroup>
                    <tbody>
                    <tr>
                      <th scope='row'><span className='required' style={requireStyle}>*</span>&nbsp;{transferInfoMap.mobileNumber.label}
                      </th>
                      <td>
                        <input type='text' name={transferInfoMap.mobileNumber.name} value={transferInfo.mobileNumber}
                               onChange={handleInputCashInfoChange}
                               className='w30p'
                        />&nbsp;&nbsp;
                        <button onClick={handleShow} className='btn_l on'>조회</button>
                      </td>
                    </tr>
                    <tr>
                      <th><span className='required' style={requireStyle}>*</span>&nbsp;{transferInfoMap.outAccountNumber.label}</th>
                      <td>{renderAccountList()}</td>
                    </tr>
                    <tr>
                      <th scope='row'><span className='required' style={requireStyle}>*</span>&nbsp;이체 금액</th>
                      <td><input type='text' name={transferInfoMap.inputCash.name} value={Util.numberWithCommas(transferInfo.inputCash)}
                                 onChange={handleInputCashInfoChange} className='w50p'/>&nbsp;&nbsp;
                        <span className='explanEx'>숫자만 입력</span>
                      </td>
                    </tr>

                    <tr>
                      <th scope='row'><span className='required' style={requireStyle}>*</span>&nbsp;{transferInfoMap.charge.label}</th>
                      <td><input type='text' readOnly={true} name={transferInfoMap.charge.name}
                                 value={Util.numberWithCommas(transferInfo.charge)}
                                 onChange={handleInputCashInfoChange} className='w50p'/>&nbsp;&nbsp;
                      </td>
                    </tr>
                    <tr>
                      <th scope='row'><span className='required' style={requireStyle}>*</span>&nbsp;{transferInfoMap.sum.label}</th>
                      <td><input type='text' readOnly={true} name={transferInfoMap.sum.name}
                                 value={Util.numberWithCommas(parseInt(transferInfo.inputCash) + parseInt(transferInfo.charge))}
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
                <br/>
                <div className='tableBox'>
                  <table className='form'>
                    <colgroup>
                      <col style={{ width: '180px' }}/>
                    </colgroup>
                    <tbody>
                    <tr>
                      <th scope='row'><span className='required' style={requireStyle}>*</span>&nbsp;{transferInfoMap.inAccountBank.label}
                      </th>
                      <td>
                        <select onChange={handleInputCashInfoChange} name={transferInfoMap.inAccountBank.name} value={transferInfo.inAccountBank}>
                          <option value={''}>은행 선택</option>
                          <option value={'Vietcom'}>Vietcom Bank</option>
                        </select>
                      </td>
                    </tr>
                    <tr>
                      <th scope='row'><span className='required' style={requireStyle}>*</span>&nbsp;{transferInfoMap.inAccountNumber.label}</th>
                      <td><input type='text' name={transferInfoMap.inAccountNumber.name} value={transferInfo.inAccountNumber}
                                 onChange={handleInputCashInfoChange} className='w50p'/>&nbsp;&nbsp;
                      </td>
                    </tr>

                    <tr>
                      <th scope='row'><span className='required' style={requireStyle}>*</span>&nbsp;{transferInfoMap.inputCash.label}</th>
                      <td><input type='text' readOnly={true} name={transferInfoMap.inputCash.name}
                                 value={Util.numberWithCommas(transferInfo.inputCash)}
                                 onChange={handleInputCashInfoChange} className='w50p'/>&nbsp;&nbsp;
                      </td>
                    </tr>
                    <tr>
                      <th scope='row'>Agent</th>
                      <td><b>{userInfo.username}</b></td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </>
              :
              phase === 1 ?
                <div className='tableBox'>
                  <table className='form'>
                    <colgroup>
                      <col style={{ width: '180px' }}/>
                    </colgroup>
                    <tbody>
                    <tr>
                      <th scope='row'><span className='required' style={requireStyle}>*</span>&nbsp;{transferInfoMap.agentOTP.label}
                      </th>
                      <td>
                        <input type='password' name={transferInfoMap.agentOTP.name} value={transferInfo.agentOTP}
                               onChange={handleInputCashInfoChange}
                               className='w30p'
                        />
                      </td>
                    </tr>
                    <tr>
                      <th><span className='required' style={requireStyle}>*</span>&nbsp;{transferInfoMap.customerPIN.label}</th>
                      <td><input type='password' name={transferInfoMap.customerPIN.name} value={transferInfo.customerPIN}
                                 onChange={handleInputCashInfoChange} className='w30p'/></td>
                    </tr>
                    </tbody>
                  </table>
                </div> :
                <div>
                  {transferInfo.mobileNumber} 님의 계좌에서
                  <br/><b>{transferInfo.inAccountBank} ({transferInfo.inAccountNumber})</b>의 계좌로
                  <br/> <b>{transferInfo.inputCash} 원</b> 이체 완료 되었습니다.
                </div>

            }

            {phase !== 2 ?
              <>
                <div className='btnArea'>
                  <button onClick={handleSubmit} className='btn_l on'>다음</button>
                  &nbsp;
                  <button onClick={handleCancel} className='btn_l'>이체 취소</button>
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

export default Transfer;
