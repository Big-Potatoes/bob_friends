import React, { useEffect, useState } from 'react'
import { OuterWrapper } from '../styles/s-global/common'
import { MainWrapper, BannerWrapper } from '../styles/s-pages/index'
import Search from '../components/Search'
import ListContent from '../components/ListContent'
import { api } from '../api/api'
const Index = () => {
  const PAGE_SIZE = 5
  const [pageNumber, setPageNumber] = useState(1)
  const [list, setList] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const scrollHandler = () => {
    setPageNumber(pageNumber + 1)
    setIsLoading(false)
  }
  useEffect(() => {
    api
      .get(`/recruit-contents?pageNumber=${pageNumber}&pageSize=${PAGE_SIZE}`)
      .then((res) => {
        setList(res.data.content)
        scrollHandler()
      })
  }, [])
  console.log('렌더링::::::::::::::::::', pageNumber, list, isLoading)
  return (
    <OuterWrapper>
      <MainWrapper className="landing_page">
        <Search />
        <section className="section_container">
          <BannerWrapper className="write_banner">
            <p>
              먹고 싶은 <strong>메뉴</strong>가 있나요?
            </p>
            <p>
              함께 먹을 <strong>친구</strong>를 찾아보세요!
            </p>
          </BannerWrapper>
          <ul className="content_list">
            {!isLoading ? (
              list.map((el, idx) => {
                return (
                  <ListContent
                    className={`content${idx + 1}`}
                    key={el.id}
                    content={el}
                  />
                )
              })
            ) : (
              <p>로딩중</p>
            )}
          </ul>
        </section>
      </MainWrapper>
    </OuterWrapper>
  )
}

export default Index
