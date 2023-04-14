import React, { useEffect, useState, useRef } from 'react'
import { OuterWrapper } from '../styles/s-global/common'
import {
  MainWrapper,
  BannerWrapper,
  TargetWrapper,
  EmptyContainer,
} from '../styles/s-pages/index'
import Search from '../components/Search'
import ListContent from '../components/ListContent'
import { api } from '../api/api'
import { Oval } from 'react-loader-spinner'
const Index = () => {
  useEffect(() => {
    api
      .get('/auth/current')
      .then((res) => console.log('유저 정보 성공', res))
      .catch((error) => console.log('실패::::::', error))
  }, [])
  const PAGE_SIZE = 5
  const pageEnd = useRef()
  const [page, setPage] = useState(1)
  const [pins, setPins] = useState([])
  const [loading, setLoading] = useState(false)
  const [isEmpty, setIsEmpty] = useState(true)
  const fetchPins = (page) => {
    api
      .get(`/recruit-contents?pageNumber=${page}&pageSize=${PAGE_SIZE}`)
      .then((res) => {
        // console.log('응답 데이터 ::::::', res.data)
        //* 검색어, 지역 등에 해당하는 데이터가 없을 때
        setIsEmpty(res.data.numberOfElements === 0)
        //* page가 첫 페이지일 때
        if (res.data.first) {
          setPins(res.data.content)
        } else setPins((prev) => [...prev, ...res.data.content])
        //* 마지막 page 일 때
        if (res.data.last) {
          setLoading(false)
        } else setLoading(true)
      })
  }
  const loadMore = () => {
    setPage((prev) => prev + 1)
  }
  useEffect(() => {
    if (loading) {
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
  }, [loading])
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
            {!isEmpty ? (
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
              <EmptyContainer className="empty_container">
                <p>등록된 게시글이 없습니다. 🥲</p>
                <p>첫 번째 게시글의 주인공이 되어보세요!</p>
              </EmptyContainer>
            )}
          </ul>
          <TargetWrapper
            className={`target ${!loading ? 'none' : null}`}
            ref={pageEnd}
          >
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
        </section>
      </MainWrapper>
    </OuterWrapper>
  )
}

export default Index
