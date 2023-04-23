import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const Wrapper = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 80px;
  padding: 10px 10px;
  background: white;
  border-top: 1px solid var(--black-100);
  z-index: 10;
`
export const ListWrapper = styled.ul`
  display: flex;
  justify-content: space-around;
  align-items: center;
`
export const MenuWrapper = styled(Link)`
  width: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 35px;
  span {
    margin-top: 5px;
  }
  span &:active,
  :hover {
    color: var(--yellow-200);
  }
  &.clicked {
    color: var(--yellow-200);
    > span {
      display: none;
    }
  }
  > * {
    filter: drop-shadow(1px 4px 3px var(--black-100));
  }
`
export const LogoWrapper = styled.img`
  /* position: absolute;
  left: 50%;
  transform: translate(-50%, -50%); */
  width: 50px;
  height: auto;
`
export const MenuTitle = styled.span`
  font-size: var(--fz-xs);
  font-weight: var(--fw-bold);
  letter-spacing: -2px;
`
