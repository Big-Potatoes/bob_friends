import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { api } from '../api/api'
import { FaQuestionCircle } from 'react-icons/fa'
import { OuterWrapper, Tag } from '../styles/s-global/common'
import {
  TagWrap,
  ContentHead,
  ContentTitle,
  ContentUser,
  ContentConsole,
  ContentFieldBox,
  ContentSubject,
  ContentBtnWrap,
  ContentBtn,
  ContentText,
  ContentArea,
  ContentAreaBox,
  Tooltip,
  TooltipMsg,
  FriendsMenu,
  MenuStatus,
  PickupImages,
  ImageBox,
} from '../styles/s-pages/content'
import PeopleCountPie from '../components/PeopleCountPie'
import MapContainer from '../components/MapContainer'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/ko'
dayjs.extend(relativeTime)
dayjs.locale('ko')

const Content = () => {
  const { id } = useParams()
  const [contentData, setContentData] = useState([])
  const [recruitEnd, setRecruitEnd] = useState(false)
  const currentTime = dayjs().format('YYYY-MM-DD HH:mm:ss')

  useEffect(() => {
    api.get(`/recruit-content/${id}`).then((res) => {
      setContentData(res.data)
      if (currentTime >= res.data.endDateTime) setRecruitEnd(true)
    })
  }, [])
  const unitCalc = (amount) => {
    amount = Math.floor(amount)
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }
  const cutSeconds = (time) => {
    return time.slice(0, -3)
  }
  const chartData = [
    {
      id: 'peopleCount',
      value: contentData.peopleCount,
      color: `var(--maincolor)`,
    },
    {
      id: 'leftPeopleCount',
      value: contentData.totalPeopleCount - contentData.peopleCount,
      color: `var(--black-100)`,
    },
  ]

  return (
    <OuterWrapper>
      <TagWrap>
        {contentData.tags &&
          contentData.tags.map((item, idx) => <Tag key={idx}>{item}</Tag>)}
      </TagWrap>
      <ContentHead>
        <ContentTitle>{contentData.title}</ContentTitle>
        <PeopleCountPie
          data={chartData}
          peopleCount={contentData.peopleCount}
          totalPeopleCount={contentData.totalPeopleCount}
        />
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
        <div>
          <ContentFieldBox>
            <ContentSubject>모집 종료 시간</ContentSubject>
            <p>
              <span>
                {contentData.endDateTime && cutSeconds(contentData.endDateTime)}
              </span>
              <span className="notice">
                {recruitEnd
                  ? '모집완료'
                  : dayjs(contentData.endDateTime).toNow()}
              </span>
            </p>
          </ContentFieldBox>
          <ContentFieldBox>
            <ContentSubject>배달비 개인 부담금</ContentSubject>
            <p>
              {contentData.deliveryPrice &&
                `${unitCalc(contentData.deliveryPrice.totalPrice)}원/${
                  contentData.totalPeopleCount
                }명 = ${unitCalc(
                  contentData.deliveryPrice.totalPrice /
                    contentData.totalPeopleCount
                )}원`}
            </p>
          </ContentFieldBox>
        </div>
        <ContentBtnWrap>
          <ContentBtn paddingRight={`10px`}>
            참여하기
            <img src="/assets/spoon.png" alt="참여하기" />
          </ContentBtn>
          <ContentBtn>
            내 친구 <br />
            초대하기
            <img src="/assets/spoons.png" alt="친구초대하기" />
          </ContentBtn>
        </ContentBtnWrap>
      </ContentConsole>
      <ContentText>{contentData.content}</ContentText>
      <ContentArea>
        <ContentAreaBox>
          <ContentSubject>지점 정보</ContentSubject>
          <MapContainer
            mapid={`map_store_${contentData.id}`}
            mapLocation={
              contentData.storeLocation && contentData.storeLocation.address
            }
            lat={
              contentData.storeLocation && contentData.storeLocation.latitude
            }
            lng={
              contentData.storeLocation && contentData.storeLocation.longitude
            }
          />
        </ContentAreaBox>
        <ContentAreaBox>
          <ContentSubject>
            밥 친구가 주문한 메뉴
            <Tooltip>
              <FaQuestionCircle />
              <TooltipMsg>
                메뉴가 고민되나요?
                <br />
                밥친구들의 주문을 확인해 보세요!
              </TooltipMsg>
            </Tooltip>
          </ContentSubject>
          <FriendsMenu>
            {contentData.menus &&
              contentData.menus.map((item, idx) => <li key={idx}>{item}</li>)}
          </FriendsMenu>
          <MenuStatus>주문 현황</MenuStatus>
        </ContentAreaBox>
        <ContentAreaBox>
          <ContentSubject>픽업 장소</ContentSubject>
          <MapContainer
            mapid={`map_pickup_${contentData.id}`}
            mapLocation={
              contentData.pickupLocation && contentData.pickupLocation.address
            }
            lat={
              contentData.pickupLocation && contentData.pickupLocation.latitude
            }
            lng={
              contentData.pickupLocation && contentData.pickupLocation.longitude
            }
          />
        </ContentAreaBox>
        <ContentAreaBox>
          <ContentSubject>픽업 장소 사진</ContentSubject>
          <PickupImages>
            {contentData.pickupLocation &&
              contentData.pickupLocation.images.map((item, idx) => (
                <ImageBox key={idx}>
                  <img src={item} alt="픽업장소사진" className="slide-img" />
                </ImageBox>
              ))}
          </PickupImages>
        </ContentAreaBox>
      </ContentArea>
    </OuterWrapper>
  )
}

export default Content
