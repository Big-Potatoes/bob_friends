import React, { useEffect } from 'react'
import Loading from '../components/Loading'
import { Wrapper, LogoWrapper, LogoText } from '../styles/home'

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
