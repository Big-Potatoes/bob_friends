import styled from 'styled-components'
import { ButtonSm } from '../s-global/common'
import { Link } from 'react-router-dom'
export const Wrapper = styled.form`
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
  /* position: relative; */
  /* margin-bottom: 18px; */
`
export const AlertText = styled.p`
  width: max-content;
  color: var(--maincolor);
  font-size: var(--fz-sm);
  font-weight: var(--fw-bold);
  min-height: 18px;
  /* position: absolute; */
  /* top: calc(100% + 10px);
  left: 50%;
  transform: translateX(-50%); */
`
export const ModalText = styled.pre`
  text-align: center;
  white-space: pre-line;
  word-break: break-all;
  overflow: auto;
  line-height: 1.3;
`
export const CloseModalButton = styled(ButtonSm)`
  height: 30px;
  margin-top: 30px;
`
export const BottomWrapper = styled.div`
  width: 250px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
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
