import React from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Wrapper,
  ContentWrapper,
  Title,
  Author,
  TagContainer,
  Tag,
} from '../styles/s-components/listcontent'
import PeopleCountPie from './PeopleCountPie'
const ListContent = ({ content }) => {
  const navigate = useNavigate()
  const {
    id,
    locationDescription,
    peopleCount,
    totalPeopleCount,
    title,
    tags,
    writer,
  } = content
  const chartData = [
    {
      id: 'peopleCount',
      value: peopleCount,
      color: `var(--maincolor)`,
    },
    {
      id: 'leftPeopleCount',
      value: totalPeopleCount - peopleCount,
      color: `var(--black-100)`,
    },
  ]
  const onClickItem = (e, id) => {
    // 이 게시글의 고유 아이디 받아서 detail?id= 로 보내야함
    console.log(e, id)
    navigate(`/content/${id}`)
  }
  return (
    <Wrapper className={`content${id}`} onClick={(e) => onClickItem(e, id)}>
      <ContentWrapper className="wrapper">
        <div className="content_wrapper">
          <Title>{title}</Title>
          <div className="content_container">
            <Author>{writer}</Author>
            <span>{locationDescription}</span>
          </div>
        </div>
        <TagContainer className="tags_container">
          {tags.map((el, idx) => {
            return <Tag key={idx}>{el}</Tag>
          })}
        </TagContainer>
      </ContentWrapper>
      <PeopleCountPie
        clasName="chart"
        data={chartData}
        peopleCount={peopleCount}
        totalPeopleCount={totalPeopleCount}
      />
    </Wrapper>
  )
}

export default ListContent
