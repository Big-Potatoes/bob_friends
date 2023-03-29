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
  justify-content: flex-end;
`
export const AlertText = styled.p`
  color: var(--maincolor);
  font-size: var(--fz-sm);
  font-weight: var(--fw-bold);
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
