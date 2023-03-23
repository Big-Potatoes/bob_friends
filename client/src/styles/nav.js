import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const Wrapper = styled.ul`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 80px;
  /* background: var(--black-100); */
  display: flex;
  justify-content: space-around;
  align-items: center;
`
export const MenuWrapper = styled(Link)`
  width: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 35px;
  &:active,
  :hover {
    color: var(--yellow-200);
  }
  &.clicked {
    color: var(--yellow-200);
  }
  > svg {
    filter: drop-shadow(1px 3px 4px var(--black-100));
  }
`
export const LogoWrapper = styled.img`
  /* position: absolute;
  left: 50%;
  transform: translate(-50%, -50%); */
  width: 50px;
  height: auto;
`
