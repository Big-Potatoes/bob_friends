/* eslint-disable */
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Wrapper, LogoContainer } from '../styles/s-components/header'
import { getUserInfo } from '../store/userStore'
//* header에 있어야 할 기능
// center - 로고 : 클릭하면 index로 이동

const Header = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { isLogin, userInfo } = useSelector((state) => state.userSlice)
  const logoHandler = () => {
    navigate('/')
  }
  console.log(isLogin, userInfo)
  const [isEdit, setIsEdit] = useState(false)

  // todo
  // 헤더가 렌더링 될 때마다 -> 로컬스토리지에 저장된 토큰으로 유저 정보 조회 요청 보내기(스토어 액션)
  // 유저 정보 조회 하고 나면 스토어에 유저 정보 저장하기
  // 헤더에 보이는 지역 정보, 로그인 정보는 스토어에서 꺼내서 쓰기

  useEffect(() => {
    dispatch(getUserInfo())
  }, [])

  const LeftField = ({ setIsEdit }) => {
    // 2. 지역 : 인증시 유저의 인증한 지역, 없으면 지역 인증 유도 버튼
    // 5. 뒤로가기 : 게시글 작성일 때 뒤로 가기 버튼
    // useEffect(() => {
    //   // 로그인한 상태
    //   // ? (로그인 O) 페이지 위치-content ? 뒤로가기 : null
    //   //  : (페이지 위치-not content) 지역 인증 O ? 인증된 지역 : 지역 인증 필요
    //   // : (로그인 X) 지역 인증 필요
    //   setRegion(testRegion)
    //   setIsEdit(testEdit)
    // }, [])
    return (
      <div className="header_left">
        {isLogin ? (
          isEdit ? (
            <p>뒤로 가기</p>
          ) : userInfo.localCertification ? (
            <p>{`${userInfo.nickname}의 인증 지역`}</p>
          ) : (
            <p>지역 인증 필요</p>
          )
        ) : (
          <p>지역을 인증하세요</p>
        )}
      </div>
    )
  }
  const RightField = ({ setIsEdit }) => {
    // 3. login : login 상태가 아닐 경우 노출
    // 4. mypage: login 상태일 경우 노출
    // 6. 완료버튼 : 게시글 작성일 때 완료 버튼
    // useEffect(() => {
    //   setIsEdit(testEdit)
    // }, [])
    return (
      <div className="header_right">
        {isLogin ? (
          isEdit ? (
            <p>완료</p>
          ) : (
            <p>my page</p>
          )
        ) : (
          <Link to="/login">login</Link>
        )}
      </div>
    )
  }
  return (
    <Wrapper className="header">
      <LeftField className="header_left" setIsEdit={setIsEdit} />
      <LogoContainer
        className="header_logo"
        src="/assets/logo.png"
        alt="header_logo"
        onClick={logoHandler}
      >
        밥친구
      </LogoContainer>
      <RightField className="header_right" setIsEdit={setIsEdit} />
    </Wrapper>
  )
}

export default Header
