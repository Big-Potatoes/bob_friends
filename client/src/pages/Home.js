import React, { useEffect } from 'react'
import Loading from '../components/Loading'
import { Wrapper, LogoWrapper, LogoText } from '../styles/s-pages/home'

const Home = ({ setFlag }) => {
  useEffect(() => {
    setTimeout(async () => {
      localStorage.setItem('bob_friends', true)
      await setFlag(localStorage.getItem('bob_friends'))
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
