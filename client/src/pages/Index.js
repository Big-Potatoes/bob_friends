import React from 'react'
import { OuterWrapper } from '../styles/common'
import { MainWrapper } from '../styles'
import Search from '../components/Search'

const Index = () => {
  return (
    <OuterWrapper>
      <MainWrapper className="landing_page">
        <Search />
        <section className="section_container">
          <div className="write_banner">게시글 작성 배너</div>
          <ul className="content_list">
            <li className="content1">게시글1</li>
            <li className="content2">게시글2</li>
            <li className="content3">게시글3</li>
            <li className="content3">게시글3</li>
          </ul>
        </section>
      </MainWrapper>
    </OuterWrapper>
  )
}

export default Index
