import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './styles/variable.css'
import { GlobalStyle } from './styles/GlobalStyle'
import Home from './pages/Home'
import Join from './pages/Join'
import Header from './components/Header'
import Nav from './components/Nav'
import Index from './pages/Index'

function App() {
  // 맨 처음 앱을 실행하면 localStorage에 접속한 기록을 남겨둠
  // 랜딩시 접속 기록이 있으면 바로 어플로 접속
  // 접속 기록이 없으면 로고 노출 페이지 보여주기
  const [flag, setFlag] = useState(localStorage.getItem('bob_fridens' || false))
  useEffect(() => {
    setFlag(localStorage.getItem('bob_friends'))
  }, [])
  return (
    <BrowserRouter>
      <div className="app_wrap">
        <GlobalStyle />
        {!flag ? (
          <Home setFlag={setFlag} />
        ) : (
          <>
            <Header>여기 헤더</Header>
            <Routes>
              <Route path="/join" element={<Join />} />
              <Route path="/" element={<Index />} />
            </Routes>
            <Nav />
          </>
        )}
      </div>
    </BrowserRouter>
  )
}

export default App
