/* eslint-disable */
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../api/api'
import {
  OuterWrapper,
  InputBase,
  InputLabel,
  ModalBack,
  ModalContent,
} from '../styles/s-global/common'
import {
  Wrapper,
  InputContainer,
  AlertText,
  JoinButton,
  ModalText,
  CloseModalButton,
} from '../styles/s-pages/join'
const Join = () => {
  const navigate = useNavigate()
  const [userInfo, setUserInfo] = useState({
    account: '',
    nickname: '',
    password: '',
    pwConfirm: '',
  })
  const [errorMessage, setErrorMessage] = useState({
    account: '',
    password: '',
    pwConfirm: '',
    status: `회원가입이 완료되었습니다!\n잠시 후 로그인 화면으로 이동합니다.`,
  })
  const [validation, setValidation] = useState({
    account: false,
    nickname: false,
    password: false,
    pwConfirm: false,
  })
  const [modalOpen, setModalOpen] = useState(false)
  //* 모든 데이터 검사가 완료되면 length === 4 -> 회원가입 버튼 disabled 상태 관리
  const isAllcheck =
    Object.values(validation).filter((el) => el === true).length === 4
  const validateId = (account) => {
    if (!account) {
      setErrorMessage({
        ...errorMessage,
        account: '',
      })
      setValidation({
        ...validation,
        account: false,
      })
    } else if (account.length < 6) {
      setErrorMessage({
        ...errorMessage,
        account: '아이디는 6글자 이상 입력해 주세요.',
      })
      setValidation({
        ...validation,
        account: false,
      })
    } else {
      //* 내부 검사 다 통과해야(입력값이 있고, 6글자보다 길어야) 서버 통신
      api
        .get('/auth/account/check-duplicate', {
          params: { account },
        })
        .then((res) => {
          if (res.data) {
            setErrorMessage({
              ...errorMessage,
              account: '사용할 수 있는 아이디입니다.',
            })
            setValidation({
              ...validation,
              account: true,
            })
          }
        })
        .catch((error) => {
          setErrorMessage({
            ...errorMessage,
            account: '이미 가입된 아이디입니다.',
          })
          setValidation({
            ...validation,
            account: false,
          })
        })
    }
  }
  const validatePw = (pw) => {
    const reg =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/

    if (pw && reg.test(pw)) {
      setErrorMessage({
        ...errorMessage,
        password: '',
      })
      setValidation({
        ...validation,
        password: true,
      })
    } else if (!reg.test(pw)) {
      setErrorMessage({
        ...errorMessage,
        password: '사용할 수 없는 비밀번호입니다.',
      })
      setValidation({
        ...validation,
        password: false,
      })
    } else {
      setErrorMessage({
        ...errorMessage,
        password: '',
      })
      setValidation({
        ...validation,
        password: false,
      })
    }
  }
  const validatePwConfirm = (pwConfirm) => {
    if (!pwConfirm) {
      setErrorMessage({
        ...errorMessage,
        pwConfirm: '',
      })
      setValidation({
        ...validation,
        pwConfirm: false,
      })
    } else if (userInfo.password !== pwConfirm) {
      setErrorMessage({
        ...errorMessage,
        pwConfirm: '비밀번호가 일치하지 않습니다.',
      })
      setValidation({
        ...validation,
        pwConfirm: false,
      })
    } else {
      setErrorMessage({
        ...errorMessage,
        pwConfirm: '',
      })
      setValidation({
        ...validation,
        pwConfirm: true,
      })
    }
  }
  const handleInputValue = (key) => (e) => {
    setUserInfo({
      ...userInfo,
      [key]: e.target.value,
    })
    //* id 검사
    if (key === 'account') {
      const account = e.target.value
      validateId(account)
      //* submit 전 확인할 nickname 데이터 검사 결과
    } else if (key === 'nickname') {
      const nickname = e.target.value
      if (nickname) {
        setValidation({
          ...validation,
          nickname: true,
        })
      } else {
        setValidation({
          ...validation,
          nickname: false,
        })
      }
      //* pw 검사
    } else if (key === 'password') {
      const password = e.target.value
      validatePw(password)
      //* pwConfirm 검사
    } else if (key === 'pwConfirm') {
      const pwConfirm = e.target.value
      validatePwConfirm(pwConfirm)
    }
  }
  // Todo: api 붙이면 수정해야 함
  const testApi = false

  const submitUserInfo = (e) => {
    //* account, nickname, password, pwConfirm 값이 전부 입력되고
    // 유효성 검사를 다 마쳤는지 확인해서
    // api 요청 보내기
    e.preventDefault()
    const data = {
      account: userInfo.account,
      nickname: userInfo.nickname,
      password: userInfo.password,
    }
    api
      .post('/auth/sign-up', data)
      .then((res) => {
        console.log(res)
        if (res.status === 200) {
          setErrorMessage({
            ...errorMessage,
            status: `회원가입이 완료되었습니다!\n잠시 후 로그인 화면으로 이동합니다.`,
          })
          setTimeout(() => {
            console.log('로그인으로 이동')
            navigate('/login')
          }, 2500)
        } else if (res.status === 400) {
          setErrorMessage({
            ...errorMessage,
            status: `이미 가입된 아이디입니다.\n올바른 비밀번호를 입력해 주세요.`,
          })
          setTimeout(() => {
            setModalOpen(false)
          }, 2500)
        }
        setModalOpen(true)
      })
      .catch((error) => {
        console.log(error)
        setErrorMessage({
          ...errorMessage,
          status: `네트워크가 원활하지 않습니다.\n잠시 후 다시 시도해 주세요.`,
        })
        setTimeout(() => {
          if (
            errorMessage.status ===
            `회원가입이 완료되었습니다!\n잠시 후 로그인 화면으로 이동합니다.`
          ) {
            navigate('/login')
          }
          setModalOpen(false)
        }, 2500)
      })
  }
  const onClickCloseModal = () => {
    setModalOpen(!modalOpen)
  }
  return (
    <OuterWrapper>
      <Wrapper className="join_wrapper" action="#" onSubmit={submitUserInfo}>
        <InputContainer className="input_account">
          <InputLabel htmlFor="account">아이디</InputLabel>
          <InputBase
            type="text"
            id="account"
            onChange={handleInputValue('account')}
            value={userInfo.account}
            required
          />
        </InputContainer>
        <AlertText>{errorMessage.account}</AlertText>
        <InputContainer className="input_nickname" margin={'0 0 18px 0'}>
          <InputLabel htmlFor="nickname">닉네임</InputLabel>
          <InputBase
            type="text"
            id="nickname"
            onChange={handleInputValue('nickname')}
            value={userInfo.nickname}
            required
          />
        </InputContainer>
        <InputContainer className="input_password">
          <InputLabel htmlFor="password">비밀번호</InputLabel>
          <InputBase
            type="password"
            id="password"
            onChange={handleInputValue('password')}
            value={userInfo.password}
            required
          />
        </InputContainer>
        <AlertText color="var(--black-200)" width="280px">
          8~20자 사이의 영문 소문자, 대문자, 숫자, 특수기호(@$!%*?&)로
          이루어져야 합니다.
        </AlertText>
        <AlertText>{errorMessage.password}</AlertText>
        <InputContainer className="input_password_confirm">
          <InputLabel htmlFor="password_confirm">비밀번호 확인</InputLabel>
          <InputBase
            type="password"
            id="password_confirm"
            onChange={handleInputValue('pwConfirm')}
            value={userInfo.pwConfirm}
            required
          />
        </InputContainer>
        <AlertText>{errorMessage.pwConfirm}</AlertText>
        <JoinButton
          type="submit"
          className={isAllcheck ? null : 'disabled'}
          disabled={!isAllcheck}
        >
          회원가입
        </JoinButton>
      </Wrapper>
      {modalOpen ? (
        <ModalBack>
          <ModalContent>
            <ModalText>{errorMessage.status}</ModalText>
            <CloseModalButton onClick={onClickCloseModal}>
              확인
            </CloseModalButton>
          </ModalContent>
        </ModalBack>
      ) : null}
    </OuterWrapper>
  )
}

export default Join
