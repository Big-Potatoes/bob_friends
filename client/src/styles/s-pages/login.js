import styled from 'styled-components'
import { Link } from 'react-router-dom'
export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`
export const InputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 5px;
  position: relative;
`
export const AlertText = styled.p`
  width: max-content;
  color: var(--maincolor);
  font-size: var(--fz-sm);
  font-weight: var(--fw-bold);
  position: absolute;
  top: calc(100% + 10px);
  left: 50%;
  transform: translateX(-50%);
`
export const CustomLink = styled(Link)`
  color: var(--maincolor);
  font-weight: var(--fw-strong);
  &:hover,
  :visited,
  :active {
    color: var(--maincolor);
  }
`
export const CustomSpan = styled.span`
  color: var(--black-300);
  font-size: var(--fz-sm);
`
