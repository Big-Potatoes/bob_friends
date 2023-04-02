import React, { useEffect, useState, useRef } from 'react'
import { OuterWrapper } from '../styles/s-global/common'
import {
  MainWrapper,
  BannerWrapper,
  TargetWrapper,
} from '../styles/s-pages/index'
import Search from '../components/Search'
import ListContent from '../components/ListContent'
import { api } from '../api/api'
import { Oval } from 'react-loader-spinner'
const Index = () => {
  const PAGE_SIZE = 5
  const pageEnd = useRef()
  const [page, setPage] = useState(1)
  const [pins, setPins] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const fetchPins = (page) => {
    api
      .get(`/recruit-contents?pageNumber=${page}&pageSize=${PAGE_SIZE}`)
      .then((res) => {
        // console.log('응답 데이터 ::::::', res.data)
        //* page가 첫 페이지일 때
        if (res.data.first) {
          setPins(res.data.content)
        } else setPins((prev) => [...prev, ...res.data.content])
        //* 마지막 page 일 때
        if (res.data.last) {
          setIsLoading(true)
        } else setIsLoading(false)
      })
  }
  const loadMore = () => {
    setPage((prev) => prev + 1)
  }
  useEffect(() => {
    if (!isLoading) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            loadMore()
          }
        },
        { threshold: 1 }
      )
      // 옵저버 탐색 시작
      observer.observe(pageEnd.current)
      return () => observer && observer.disconnect()
    }
  }, [isLoading])
  useEffect(() => {
    fetchPins(page)
  }, [page])
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
            {pins.length !== 0 ? (
              pins.map((el, idx) => {
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
            <TargetWrapper className="target" ref={pageEnd}>
              <Oval
                width={40}
                height={40}
                color={'var(--black-100)'}
                ariaLabel="loading"
                secondaryColor={'var(--black-200)'}
                strokeWidth={3}
                strokeWidthSecondary={3}
              />
            </TargetWrapper>
          </ul>
        </section>
      </MainWrapper>
    </OuterWrapper>
  )
}

export default Index
