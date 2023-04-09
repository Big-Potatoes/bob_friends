/* eslint-disable */
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../api/api'
import {
  OuterWrapper,
  InputLabel,
  InputBase,
  ButtonBase,
  ModalWrap,
  ModalBack,
  ModalContent,
} from '../styles/s-global/common'
import {
  Wrapper,
  InputContainer,
  CustomLink,
  CustomSpan,
  AlertText,
  BottomWrapper,
} from '../styles/s-pages/login'

const Login = () => {
  const navigate = useNavigate()
  const [modalOpen, setModalOpen] = useState(false)
  const [errorMessage, setErrorMessage] = useState({
    account: '',
    password: '',
    status: '',
  })
  const [userInfo, setUserInfo] = useState({
    account: '',
    password: '',
  })

  const handleUserInfo = (key) => (e) => {
    const data = {
      ...userInfo,
      [key]: e.target.value,
    }
    setUserInfo(data)
    if (e.target.value) {
      if (key === 'account') {
        setErrorMessage({
          ...errorMessage,
          account: '',
        })
      } else {
        setErrorMessage({
          ...errorMessage,
          password: '',
        })
      }
    }
  }
  const submitUserInfo = (e) => {
    e.preventDefault()
    if (!userInfo.account && !userInfo.password) {
      setErrorMessage({
        ...errorMessage,
        account: '아이디를 입력해 주세요.',
        password: '비밀번호를 입력해 주세요.',
      })
    } else if (!userInfo.account) {
      setErrorMessage({
        ...errorMessage,
        account: '아이디를 입력해 주세요.',
      })
    } else if (!userInfo.password) {
      setErrorMessage({
        ...errorMessage,
        password: '비밀번호를 입력해 주세요.',
      })
    } else {
      api
        .post('/auth/sign-in', userInfo)
        .then((res) => {
          console.log(res)
          if (res.status === 200) {
            localStorage.setItem('Bob_accessToken', res.data.accessToken)
            localStorage.setItem('Bob_refreshToken', res.data.refreshToken)
            setErrorMessage({
              ...errorMessage,
              status: '로그인에 성공했습니다.\n잠시 후 홈 화면으로 이동합니다.',
            })
            setModalOpen(true)
            // setTimeout(() => {
            //   navigate('/')
            // }, 2500)
          }
        })
        .catch((error) => {
          if (error) {
            const status = error.response.request.status
            if (status === 401) {
              setErrorMessage({
                ...errorMessage,
                status: `로그인에 실패했습니다.\n다음의 경우를 확인해주세요.\n1. 등록된 아이디가 아니거나\n2.아이디, 비밀번호가 잘못 입력되지 않았는지 확인해주세요.`,
              })
              setModalOpen(true)
              // setTimeout(() => {
              //   setModalOpen(false)
              // }, 2500)
            } else {
              setErrorMessage({
                ...errorMessage,
                status: '네트워크가 불안정 하오니\n잠시 후 다시 시도해 주세요.',
              })
              setModalOpen(true)
              // setTimeout(() => {
              //   setModalOpen(false)
              // }, 2500)
            }
          }
        })
    }
  }
  console.log(errorMessage)
  return (
    <OuterWrapper>
      <Wrapper className="login_wrapper" action="#" onSubmit={submitUserInfo}>
        <InputContainer className="input_account">
          <InputLabel htmlFor="account">아이디</InputLabel>
          <InputBase
            type="text"
            id="account"
            onChange={handleUserInfo('account')}
            value={userInfo.account}
          />
        </InputContainer>
        <AlertText className="alert_account">{errorMessage.account}</AlertText>
        <InputContainer className="input_password">
          <InputLabel htmlFor="password">비밀번호</InputLabel>
          <InputBase
            type="password"
            id="password"
            onChange={handleUserInfo('password')}
            value={userInfo.password}
          />
        </InputContainer>
        <AlertText className="alert_password">
          {errorMessage.password}
        </AlertText>
        <ButtonBase type="submit" margin={'60px 0 30px 0'}>
          로그인
        </ButtonBase>
        <BottomWrapper className="join">
          <CustomSpan>아직 계정이 없나요?</CustomSpan>
          <CustomLink to="/join">회원가입</CustomLink>
        </BottomWrapper>
        {/* <BottomWrapper className="identify">
          <CustomSpan>아이디/비밀번호를 잊었나요?</CustomSpan>
          <CustomLink to="identify">계정찾기</CustomLink>
        </BottomWrapper> */}
        {/* <span>소셜로그인</span> */}
      </Wrapper>
      {modalOpen ? (
        <ModalBack>
          <ModalContent>{errorMessage.status}</ModalContent>
        </ModalBack>
      ) : null}
    </OuterWrapper>
  )
}

export default Login
