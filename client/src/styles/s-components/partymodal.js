import styled from 'styled-components'
import { CustomInput } from '../s-pages/write'
import '../s-global/variable.css'
export const PartyWrap = styled.section`
  position: fixed;
  z-index: 999;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  opacity: 0;
  visibility: hidden;
  background: var(--modalBack);
  transition: 0.4s;
  &.modalopen {
    opacity: 1;
    visibility: visible;
    transition: 0.4s;
  }
`
export const PartyContent = styled.div`
  position: absolute;
  width: calc(100% - 30px);
  left: 50%;
  transform: translateX(-50%);
  top: 100%;
  bottom: -100%;
  background: #fff;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  padding: 50px 15px 30px;
  transition: 0.4s;
  ${PartyWrap}.modalopen & {
    top: 50px;
    bottom: 0;
    transition-delay: 0.1s;
  }
`
export const PartyModalClose = styled.button`
  position: absolute;
  right: 15px;
  top: 15px;
  font-size: 30px;
  cursor: pointer;
`
export const OrderBox = styled.div`
  height: 100%;
  overflow: auto;
  h2 {
    font-weight: var(--fw-strong);
    display: inline-block;
    position: relative;
    margin-bottom: 40px;
    &:after {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      bottom: -2px;
      height: 2px;
      background: var(--black-300);
    }
  }
`
export const MenuTable = styled.ul`
  padding: 0 15px;
`
export const MenuList = styled.li`
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  div {
    width: 50%;
    font-weight: var(--fw-bold);
  }
  span {
    width: calc(20% - 20px);
    margin: 0 10px;
    text-align: right;
  }
  p {
    width: 30%;
    text-align: right;
  }
`
export const MenuInput = styled(CustomInput)`
  width: 100%;
`
export const MenuSum = styled.ul`
  border-top: 1px solid var(--black-300);
  padding: 15px;
  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }
  p {
    font-weight: var(--fw-strong);
  }
`
export const TotalSum = styled.div`
  border-top: 1px solid var(--black-300);
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--maincolor);
  p {
    font-weight: var(--fw-strong);
  }
`
