import React, { useCallback, useState } from 'react';
import Router from 'next/router';
import { USER_CONST } from '../../../../src/common/globalConst';
import Loading from '../../../../src/components/user/common/Loading';
import { useSelector } from 'react-redux';
import Util from '../../../../src/common/util';

const CardPay = () => {

  const cardPayInfoMap = {
    cardNumber: {
      name: 'cardNumber',
      label: '카드 번호'
    },
    defaultMoney: {
      name: 'defaultMoney',
      label: '미납 금액'
    },
    claimMoney: {
      name: 'claimMoney',
      label: '청구 금액'
    },
    payMoney: {
      name: 'payMoney',
      label: '결제 금액'
    },
    payMethod: {
      name: 'payMethod',
      label: '결제 방법'
    },
    accountNumber: {
      name: 'accountNumber',
      label: '계좌 번호'
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

  const initialCardPayInfo = {
    cardNumber: '',
    defaultMoney: 0,
    claimMoney: 0,
    payMoney: 0,
    payMethod: '',
    accountNumber: '',
    agentName: '',
    agentOTP: '',
    customerPIN: '',
  };

  const { userInfo } = useSelector((state) => state.userLogin);

  const [phase, setPhase] = useState(0);
  const [cardPayInfo, setTransferInfo] = useState(initialCardPayInfo);
  const [showLoading, setShowLoading] = useState(false);
  const [loadingStatement, setLoadingStatement] = useState('');
  const [accountList, setAccountList] = useState(['1111-1234-5432']);
  const [showAccount, setShowAccount] = useState(false);

  const handleInputCashInfoChange = useCallback((e) => {
    const { name, value } = e.target;

    setTransferInfo((prev) => ({
      ...prev,
      [name]: (name === cardPayInfoMap.defaultMoney.name || name === cardPayInfoMap.claimMoney.name || name === cardPayInfoMap.payMoney.name) ? Util.numberWithoutCommas(value) : value
    }));
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    phase === 0 && setPhase(1);
    if (phase === 1) {
      setShowLoading(true);
      setLoadingStatement(<>신용카드 결제 중입니다</>);
      setTimeout((e) => {
        setShowLoading(false);
        setPhase(2);
      }, 3000);
    }
  }, [cardPayInfo, phase]);

  const handleCancel = useCallback((e) => {
    e.preventDefault();
    Router.push(`${USER_CONST.BASE_ROUTER_PATH}/main`);
    setPhase(0);
    setLoadingStatement('');
    setTransferInfo(initialCardPayInfo);
    setShowAccount(false);
  }, []);

  const handleShow = useCallback((e) => {
    e.preventDefault();
    setShowAccount(true);
  }, []);

  const renderAccountList = useCallback(() => {
    const options = accountList.map((account, index) => <option key={index} value={account}>{account}</option>);
    return (
      <select name={cardPayInfoMap.accountNumber.name} value={cardPayInfo.accountNumber} onChange={handleInputCashInfoChange}>
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
            <h3>카드: 신용카드 결제</h3>
          </div>
          <form>
            {
              phase !== 2
              && <div className='joinFormTitle'>
                <p className='explanRequire'>
                  <span className='required' style={requireStyle}>*</span>&nbsp;가 표시된 필수 입력 항목입니다.
                </p>
                <br/><br/>
                <h3>결제 정보</h3>
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
                      <th scope='row'><span className='required' style={requireStyle}>*</span>&nbsp;{cardPayInfoMap.cardNumber.label}
                      </th>
                      <td>
                        <input type='text' name={cardPayInfoMap.cardNumber.name} value={cardPayInfo.cardNumber}
                               onChange={handleInputCashInfoChange}
                               className='w30p'
                        />&nbsp;&nbsp;
                        <button onClick={handleShow} className='btn_l on'>조회</button>
                      </td>
                    </tr>
                    {showAccount && <>
                      <tr>
                        <th scope='row'><span className='required' style={requireStyle}>*</span>&nbsp;{cardPayInfoMap.defaultMoney.label}
                        </th>
                        <td><input type='text' name={cardPayInfoMap.defaultMoney.name}
                                   value={Util.numberWithCommas(cardPayInfo.defaultMoney)}
                                   onChange={handleInputCashInfoChange} className='w50p'/>&nbsp;&nbsp;
                          <span className='explanEx'>VND</span>
                        </td>
                      </tr>

                      <tr>
                        <th scope='row'><span className='required' style={requireStyle}>*</span>&nbsp;{cardPayInfoMap.claimMoney.label}</th>
                        <td><input type='text' name={cardPayInfoMap.claimMoney.name}
                                   value={Util.numberWithCommas(cardPayInfo.claimMoney)}
                                   onChange={handleInputCashInfoChange} className='w50p'/>&nbsp;&nbsp;
                        </td>
                      </tr>
                      <tr>
                        <th scope='row'><span className='required' style={requireStyle}>*</span>&nbsp;{cardPayInfoMap.payMoney.label}</th>
                        <td><input type='text' readOnly={true} name={cardPayInfoMap.payMoney.name}
                                   value={Util.numberWithCommas(parseInt(cardPayInfo.defaultMoney) + parseInt(cardPayInfo.claimMoney))}
                                   onChange={handleInputCashInfoChange} className='w50p'/>&nbsp;&nbsp;
                          <span className='explanEx'>VND</span>
                        </td>
                      </tr>
                      <tr>
                        <th scope='row'><span className='required' style={requireStyle}>*</span>&nbsp;{cardPayInfoMap.payMethod.label}</th>
                        <td><select name={cardPayInfoMap.payMethod.name}
                                    value={cardPayInfo.payMethod}
                                    onChange={handleInputCashInfoChange} className='w50p'>
                          <option value={''}>방법 선택</option>
                          <option value={'account'}>계좌</option>
                          <option value={'cash'}>현금</option>
                        </select>
                        </td>
                      </tr>
                      {cardPayInfo.payMethod === 'account' &&
                      <tr>
                        <th scope='row'><span className='required' style={requireStyle}>*</span>&nbsp;{cardPayInfoMap.accountNumber.label}</th>
                        <td>{renderAccountList()}</td>
                      </tr>
                      }
                      <tr>
                        <th scope='row'>Agent</th>
                        <td><b>{userInfo.username}</b></td>
                      </tr>
                    </>}

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
                      <th scope='row'><span className='required' style={requireStyle}>*</span>&nbsp;{cardPayInfoMap.agentOTP.label}
                      </th>
                      <td>
                        <input type='password' name={cardPayInfoMap.agentOTP.name} value={cardPayInfo.agentOTP}
                               onChange={handleInputCashInfoChange}
                               className='w30p'
                        />
                      </td>
                    </tr>
                    <tr>
                      <th><span className='required' style={requireStyle}>*</span>&nbsp;{cardPayInfoMap.customerPIN.label}</th>
                      <td><input type='password' name={cardPayInfoMap.customerPIN.name} value={cardPayInfo.customerPIN}
                                 onChange={handleInputCashInfoChange} className='w30p'/></td>
                    </tr>
                    </tbody>
                  </table>
                </div> :
                <div>
                  <b>신용카드 결제가 완료 되었습니다.</b>
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

export default CardPay;
