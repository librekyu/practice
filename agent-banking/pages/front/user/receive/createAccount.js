import React, { useCallback, useEffect, useRef, useState } from 'react';
import fs from 'fs';
import AddressSearchInput from '../../../../src/components/common/userAddressSearchInput';
import Router from 'next/router';
import { USER_CONST } from '../../../../src/common/globalConst';
import Loading from '../../../../src/components/user/common/Loading';
import DUMMY from '../../../../src/common/dummyConst';
import Util from '../../../../src/common/util';

const CreateAccount = () => {

  const joinAccountInfoMap = {
    identification: {
      name: 'identification',
      label: 'Identification'
    },
    attachment: {
      name: 'attachment',
      label: 'Attachment'
    },
    id: {
      name: 'id',
      label: 'SO No'
    },
    userName: {
      name: 'userName',
      label: 'Name'
    },
    birth: {
      name: 'birth',
      label: 'Birthday'
    },
    expiration: {
      name: 'expiration',
      label: 'Exp day'
    },
    mobileNumber: {
      name: 'mobileNumber',
      label: 'Tel No.'
    },
    address: {
      name: 'address',
      label: 'Address'
    },
    detailAddress: {
      name: 'detailAddress',
      label: 'Detail Address'
    },
    nationality: {
      name: 'nationality',
      label: '국적'
    },
    agentOTP: {
      name: 'Agent OTP',
      label: 'Agent OTP'
    },
    customerPIN: {
      name: 'customerPIN',
      label: '고객 PIN'
    }
  };

  const initialJoinAccountInfo = {
    identification: '',
    attachment: '',
    id: '',
    userName: '',
    mobileNumber: '',
    birth: '',
    address: '',
    detailAddress: '',
    nationality: '',
    agentOTP: '',
    customerPIN: '',
  };

  const fileRef = useRef();

  const [phase, setPhase] = useState(0);
  const [joinInfo, setJoinInfo] = useState(initialJoinAccountInfo);              // 회원입력정보
  const [showLoading, setShowLoading] = useState(false);
  const [loadingStatement, setLoadingStatement] = useState('');
  const [fileList, setFileList] = useState('');

  useEffect(() => {
    return () => {
      setPhase(0);
      setLoadingStatement('');
      setJoinInfo(initialJoinAccountInfo);
      setFileList('');
    };
  }, []);

  const handleInputJoinInfoChange = useCallback((e) => {
    const { name, value } = e.target;

    setJoinInfo((prev) => ({
      ...prev,
      [name]: name === 'mobileNumber' ? Util.numberWithoutSpace(value) : value
    }));
  }, [joinInfo]);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    phase === 0 && setPhase(1);
    if (phase === 1) {
      setShowLoading(true);
      setLoadingStatement('신분증 전송 중');
      setTimeout((e) => {
        setLoadingStatement('계좌 개설 진행중');
      }, 2500);
      setTimeout((e) => {
        setShowLoading(false);
        setPhase(2);
      }, 5000);
    }
  }, [joinInfo, phase]);

  const handleCancel = useCallback((e) => {
    e.preventDefault();
    Router.push(`${USER_CONST.BASE_ROUTER_PATH}/main`);
    setPhase(0);
    setLoadingStatement('');
    setJoinInfo(initialJoinAccountInfo);
    setFileList([]);
  }, []);

  const onClickDemo = useCallback((e) => {
    e.preventDefault();
    if(phase === 0){
      setJoinInfo((prev) => ({
        ...prev,
        identification: DUMMY.IDENTIFICATION_IMG,
        id: DUMMY.ID,
        userName: DUMMY.NAME,
        mobileNumber: DUMMY.PHONE_NUMBER,
        expiration: DUMMY.EXPIRATION,
        birth: DUMMY.BIRTH,
        address: DUMMY.ADDRESS,
        detailAddress: DUMMY.DETAIL_ADDRESS,
        nationality: DUMMY.NATIONALITY,

      }));

      setFileList(DUMMY.FILE_NAME);
    }

    phase === 1 && setJoinInfo((prev) => ({
      ...prev,
      agentOTP: DUMMY.AGENT_OTP,
      customerPIN: DUMMY.CLIENT_PIN,
    }));
  }, [phase]);

  const onClickAddAttachment = useCallback((e) => {
    e.preventDefault();
    fileRef.current.click();
  }, []);

  const onChangeFileList = useCallback((e) => {
    const reader = new FileReader();
    const file = e.target.files[0];

    if (!file) return;

    reader.onloadend = (e) => {
      setFileList(file.name);
    };

    reader.readAsDataURL(file);

  }, []);

  const renderFileList = useCallback(() => {
    return (
      <label>{fileList}</label>);
  }, [fileList]);

  const requireStyle = {
    fontWeight: 'bold',
    color: '#ed1c24'
  };
  // fs.readdir('./', (err, fileList) =>{console.log(fileList.toString())});

  return (
    <>
      <div className='inner'>
        <div id='contents' className='noLnb'>
          <div className='subTop'>
            <h3>Create Account</h3>
          </div>
          <form>
            {
              phase !== 2
              &&
              <div className='joinFormTitle left'>
                <p className='explanRequire'>
                  <span className='required' style={requireStyle}>*</span>&nbsp; is necessary
                </p>
                <br/><br/>
                <h3>Member Info</h3>
                <button
                  className={'btn_l'}
                  style={{
                    float: 'right',
                    marginBottom: '10px'
                  }}
                  onClick={onClickDemo}>demo
                </button>
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
                    <th scope='row'><span className='required' style={requireStyle}>*</span>&nbsp;{joinAccountInfoMap.identification.label}
                    </th>
                    <td>
                      {joinInfo.identification ? <img src={joinInfo.identification} alt={''}/> :
                        <div className="imgInsertBox w50p h300"><span className="bg">Identification</span></div>}&nbsp;
                      <br/>
                      <button className={'btn_l'}>Add Identification</button>
                    </td>
                  </tr>
                  <tr>
                    <th scope='row'><span className='required' style={requireStyle}>*</span>&nbsp;{joinAccountInfoMap.attachment.label}
                    </th>
                    <td>
                      <input type={'file'} style={{ display: 'none' }} ref={fileRef} onChange={onChangeFileList}/>
                      {renderFileList()}&nbsp;
                      <button className={'btn_l'} onClick={onClickAddAttachment}>Add attachment</button>
                    </td>
                  </tr>
                  <tr>
                    <th><span className='required' style={requireStyle}>*</span>&nbsp;{joinAccountInfoMap.userName.label}</th>
                    <td><input type='text' name={joinAccountInfoMap.userName.name} value={joinInfo.userName || ''}
                               onChange={handleInputJoinInfoChange} className='w30p'/></td>
                  </tr>
                  <tr>
                    <th scope='row'><span className='required' style={requireStyle}>*</span>&nbsp;{joinAccountInfoMap.id.label}</th>
                    <td>
                      <input type='text' name={joinAccountInfoMap.id.name} value={joinInfo.id || ''}
                             onChange={handleInputJoinInfoChange}
                             className='w30p'/>
                    </td>
                  </tr>
                  <tr>
                    <th scope='row'><span className='required' style={requireStyle}>*</span>&nbsp;{joinAccountInfoMap.birth.label}</th>
                    <td><input type='text' name={joinAccountInfoMap.birth.name} value={joinInfo.birth || ''}
                               onChange={handleInputJoinInfoChange} className='w50p'/>&nbsp;&nbsp;
                    </td>
                  </tr>

                  <tr>
                    <th scope='row'><span className='required' style={requireStyle}>*</span>&nbsp;{joinAccountInfoMap.expiration.label}</th>
                    <td><input type='text' name={joinAccountInfoMap.expiration.name} value={joinInfo.expiration || ''}
                               onChange={handleInputJoinInfoChange} className='w50p'/>&nbsp;&nbsp;
                    </td>
                  </tr>

                  <tr>
                    <th scope='row'><span className='required' style={requireStyle}>*</span>&nbsp;{joinAccountInfoMap.nationality.label}
                    </th>
                    <td>
                      <select className={'w20p'} onChange={handleInputJoinInfoChange} name={joinAccountInfoMap.nationality.name}
                              value={joinInfo.nationality || ''}>
                        <option value={'viet'}>Vietnam</option>
                        <option value={'america'}>America</option>
                        <option value={'ch'}>China</option>
                        <option value={'kr'}>Korea</option>
                      </select>
                    </td>
                  </tr>

                  <tr>
                    <th scope='row'><span className='required' style={requireStyle}>*</span>&nbsp;{joinAccountInfoMap.mobileNumber.label}
                    </th>
                    <td><input type='text' name={joinAccountInfoMap.mobileNumber.name}
                               value={Util.numberWithSpace(joinInfo.mobileNumber) || ''}
                               onChange={handleInputJoinInfoChange} className='w50p'/>&nbsp;&nbsp;
                    </td>
                  </tr>

                  <tr>
                    <th scope='row' className='noLine'><span className='required'
                                                             style={requireStyle}>*</span>&nbsp;{joinAccountInfoMap.address.label}</th>
                    <td className='noLine'>
                      {/*<AddressSearchInput*/}
                      {/*  addressInput={addressInput}*/}
                      {/*  setAddressInput={setAddressInput}*/}
                      {/*  setInfo={setJoinInfo}*/}
                      {/*/>*/}
                      <input
                        type='text'
                        name={joinAccountInfoMap.address.name}
                        value={joinInfo.address || ''}
                        onChange={handleInputJoinInfoChange}
                        className='w70p'
                      />
                    </td>
                  </tr>
                  <tr>
                    <th scope='row'><span className='required' style={requireStyle}>*</span>&nbsp;{joinAccountInfoMap.detailAddress.label}
                    </th>
                    <td>
                      <input
                        type='text'
                        name={joinAccountInfoMap.detailAddress.name}
                        value={joinInfo.detailAddress || ''}
                        onChange={handleInputJoinInfoChange}
                        className='w70p'
                      />
                    </td>
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
                      <th scope='row'><span className='required' style={requireStyle}>*</span>&nbsp;{joinAccountInfoMap.agentOTP.label}
                      </th>
                      <td>
                        <input type='password' name={joinAccountInfoMap.agentOTP.name} value={joinInfo.agentOTP || ''}
                               onChange={handleInputJoinInfoChange}
                               className='w30p'
                        />
                      </td>
                    </tr>
                    <tr>
                      <th><span className='required' style={requireStyle}>*</span>&nbsp;{joinAccountInfoMap.customerPIN.label}</th>
                      <td><input type='password' name={joinAccountInfoMap.customerPIN.name} value={joinInfo.customerPIN || ''}
                                 onChange={handleInputJoinInfoChange} className='w30p'/></td>
                    </tr>
                    </tbody>
                  </table>
                </div> :
                <div>Creating account is complete for {joinInfo.userName} <b>{DUMMY.ACCOUNT_NUMBER}</b>
                </div>

            }

            {phase !== 2 ?
              <>
                <br/><br/>
                <div className='btnArea'>
                  <button onClick={handleSubmit} className='btn_l on'>Next</button>
                  &nbsp;
                  <button onClick={handleCancel} className='btn_l'>Cancel Create Account</button>
                </div>
              </>
              :
              <div className='btnArea'>
                <button onClick={handleCancel} className='btn_l'>To Main</button>
              </div>
            }
          </form>
        </div>
      </div>
      <Loading isLoading={showLoading} label={loadingStatement}/>
    </>
  );
};

export default CreateAccount;
