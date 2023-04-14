import styled from 'styled-components'
import { InputBase, InputLabel } from '../s-global/common'

export const Wrapper = styled.form`
  display: flex;
  flex-direction: column;
`
export const TitleInput = styled(InputBase)`
  border: none;
  border-radius: 0;
  border-bottom: 1px solid var(--black-100);
  width: ${(props) => props.width || '100%'};
  height: auto;
  padding: 10px 0;
  font-size: var(--fz-sm);
  &::placeholder {
    color: var(--black-200);
    font-weight: var(--fw-bold);
  }
`
export const ContentInput = styled.textarea`
  width: 100%;
  height: 200px;
  padding: 10px 0;
  border: none;
  border-bottom: 1px solid var(--black-100);
  font-size: var(--fz-sm);
  line-height: 1.3;
  &::placeholder {
    color: var(--black-200);
    font-weight: var(--fw-bold);
  }
`
export const WriteInput = styled(InputBase)`
  width: ${(props) => props.width || '100%'};
  height: auto;
`

export const WriteLabel = styled(InputLabel)`
  font-size: var(--fz-sm);
  border: 1px solid black;
  width: ${(props) => props.width || '120px'};
`

export const InputContainer = styled.div`
  padding: 10px 0;
  display: flex;
  flex-direction: ${(props) => props.flex || 'column'};
  /* border: 1px solid black; */
  border-bottom: 1px solid var(--black-100);
`
export const InputWrapper = styled.div`
  display: flex;
  align-items: center;
`
export const ColumnBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
`
export const MapWrapper = styled.div`
  width: 100%;
  height: 100px;
  margin-top: 5px;
  background-color: green;
`
export const SelectBox = styled.select`
  font-size: var(--fz-sm);
  height: 30px;
`
