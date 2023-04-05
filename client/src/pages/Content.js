/* eslint-disable */
import React, { useEffect, useState } from 'react'
import { api } from '../api/api'
import { OuterWrapper, Tag, ButtonSm } from '../styles/s-global/common'
import {
  TagWrap,
  ContentHead,
  ContentTitle,
  ContentUser,
  ContentConsole,
  ContentField,
  ContentFieldBox,
  ContentBtnWrap,
  ContentText,
} from '../styles/s-pages/content'
import {
  PeopleCountWrapper,
  ChartWrapper,
  CountNum,
} from '../styles/s-components/listcontent'
import PeopleCountPie from '../components/PeopleCountPie'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/ko'
dayjs.extend(relativeTime)
dayjs.locale('ko')

const Content = () => {
  const data = [
    {
      id: 'peopleCount',
      value: 3,
      color: `var(--maincolor)`,
    },
    {
      id: 'leftPeopleCount',
      value: 1,
      color: `var(--black-100)`,
    },
  ]
  const [id] = useState(1)
  const [contentData, setContentData] = useState([])
  const [tags, setTags] = useState([])
  const [deliveryPrice, setDeliveryPrice] = useState(0)
  const [endTime, setEndTime] = useState('')
  const [totalPeople, setTotalPeople] = useState(0)
  const [recruitEnd, setRecruitEnd] = useState(false)
  const currentTime = dayjs().format('YYYY-MM-DD HH:mm:ss')

  useEffect(() => {
    api.get(`/recruit-content/${id}`).then((res) => {
      setContentData(res.data)
      setTags(res.data.tags)
      setEndTime(res.data.endDateTime)
      setDeliveryPrice(res.data.deliveryPrice.totalPrice)
      setTotalPeople(res.data.deliveryPrice.peopleCount)
      if (currentTime >= endTime) setRecruitEnd(true)
    })
  }, [])
  const unitCalc = (amount) => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }
  const cutSeconds = (time) => {
    return time.slice(0, -3)
  }

  console.log(contentData)

  return (
    <OuterWrapper>
      <TagWrap>
        {tags.map((item, idx) => (
          <Tag key={idx}>{item}</Tag>
        ))}
      </TagWrap>
      <ContentHead>
        <ContentTitle>{contentData.title}</ContentTitle>
        <PeopleCountWrapper className="people_count">
          <ChartWrapper className="chart_wrapper">
            <PeopleCountPie clasName="chart" data={data} />
            <CountNum className="chart_summary">{`3/4`}</CountNum>
          </ChartWrapper>
        </PeopleCountWrapper>
      </ContentHead>
      <ContentUser>
        <h3>{contentData.writer}</h3>
        <div>
          <p>
            {contentData.createDateTime &&
              cutSeconds(contentData.createDateTime)}
          </p>
          <span>{dayjs(contentData.createDateTime).fromNow()}</span>
        </div>
      </ContentUser>
      <ContentConsole>
        <ContentField>
          <ContentFieldBox>
            <span>모집 종료 시간</span>
            <p>
              <span>{cutSeconds(endTime)}</span>
              <span className="notice">
                {recruitEnd ? '모집완료' : dayjs(endTime).toNow()}
              </span>
            </p>
          </ContentFieldBox>
          <ContentFieldBox>
            <span>배달비 개인 부담금</span>
            <p>{`${unitCalc(deliveryPrice)}원/${totalPeople}명 = ${unitCalc(
              deliveryPrice / totalPeople
            )}원`}</p>
          </ContentFieldBox>
        </ContentField>
        <ContentBtnWrap>
          <ButtonSm>참여하기</ButtonSm>
          <ButtonSm>
            내 친구 <br />
            초대하기
          </ButtonSm>
        </ContentBtnWrap>
      </ContentConsole>
      <ContentText>{contentData.content}</ContentText>
    </OuterWrapper>
  )
}

export default Content
