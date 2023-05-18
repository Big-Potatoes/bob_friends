import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { login } from '../store/userStore'
import { api } from '../api/api'
import {
  OuterWrapper,
  InputLabel,
  InputBase,
  ButtonBase,
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
  ModalText,
  CloseModalButton,
} from '../styles/s-pages/login'

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [modalOpen, setModalOpen] = useState(false)
  const [apiRes, setApiRes] = useState(false)
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
  const validateUserInfo = (account, password) => {
    if (!account && !password) {
      setErrorMessage({
        ...errorMessage,
        account: '아이디를 입력해 주세요.',
        password: '비밀번호를 입력해 주세요.',
      })
      return false
    } else if (!account) {
      setErrorMessage({
        ...errorMessage,
        account: '아이디를 입력해 주세요.',
      })
      return false
    } else if (!password) {
      setErrorMessage({
        ...errorMessage,
        password: '비밀번호를 입력해 주세요.',
      })
      return false
    }
    return true
  }
  const submitUserInfo = (e) => {
    //* loginInfo로 토큰 발행받는 api 요청 보내기
    e.preventDefault()
    if (validateUserInfo(userInfo.account, userInfo.password)) {
      api
        .post('/auth/sign-in', userInfo)
        .then((res) => {
          if (res.status === 200) {
            // todo: store에 isLogin 상태 업데이트하기
            localStorage.setItem('Bob_accessToken', res.data.accessToken)
            localStorage.setItem('Bob_refreshToken', res.data.refreshToken)
            dispatch(login(true))
            setApiRes(true)
            setErrorMessage({
              ...errorMessage,
              status: '로그인에 성공했습니다.\n잠시 후 홈 화면으로 이동합니다.',
            })
            setModalOpen(true)
            setTimeout(() => {
              navigate('/')
            }, 2500)
          }
        })
        .catch((error) => {
          if (error) {
            console.log(error)
            const status = error.response.request.status
            if (status === 401) {
              setErrorMessage({
                ...errorMessage,
                status: `로그인에 실패했습니다.\n등록된 아이디가 아니거나\n아이디, 비밀번호가 잘못 입력되었는지\n 확인해 주세요.`,
              })
              setModalOpen(true)
              setTimeout(() => {
                setModalOpen(false)
              }, 2500)
            } else {
              setErrorMessage({
                ...errorMessage,
                status: '네트워크가 불안정 하오니\n잠시 후 다시 시도해 주세요.',
              })
              setModalOpen(true)
              setTimeout(() => {
                setModalOpen(false)
              }, 2500)
            }
          }
        })
    }
  }
  const onClickCloseModal = () => {
    if (apiRes) {
      navigate('/login')
    }
    setModalOpen(!modalOpen)
  }

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

export default Login
