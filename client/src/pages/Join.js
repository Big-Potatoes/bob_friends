/* eslint-disable */
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  OuterWrapper,
  InputBase,
  InputLabel,
  ButtonBase,
} from '../styles/s-global/common'
import { Wrapper, InputContainer, AlertText } from '../styles/s-pages/join'
const Join = () => {
  const navigate = useNavigate()
  const [userInfo, setUserInfo] = useState({
    id: '',
    nickname: '',
    pw: '',
    pwConfirm: '',
  })
  const [errorMessage, setErrorMessage] = useState({
    id: '',
    pw: '',
    pwConfirm: '',
  })
  const [validation, setValidation] = useState({
    id: false,
    nickname: false,
    pw: false,
    pwConfirm: false,
  })
  const [modalOpen, setModalOpen] = useState(false)
  //* 모든 데이터 검사가 완료되면 length === 4
  const isAllcheck =
    Object.values(validation).filter((el) => el === true).length === 4
  const validateId = (id) => {
    if (!id) {
      setErrorMessage({
        ...errorMessage,
        id: '',
      })
      setValidation({
        ...validation,
        id: false,
      })
    } else if (id.length < 6) {
      setErrorMessage({
        ...errorMessage,
        id: '아이디는 6글자 이상 입력해 주세요.',
      })
      setValidation({
        ...validation,
        id: false,
      })
    } else {
      //* test data! 추후 api 결과로 바꾸기
      const testStatus = true
      //* api 요청 보내고 결과가 중복된 결과라고 나오면
      if (testStatus === false) {
        setErrorMessage({
          ...errorMessage,
          id: '이미 가입된 아이디입니다.',
        })
        setValidation({
          ...validation,
          id: false,
        })
        //* api 요청 결과가 OK면
      } else {
        setErrorMessage({
          ...errorMessage,
          id: '사용할 수 있는 아이디입니다.',
        })
        setValidation({
          ...validation,
          id: true,
        })
      }
    }
  }
  const validatePw = (pw) => {
    const reg =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/

    if (!pw) {
      setErrorMessage({
        ...errorMessage,
        pw: '',
      })
      setValidation({
        ...validation,
        pw: false,
      })
    } else if (!reg.test(pw)) {
      setErrorMessage({
        ...errorMessage,
        pw: '사용할 수 없는 비밀번호입니다.',
      })
      setValidation({
        ...validation,
        pw: false,
      })
    } else if (reg.test(pw)) {
      setErrorMessage({
        ...errorMessage,
        pw: '',
      })
      setValidation({
        ...validation,
        pw: true,
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
    } else if (userInfo.pw !== pwConfirm) {
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
    if (key === 'id') {
      const id = e.target.value
      validateId(id)
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
    } else if (key === 'pw') {
      const pw = e.target.value
      validatePw(pw)
      //* pwConfirm 검사
    } else if (key === 'pwConfirm') {
      const pwConfirm = e.target.value
      validatePwConfirm(pwConfirm)
    }
  }
  const submitUserInfo = (e) => {
    //* id, nickname, pw, pwConfirm 값이 전부 입력되고
    // 유효성 검사를 다 마쳤는지 확인해서
    // api 요청 보내기
    e.preventDefault()
    const data = {
      id: userInfo.id,
      nickname: userInfo.nickname,
      pw: userInfo.pw,
    }
    console.log('api post 요청', data)
    setTimeout(() => {
      navigate('/login')
    }, 2000)
  }
  return (
    <OuterWrapper>
      <Wrapper className="join_wrapper" action="#" onSubmit={submitUserInfo}>
        <InputContainer className="input_id">
          <InputLabel htmlFor="id">아이디</InputLabel>
          <InputBase
            type="text"
            id="id"
            onChange={handleInputValue('id')}
            value={userInfo.id}
            required
          />
        </InputContainer>
        <AlertText>{errorMessage.id}</AlertText>
        <InputContainer className="input_nickname">
          <InputLabel htmlFor="id">닉네임</InputLabel>
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
            onChange={handleInputValue('pw')}
            value={userInfo.pw}
            required
          />
        </InputContainer>
        <AlertText color="var(--black-200)" width="280px">
          8~20자 사이의 영문 소문자, 대문자, 숫자, 특수기호(@$!%*?&)로
          이루어져야 합니다.
        </AlertText>
        <AlertText>{errorMessage.pw}</AlertText>
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
        <ButtonBase
          type="submit"
          className={isAllcheck ? null : 'disabled'}
          disabled={!isAllcheck}
        >
          회원가입
        </ButtonBase>
      </Wrapper>
    </OuterWrapper>
  )
}

export default Join
