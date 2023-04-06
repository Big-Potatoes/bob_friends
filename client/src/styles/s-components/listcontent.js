import styled from 'styled-components'

export const Wrapper = styled.li`
  width: 100%;
  height: 100px;
  /* background: gray; */
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 10px;
  padding: 0 10px;
`
export const ContentWrapper = styled.div`
  display: flex;
  width: 70%;
  flex-direction: column;
  height: 100%;
  justify-content: space-evenly;
`
export const Title = styled.h4`
  font-size: var(--fz-big);
  font-weight: var(--fw-bold);
  margin-bottom: 5px;
`
export const Author = styled.span`
  color: var(--black-200);
  margin-right: 5px;
`
export const TagContainer = styled.div`
  display: flex;
  align-items: center;
`
export const Tag = styled.span`
  background: var(--skyblue);
  border-radius: 20px;
  padding: 5px;
  min-width: 40px;
  margin-right: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: var(--fz-xs);
  font-weight: var(--fw-bold);
`
