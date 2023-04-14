import styled from 'styled-components'
import { Tag, ButtonSm } from '../s-global/common'

export const TagWrap = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;
  ${Tag} {
    margin-right: 4px;
  }
`
export const ContentHead = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin: 15px 0;
`
export const ContentTitle = styled.h2`
  font-size: var(--fz-lg);
  line-height: 1.3;
  width: 70%;
  font-weight: var(--fw-strong);
`
export const ContentUser = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  h3 {
    font-size: var(--fz-base);
    font-weight: var(--fw-strong);
  }
  div {
    font-size: var(--fz-xs);
    color: var(--black-300);
    display: flex;
    justify-content: flex-end;
    align-items: center;
    span {
      padding-left: 10px;
    }
  }
`
export const ContentConsole = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin: 30px 0 20px;
`
export const ContentFieldBox = styled.div`
  margin-bottom: 15px;
  p {
    margin-top: 7px;
    color: var(--black-300);
    font-size: var(--fz-xs);
    font-weight: var(--fw-strong);
    span {
      color: inherit;
      font-size: inherit;
      font-weight: inherit;
    }
    > .notice {
      color: var(--maincolor);
      font-weight: var(--fw-strong);
      padding-left: 10px;
    }
  }
`
export const ContentSubject = styled.h3`
  font-size: var(--fz-xs);
  color: var(--black-200);
  font-weight: var(--fw-bold);
`
export const ContentBtnWrap = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
`
export const ContentBtn = styled(ButtonSm)`
  position: relative;
  padding-right: ${(props) => props.paddingRight || '15px'};
  font-size: var(--fz-xs);
  line-height: 1.2;
  > img {
    position: absolute;
    right: 5px;
    top: 50%;
    transform: translateY(-50%);
    height: 35px;
    width: auto;
    object-fit: cover;
  }
`
export const ContentText = styled.div`
  font-size: var(--fz-sm);
  line-height: 1.5;
  border: 1px solid var(--black-200);
  border-radius: 6px;
  padding: 10px;
  min-height: 150px;
  margin-bottom: 30px;
`
export const ContentArea = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;
`
export const ContentAreaBox = styled.div`
  width: calc(50% - 5px);
  margin-right: 10px;
  margin-bottom: 20px;
  &:nth-of-type(2n) {
    margin-right: 0;
  }
  ${ContentSubject} {
    margin: 15px 0;
    position: relative;
  }
  .slide-img {
    width: 100%;
    object-fit: cover;
  }
`
export const Tooltip = styled.span`
  color: var(--navy);
  padding-left: 5px;
  font-size: var(--fz-sm);
  vertical-align: middle;
`
export const TooltipMsg = styled.p`
  position: absolute;
  font-size: 10px;
  right: 0;
  bottom: calc(100% + 5px);
  background: var(--navy);
  padding: 3px;
  border-radius: 4px;
  color: #fff;
  line-height: 1.3;
  word-break: keep-all;
  opacity: 0;
  visibility: hidden;
  ${Tooltip}:hover & {
    opacity: 1;
    visibility: visible;
  }
`
export const FriendsMenu = styled.ul`
  height: 120px;
  overflow: auto;
  li {
    font-size: var(--fz-sm);
    font-weight: var(--fw-bold);
    line-height: 1.5;
  }
`
export const MenuStatus = styled(ButtonSm)`
  width: 100%;
  height: 28px;
  margin-top: 15px;
`
export const PickupImages = styled.ul`
  position: relative;
  width: 100%;
  padding-bottom: 100%;
  height: 0;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;
  &:after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    height: 4px;
    background: #fff;
    top: 50%;
    transform: translateY(-50%);
  }
  &:before {
    content: '';
    z-index: 1;
    position: absolute;
    top: 0;
    bottom: 0;
    width: 4px;
    background: #fff;
    left: 50%;
    transform: translateX(-50%);
  }
`
export const ImageBox = styled.li`
  width: 50%;
  height: 0;
  padding-bottom: calc(50%);
  position: relative;
  overflow: hidden;
  &:nth-of-type(2n) {
    margin-right: 0;
  }
  > img {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    height: 120%;
    width: auto;
    object-fit: cover;
  }
`
