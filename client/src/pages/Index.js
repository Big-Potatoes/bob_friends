import React, { useEffect, useState } from 'react'
import { OuterWrapper } from '../styles/common'
import { MainWrapper } from '../styles'
import Search from '../components/Search'
import { api } from '../api/customAxios'
const Index = () => {
  const PAGE_SIZE = 5
  const [pageNumber, setPageNumber] = useState(1)
  const [list, setList] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    setPageNumber(1)
    api
      .get(`/recruit-contents?pageNumber=${pageNumber}&pageSize=${PAGE_SIZE}`)
      .then((res) => {
        setList(res.data.content)
        setIsLoading(false)
      })
  }, [])
  return (
    <OuterWrapper>
      <MainWrapper className="landing_page">
        <Search />
        <section className="section_container">
          <div className="write_banner">게시글 작성 배너</div>
          <ul className="content_list">
            {!isLoading ? (
              list.map((el, idx) => {
                return (
                  <li className={`content${idx + 1}`} key={idx}>
                    {el.title}
                  </li>
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
