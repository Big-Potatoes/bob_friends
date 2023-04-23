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
  box-shadow: 0px 0px 10px 0px rgba(34, 34, 34, 0.1);
  background: white;
  z-index: 10;
  > div {
    background: var(--yellow-100);
  }
`
export const LogoContainer = styled.h1`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-family: var(--font-ganpan);
  font-size: var(--fz-lg);
`
