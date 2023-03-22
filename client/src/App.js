import React, { useEffect, useState } from 'react'
// import { BrowserRouter } from 'react-router-dom'
import './styles/variable.css'
import { GlobalStyle } from './styles/GlobalStyle'
import Home from './pages/Home'

function App() {
  // 맨 처음 앱을 실행하면 localStorage에 접속한 기록을 남겨둠
  // 랜딩시 접속 기록이 있으면 바로 어플로 접속
  // 접속 기록이 없으면 로고 노출 페이지 보여주기
  const [flag, setFlag] = useState(localStorage.getItem('bob_fridens' || false))
  useEffect(() => {
    setFlag(localStorage.getItem('bob_friends'))
  }, [])
  return (
    <div className="app_wrap">
      <GlobalStyle />
      {!flag ? <Home setFlag={setFlag} /> : null}
    </div>
  )
}

export default App
