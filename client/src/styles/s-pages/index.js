import styled from 'styled-components'

export const MainWrapper = styled.div`
  width: 100%;
`
export const BannerWrapper = styled.div`
  width: 100%;
  height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  background: var(--navy);
  color: white;
  font-weight: var(--fw-bold);
  line-height: 1.3;
`
export const TargetWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  &.none {
    display: none;
  }
`
export const EmptyContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 1.5;
  height: calc(100vh - 50px - 50px - 45px - 160px - 80px);
`
