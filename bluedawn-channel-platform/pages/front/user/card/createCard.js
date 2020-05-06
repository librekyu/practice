import React, { useCallback, useState } from 'react';
import AddressSearchInput from '../../../../src/components/common/userAddressSearchInput';
import Router from 'next/router';
import { USER_CONST } from '../../../../src/common/globalConst';
import Loading from '../../../../src/components/user/common/Loading';

const CreateCard = () => {

  const createCardInfoMap = {
    identification: {
      name: 'identification',
      required: true,
      label: '신분증'
    },
    applicationSubmit: {
      name: 'applicationSubmit',
      required: true,
      label: '신청서 제출'
    },
    userName: {
      name: 'userName',
      required: true,
      label: '이름'
    },
    birth: {
      name: 'birth',
      required: true,
      label: '생년월일'
    },
    expiration: {
      name: 'expiration',
      required: true,
      label: '만기일자'
    },
    mobileNumber: {
      name: 'mobileNumber',
      required: true,
      label: '휴대폰 번호'
    },
    address: {
      name: 'address',
      required: true,
      label: '주소'
    },
    detailAddress: {
      name: 'detailAddress',
      required: true,
      label: '상세 주소'
    },
    nationality: {
      name: 'nationality',
      required: true,
      label: '국적'
    },
    agentOTP: {
      name: 'Agent OTP',
      required: true,
      label: 'Agent OTP'
    },
    customerPIN: {
      name: 'customerPIN',
      required: true,
      label: '고객 PIN'
    }
  };

  const initialJoinAccountInfo = {
    identification: '',
    applicationSubmit: '',
    userName: '',
    mobileNumber: '',
    birth: '',
    address: '',
    detailAddress: '',
    nationality: '',
    agentOTP: '',
    customerPIN: '',
  };

  const [phase, setPhase] = useState(0);
  const [joinInfo, setJoinInfo] = useState(initialJoinAccountInfo);              // 회원입력정보
  const [addressInput, setAddressInput] = useState('');                 // KAKAO 주소 검색 response 값
  const [showLoading, setShowLoading] = useState(false);
  const [loadingStatement, setLoadingStatement] = useState('');

  const handleInputJoinInfoChange = useCallback((e) => {
    const { name, value } = e.target;

    setJoinInfo((prev) => ({
      ...prev,
      [name]: value
    }));
  }, [joinInfo]);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    phase === 0 && setPhase(1);

    if(phase === 1){
      setShowLoading(true);
      setLoadingStatement('자료 전송과 카드 신청 진행중입니다');
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
    setAddressInput('');
    setJoinInfo(initialJoinAccountInfo);
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
            <h3>카드 신청/신규</h3>
          </div>
          <form>
            {
              phase !== 2
              && <div className='joinFormTitle'>
                <p className='explanRequire'>
                  <span className='required' style={requireStyle}>*</span>&nbsp;가 표시된 필수 입력 항목입니다.
                </p>
                <br/><br/>
                <h3>신청자 정보</h3>
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
                    <th scope='row'><span className='required' style={requireStyle}>*</span>&nbsp;{createCardInfoMap.identification.label}
                    </th>
                    <td>
                      <input type='text' name={createCardInfoMap.identification.name} value={joinInfo.identification}
                             onChange={handleInputJoinInfoChange}
                             className='w30p'
                      />
                    </td>
                  </tr>
                  <tr>
                    <th scope='row'><span className='required' style={requireStyle}>*</span>&nbsp;{createCardInfoMap.applicationSubmit.label}
                    </th>
                    <td>
                      <input type='text' name={createCardInfoMap.applicationSubmit.name} value={joinInfo.applicationSubmit}
                             onChange={handleInputJoinInfoChange}
                             className='w30p'
                      />
                    </td>
                  </tr>
                  <tr>
                    <th><span className='required' style={requireStyle}>*</span>&nbsp;{createCardInfoMap.userName.label}</th>
                    <td><input type='text' name={createCardInfoMap.userName.name} value={joinInfo.userName}
                               onChange={handleInputJoinInfoChange} className='w30p'/></td>
                  </tr>
                  <tr>
                    <th scope='row'><span className='required' style={requireStyle}>*</span>&nbsp;{createCardInfoMap.birth.label}</th>
                    <td><input type='number' name={createCardInfoMap.birth.name} value={joinInfo.birth}
                               onChange={handleInputJoinInfoChange} className='w50p'/>&nbsp;&nbsp;
                      <span className='explanEx'>6자리 숫자만 입력(예. 800101)</span>
                    </td>
                  </tr>

                  <tr>
                    <th scope='row'><span className='required' style={requireStyle}>*</span>&nbsp;{createCardInfoMap.expiration.label}</th>
                    <td><input type='number' name={createCardInfoMap.expiration.name} value={joinInfo.expiration}
                               onChange={handleInputJoinInfoChange} className='w50p'/>&nbsp;&nbsp;
                      <span className='explanEx'>6자리 숫자만 입력(예. 800101)</span>
                    </td>
                  </tr>

                  <tr>
                    <th scope='row'><span className='required' style={requireStyle}>*</span>&nbsp;{createCardInfoMap.nationality.label}
                    </th>
                    <td>
                      <select className={'w20p'} onChange={handleInputJoinInfoChange} name={createCardInfoMap.nationality.name}
                              value={joinInfo.nationality}>
                        <option value={''}>선택하세요</option>
                        <option value={'america'}>미국</option>
                        <option value={'vietnam'}>베트남</option>
                        <option value={'china'}>중국</option>
                        <option value={'kr'}>한국</option>
                      </select>
                    </td>
                  </tr>

                  <tr>
                    <th scope='row'><span className='required' style={requireStyle}>*</span>&nbsp;{createCardInfoMap.mobileNumber.label}
                    </th>
                    <td><input type='number' name={createCardInfoMap.mobileNumber.name} value={joinInfo.mobileNumber}
                               onChange={handleInputJoinInfoChange} className='w50p'/>&nbsp;&nbsp;
                      <span className='explanEx'>숫자만 입력</span>
                    </td>
                  </tr>

                  <tr>
                    <th scope='row' className='noLine'><span className='required'
                                                             style={requireStyle}>*</span>&nbsp;{createCardInfoMap.address.label}</th>
                    <td className='noLine'>
                      <AddressSearchInput
                        addressInput={addressInput}
                        setAddressInput={setAddressInput}
                        setInfo={setJoinInfo}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th scope='row'><span className='required' style={requireStyle}>*</span>&nbsp;{createCardInfoMap.detailAddress.label}
                    </th>
                    <td>
                      <input
                        type='text'
                        name={createCardInfoMap.detailAddress.name}
                        value={joinInfo.detailAddress}
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
                      <th scope='row'><span className='required' style={requireStyle}>*</span>&nbsp;{createCardInfoMap.agentOTP.label}
                      </th>
                      <td>
                        <input type='password' name={createCardInfoMap.agentOTP.name} value={joinInfo.agentOTP}
                               onChange={handleInputJoinInfoChange}
                               className='w30p'
                        />
                      </td>
                    </tr>
                    <tr>
                      <th><span className='required' style={requireStyle}>*</span>&nbsp;{createCardInfoMap.customerPIN.label}</th>
                      <td><input type='password' name={createCardInfoMap.customerPIN.name} value={joinInfo.customerPIN}
                                 onChange={handleInputJoinInfoChange} className='w30p'/></td>
                    </tr>
                    </tbody>
                  </table>
                </div> :
                <div>{joinInfo.userName} 님의 카드신청이 완료되었습니다.
                  <br/>발급은 검토 후 SMS로 진행결과를 알려 드립니다.
                </div>

            }

            {phase !== 2 ?
              <>
                <div className='explanFoot'>
                  <strong>개인정보 입력 및 관리 안내</strong>
                  <br/><br/>
                  <p>입력하신 정보는 에이전트 뱅킹 서비스 이용에 사용됩니다.<br/>
                    잘못된 정보로인하여 서비스 이용에 불편할 수 있사오니 가급적 정확하게 입력하여주시기 바랍니다.<br/>
                    입력된 개인정보는 '마이페이지 > 개인정보관리'에서 수정할 수 있습니다.<br/>
                    소중한 개인정보는 개인정보 관리방침에 따라 안전하게 관리됩니다.<br/>
                  </p>
                </div>
                <br/><br/>
                <div className='btnArea'>
                  <button onClick={handleSubmit} className='btn_l on'>다음</button>
                  &nbsp;
                  <button onClick={handleCancel} className='btn_l'>카드개설 취소</button>
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

export default CreateCard;
