import React, { useCallback, useState } from 'react';
import Router from 'next/router';
import { USER_CONST } from '../../../../src/common/globalConst';
import Loading from '../../../../src/components/user/common/Loading';
import Util from '../../../../src/common/util';
import TableComponent from '../../../../src/components/common/jsmartTable';
import { NoticeList } from '../../../../src/models/user/posts/Notice';
import Pagination from '../../../../src/components/common/jsmartPagination';
import DUMMY from '../../../../src/common/dummyConst';

const ShowAccount = () => {

  const accountInfoMap = {
    mobileNumber: {
      name: 'mobileNumber',
      label: '휴대폰 번호'
    },
    accountNumber: {
      name: 'accountNumber',
      label: '계좌 번호'
    },
    customerPIN: {
      name: 'customerPIN',
      label: '고객 PIN'
    },
    balance: {
      name: 'balance',
      label: '잔액'
    }
  };

  const initialAccountInfo = {
    mobileNumber: '',
    accountNumber: '',
    customerPIN: '',
    balance: 1455000
  };

  const [phase, setPhase] = useState(0);
  const [accountInfo, setAccountInfo] = useState(initialAccountInfo);
  const [showLoading, setShowLoading] = useState(false);
  const [loadingStatement, setLoadingStatement] = useState('');
  const [afterAuth, setAfterAuth] = useState(false);

  const handleInputJoinInfoChange = useCallback((e) => {
    const { name, value } = e.target;

    setAccountInfo((prev) => ({
      ...prev,
      [name]: value
    }));
  }, [accountInfo]);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    phase === 0 && setPhase(1);
  }, [accountInfo, phase]);

  const handleShow = useCallback((e) => {
    e.preventDefault();
    setAfterAuth(true);
    setTimeout((e) => {
      setShowLoading(false);
    }, 2000);
  }, [accountInfo, phase]);

  const handleCancel = useCallback((e) => {
    e.preventDefault();
    Router.push(`${USER_CONST.BASE_ROUTER_PATH}/main`);
    setPhase(0);
    setLoadingStatement('');
    setAccountInfo(initialAccountInfo);
    setAfterAuth(false);
  }, []);

  const onClickDemo = useCallback((e) => {
    e.preventDefault();
    if(!afterAuth){
      setAccountInfo((prev) => ({
        ...prev,
        mobileNumber: DUMMY.PHONE_NUMBER
      }));
    }
    if (phase === 0) {
      setAccountInfo((prev) => ({
        ...prev,
        customerPIN: DUMMY.CLIENT_PIN
      }));
    }
  }, [phase]);

  const requireStyle = {
    fontWeight: 'bold',
    color: '#ed1c24'
  };

  return (
    <>
      <div className='inner'>
        <div id='contents' className='noLnb'>
          <div className='subTop'>
            <h3>계좌 조회</h3>
            {phase !==1 &&
            <button
              className={'btn_l'}
              style={{
                float: 'right',
                marginBottom: '10px'
              }}
              onClick={onClickDemo}>demo
            </button>
            }
          </div>
          <form>
            <br/>
            {phase === 0 ?
              <div className='tableBox'>
                <table className='form'>
                  <colgroup>
                    <col style={{ width: '180px' }}/>
                  </colgroup>
                  <tbody>

                  <tr>
                    <th scope='row'><span className='required' style={requireStyle}>*</span>&nbsp;{accountInfoMap.mobileNumber.label}
                    </th>
                    <td><input type='number' name={accountInfoMap.mobileNumber.name} value={accountInfo.mobileNumber}
                               onChange={handleInputJoinInfoChange} className='w50p'/>&nbsp;&nbsp;
                      <button onClick={handleShow} className='btn_l on'>조회</button>
                    </td>
                  </tr>
                  {
                    afterAuth &&
                    <>
                      <tr>
                        <th scope='row' className='noLine'>계좌번호</th>
                        <td>
                          <select name={'accountNumber'} value={accountInfo.accountNumber}>
                            <option value={0}>1111-2222-1234</option>
                            <option value={1}>2222-1111-4321</option>
                          </select>
                        </td>
                      </tr>
                      <tr>
                        <th scope='row' className='noLine'>고객 PIN</th>
                        <td>
                          <input type='password' name={accountInfoMap.customerPIN.name} value={accountInfo.customerPIN}
                                 onChange={handleInputJoinInfoChange} className='w50p'/>
                        </td>
                      </tr>
                    </>
                  }

                  </tbody>
                </table>
              </div>
              :
              phase === 1 &&
              <>
              <div className='tableBox'>
                <table className='form'>
                  <colgroup>
                    <col style={{ width: '180px' }}/>
                  </colgroup>
                  <tbody>
                  <tr>
                    <th scope='row'>{accountInfoMap.accountNumber.label}</th>
                    <td>
                      <input type='password' name={accountInfoMap.accountNumber.name} value={accountInfo.accountNumber}
                             onChange={handleInputJoinInfoChange} readOnly={true}
                             className='w30p'
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>{accountInfoMap.balance.label}</th>
                    <td><input type='text' name={accountInfoMap.balance.name} value={Util.numberWithCommas(accountInfo.balance)}
                               onChange={handleInputJoinInfoChange} className='w30p' readOnly={true}/>&nbsp;원</td>

                  </tr>
                  </tbody>
                </table>


              </div>
              <TableComponent
              dataProps={(new NoticeList()).getMapToNoticeListData()}
              totalCount={4}
              />

              <Pagination currentPage={1} totalCount={4} onChange={undefined}/>
              </>
            }
            <div className='btnArea'>
              {phase === 0 ?
                <button onClick={handleSubmit} className='btn_l on'>계좌 조회</button>
                : <button onClick={handleCancel} className='btn_l on'>메인화면으로 돌아가기</button>
              }
            </div>

          </form>
        </div>
      </div>
    </>
  );
};

export default ShowAccount;
