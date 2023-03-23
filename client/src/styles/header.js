import styled from 'styled-components'

export const Wrapper = styled.header`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  padding: 0 10px;
  width: 100vw;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* background: var(--black-100); */
  > div {
    background: var(--yellow-100);
  }
`
export const LogoContainer = styled.img`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 40px;
  height: auto;
`
