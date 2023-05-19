import styled from 'styled-components'
export const MapWrapper = styled.div`
  width: 100%;
  height: 100%;
`
export const MapBox = styled.div`
  width: 100%;
  padding-bottom: 100%;
  height: 0;
  &.halfHeight {
    padding-bottom: 50%;
  }
  &.modal {
    //modal 창 안에서의 사이즈 정해주기
    padding-bottom: 0;
    width: 100%;
    height: 100%;
    margin-top: 10px;
  }
  &.result {
    //크기 조정하기
    padding-bottom: 0;
    width: 100%;
    height: 50%;
  }
`
export const MenuWrapper = styled.div`
  padding: 5px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
`
export const ResultTitle = styled.h4`
  font-weight: var(--fw-bold);
  padding: 5px 0;
  text-align: center;
`
export const AlertText = styled.p`
  margin-top: 10px;
  min-height: 15px;
  text-align: center;
  color: var(--black-200);
`
export const MenuList = styled.ul`
  display: flex;
  flex-direction: column;
  height: 130px;
  overflow-y: auto;
  /* border: 1px solid red; */
  font-size: var(--fz-sm);
  padding: 10px;
`
export const Pagination = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-top: 20px;
`
