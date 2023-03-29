import React from 'react'
import {
  Wrapper,
  ContentWrapper,
  Title,
  Author,
  TagContainer,
  Tag,
  PeopleCountWrapper,
  ChartWrapper,
  CountNum,
} from '../styles/listcontent'
import PeopleCountPie from './PeopleCountPie'
const ListContent = ({ content }) => {
  const {
    id,
    locationDescription,
    peopleCount,
    totalPeopleCount,
    title,
    tags,
    writer,
  } = content
  const data = [
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
  return (
    <Wrapper className={`content${id}`}>
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
      <PeopleCountWrapper className="people_count">
        <ChartWrapper className="chart_wrapper">
          <PeopleCountPie clasName="chart" data={data} />
          <CountNum className="chart_summary">{`${peopleCount}/${totalPeopleCount}`}</CountNum>
        </ChartWrapper>
      </PeopleCountWrapper>
    </Wrapper>
  )
}

export default ListContent
