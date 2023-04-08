import styled from 'styled-components'

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
  position: relative;
  margin: ${(props) => props.margin || '0px'};
`
export const AlertText = styled.p`
  width: ${(props) => props.width || 'max-content'};
  color: ${(props) => props.color || 'var(--maincolor)'};
  font-size: var(--fz-sm);
  font-weight: var(--fw-bold);
  line-height: 1.3;
  min-height: 18px;
`
