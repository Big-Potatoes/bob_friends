import React, { useEffect } from 'react'
import Loading from '../components/Loading'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
const LogoWrapper = styled.img`
  width: 150px;
  height: auto;
`
const LogoText = styled.p`
  font-family: var(--font-ganpan);
  font-size: 40px;
  color: black;
  font-weight: 700;
  margin: 20px 0;
`
const Home = ({ setFlag }) => {
  useEffect(() => {
    setTimeout(() => {
      localStorage.setItem('bob_friends', true)
      setFlag(true)
    }, 5000)
  }, [])
  return (
    <Wrapper>
      <LogoWrapper src="/assets/logo.png" alt="logo" />
      <LogoText>밥친구</LogoText>
      <Loading />
    </Wrapper>
  )
}

export default Home
