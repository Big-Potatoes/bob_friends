import React from 'react'
// import { BrowserRouter } from 'react-router-dom'
import './styles/global.css'
import styled from 'styled-components'

const Test = styled.div`
  color: var(--maincolor);
  font-weight: 500;
`
function App() {
  return <Test>hello world!</Test>
}

export default App
