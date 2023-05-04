import styled from 'styled-components'

export const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  position: absolute;
  top: 10px;
  right: 0;
`
export const CloseButton = styled.button`
  width: 25px;
  height: 25px;
  margin: 0 10px;
  font-size: var(--fz-big);
  font-weight: var(--fw-bold);
`
export const MainWrapper = styled.div`
  width: 100%;
  height: calc(100% - 25px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`
export const MapWrapper = styled.div`
  width: 100%;
  height: 90%;
  margin-bottom: 10px;
`
