import styled from 'styled-components'
import { InputBase, InputLabel } from '../s-global/common'
import { AlertText } from './join'

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
export const CustomInput = styled(InputBase)`
  width: ${(props) => props.width || '150px'};
  height: 26.5px;
  text-align: ${(props) => props.textAlign || 'start'};
`
export const WriteLabel = styled(InputLabel)`
  display: flex;
  align-items: center;
  width: ${(props) => props.width || '80px'};
  height: 30px;
  font-size: var(--fz-sm);
  margin-right: ${(props) => props.marginRight || '10px'};
  justify-content: ${(props) => props.justify || 'flex-start'};
`
export const InputContainer = styled.div`
  padding: 10px 0;
  display: flex;
  flex-direction: ${(props) => props.flex || 'column'};
  border-bottom: 1px solid var(--black-100);
`
export const FlexBox = styled.div`
  display: flex;
  align-items: center;
  width: ${(props) => props.width || '100%'};
  justify-content: ${(props) => props.justify || 'space-between'};
  margin-bottom: ${(props) => props.marginBottom || '0'};
  min-height: ${(props) => props.minHeight || '0'};
  position: ${(props) => props.position || ''};
`
export const MapWrapper = styled.div`
  width: 100%;
  height: 100px;
  margin-top: 5px;
  background-color: green;
`
export const SelectBox = styled.select`
  width: 150px;
  height: auto;
  padding: 3px 10px;
  border: 1px solid var(--black-100);
  border-radius: 5px;
  font-size: var(--fz-sm);
  line-height: 1.3;
  text-align: center;
`
export const WriteAlert = styled(AlertText)`
  width: auto;
  text-align: center;
  margin-top: 10px;
`
export const AddBtn = styled.button`
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: var(--maincolor);
  color: white;
  font-size: var(--fz-lg);
  font-weight: var(--fw-bold);
`
export const OrderDeleteBtn = styled.button`
  width: 10%;
  height: 25px;
  color: var(--black-300);
  font-size: var(--fz-xs);
`
export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 7px;
  width: 90%;
`
