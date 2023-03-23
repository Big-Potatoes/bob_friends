import styled from 'styled-components'

export const Wrapper = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 80px;
  background: var(--black-100);
  display: flex;
  justify-content: space-around;
  align-items: center;
`
export const MenuWrapper = styled.div`
  max-width: 60px;
  background-color: skyblue;
  font-weight: var(--fw-bold);
`
export const LogoWrapper = styled.img`
  width: 60px;
  height: auto;
`
export const IconWrapper = styled.svg`
  width: 45px;
`
