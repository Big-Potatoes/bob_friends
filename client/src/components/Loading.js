import React from 'react'
import styled, { keyframes } from 'styled-components'

const loadingBar = keyframes`
  from {
    width: 0%;
  }
  to {
    width: 100%;
  }
`
const LoadProgress = styled.div`
  width: 150px;
  height: 10px;
  background: var(--maincolor);
  border-radius: 100px;
  animation: ${loadingBar} 1600ms 1s infinite;
`
const LoadingBar = styled.div`
  position: relative;
  width: 150px;
  height: 10px;
  background: var(--black-100);
  border-radius: 100px;
  overflow: hidden;
`
const Loading = () => {
  return (
    <LoadingBar>
      <LoadProgress />
    </LoadingBar>
  )
}

export default Loading
