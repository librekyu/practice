/**
 * 메인 메뉴 구조
 * @author kimhg
 * */

export const mainMenus = [
  {
    key: ['MENU_RECEIVE'],
    label: '수신',
    className: 'bg5',
    link: '/receive/createAccount',
    nodes: [
      {
        key: ['MENU_RECEIVE_CREATE_ACCOUNT'],
        label: '계좌 개설',
        link: '/receive/createAccount',
      },
      {
        key: ['MENU_RECEIVE_INPUT_CASH'],
        label: '현금 입금',
        link: '/receive/inputCash',
      },
      {
        key: ['MENU_RECEIVE_OUTPUT_CASH'],
        label: '현금 출금',
        link: '/receive/outputCash',
      },
      {
        key: ['MENU_RECEIVE_OTHER_SEND'],
        label: '타발 송금 지급',
        link: '/receive/otherSend',
      },
      {
        key: ['MENU_RECEIVE_SHOW_ACCOUNT'],
        label: '계좌 조회',
        link: '/receive/showAccount',
      },
      {
        key: ['MENU_RECEIVE_TRANSFER'],
        label: '계좌 이체',
        link: '/receive/transfer',
      },
    ]
  },
  {
    key: ['MENU_GIVE_FAITH'],
    label: '여신',
    link: '/give/pay',
    nodes: [
      {
        key: ['MENU_GIVE_PAY'],
        label: '대출원리금 납부',
        link: '/give/pay',
      },
      {
        key: ['MENU_GIVE_AGREE'],
        label: '대출 가승인',
        link: '/give/agree',
      },
      {
        key: ['MENU_GIVE_RECEIVE'],
        label: '대출금 수령',
        link: '/give/receive',
      },
    ]
  },
  {
    key: ['MENU_CARD'],
    label: '카드',
    link: '/card/createCard',
    nodes: [
      {
        key: ['MENU_CARD_CREATE_CARD'],
        label: '카드신청/신규',
        link: '/card/createCard',
      },
      {
        key: ['MENU_CARD_CHARGE'],
        label: '선불카드 충전',
        link: '/card/charge',
      },
      {
        key: ['MENU_CARD_RECEIVE'],
        label: '카드 수령',
        link: '/card/receiveCard',
      },
      {
        key: ['MENU_CARD_PAY'],
        label: '신용카드 결제',
        link: '/card/cardPay',
      },
    ]
  },
  {
    key: ['MENU_ETC'],
    label: '기타',
    link: '/etc/pay',
    nodes: [
      {
        key: ['MENU_ETC_PAY'],
        label: '공과금 납부',
        link: '/etc/pay',
      },
      {
        key: ['MENU_ETC_REPORT'],
        label: '제신고',
        link: '/etc/report',
      },{
        key: ['MENU_ETC_AUTH'],
        label: '증명서',
        link: '/etc/auth',
      },
    ]
  },
  // {
  //   key: ['MENU_'],
  //   label: '',
  //   link: '/',
  //   nodes: [
  //     {
  //       key: ['MENU_'],
  //       label: '',
  //       link: '/',
  //     },
  //   ]
  // },
];
