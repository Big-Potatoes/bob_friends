import styled from 'styled-components'
import { Tag } from '../s-global/common'

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
  margin: 30px 0;
`
export const ContentField = styled.div``
export const ContentFieldBox = styled.div`
  margin-bottom: 15px;
  span {
    font-size: var(--fz-xs);
    color: var(--black-200);
  }
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
export const ContentBtnWrap = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
`
export const ContentText = styled.div`
  font-size: var(--fz-base);
  line-height: 1.5;
  border: 1px solid var(--black-200);
  border-radius: 6px;
  padding: 15px;
  min-height: 200px;
`
