import styled from 'styled-components'
import { Tag } from '../s-global/common'

export const TagWrap = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;
  ${Tag} {
    margin-right: 5px;
  }
`
export const DetailHead = styled.div`
  h2 {
    font-size: var(--fz-lg);
    font-weight: var(--fw-strong);
    margin: 15px 0 20px;
  }
`
export const DetailUser = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  p {
    font-size: var(--fz-sm);
    font-weight: var(--fw-strong);
  }
  div {
    flex: none;
  }
  span {
    font-size: var(--fz-xs);
    color: var(--black-200);
    padding-left: 10px;
  }
`
