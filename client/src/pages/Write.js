/* eslint-disable */
import React, { useState } from 'react'
import { HiChevronDown } from 'react-icons/hi2'
import { OuterWrapper } from '../styles/s-global/common'
import {
  Wrapper,
  InputContainer,
  FlexBox,
  TitleInput,
  ContentInput,
  WriteLabel,
  WriteInput,
  MapWrapper,
  SelectBox,
  WriteAlert,
  ButtonWrapper,
  AddButton,
} from '../styles/s-pages/write'
import Select from '../components/Select'

const Write = () => {
  const [content, setContent] = useState({
    title: '',
    writer: '',
    content: '',
    // "2023-04-16T13:10:14.207Z" 형태로 만들어 줄 것
    endDateTime: '',
    totalPeopleCount: 0,
    deliveryPrice: 0,
    tags: [],
    storeLocation: {
      address: '',
      latitude: 0,
      longitude: 0,
    },
    pickupLocation: {
      locationDescription: '',
      address: '',
      latitude: 0,
      longitude: 0,
      images: [],
    },
    order: [
      {
        menu: '',
        quantity: 0,
        price: 0,
      },
    ],
  })
  const [storeLocation, setStoreLocation] = useState({
    address: '',
    latitude: 0,
    longitude: 0,
  })
  const [pickupLocation, setPickupLocation] = useState({
    locationDescription: '',
    address: '',
    latitude: 0,
    longitude: 0,
    images: [],
  })
  const [order, setOrder] = useState([
    {
      menu: '',
      quantity: 0,
      price: 0,
    },
  ])
  const handleContentInput = (key) => (e) => {
    const handleKey = (key) => {
      // storeLocation, pickupLocation, deliveryPrice, order
    }
    setContent({
      ...content,
      [key]: e.target.value,
    })
  }
  return (
    <OuterWrapper>
      <Wrapper action="#" className="write__wrapper">
        <TitleInput type="text" className="title" placeholder="제목" />
        <ContentInput className="content" placeholder="내용" />
        <InputContainer className="tag__container">
          <FlexBox className="tag__wrapper">
            <WriteLabel className="tag__label" htmlFor="tag" width={'80px'}>
              카테고리
            </WriteLabel>
            <WriteInput className="tag__input" id="tag" width={'100%'} />
          </FlexBox>
        </InputContainer>
        <InputContainer className="recruit__container">
          <FlexBox className="delivery_fee">
            <WriteLabel
              htmlFor="delivery_price"
              className="delivery_price__label"
            >
              배달비
            </WriteLabel>
            <WriteInput
              type="number"
              className="delivery_fee__input"
              id="delivery_fee"
              onChange={handleContentInput('deliveryPrice')}
            />
          </FlexBox>
          <FlexBox className="recruit_people">
            <WriteLabel
              htmlFor="recruit_people"
              className="recruit_people__label"
            >
              모집 인원
            </WriteLabel>
            <Select min={2} max={10} defaultValue={'모집 인원 선택'} />
          </FlexBox>
          <FlexBox className="recruit_endtime">
            <WriteLabel>모집 종료 시간</WriteLabel>
            <SelectBox className="date_picker">
              <option value="">time1</option>
              <option value="">time2</option>
              <option value="">time3</option>
              <option value="">time4</option>
            </SelectBox>
          </FlexBox>
          <WriteAlert id="expect_price" className="expect_price__data">
            예상 배달비는 {'20000원'}입니다.
          </WriteAlert>
        </InputContainer>
        <InputContainer className="order__container" flex={'row'}>
          <ButtonWrapper className="button__wrapper">
            <AddButton className="new_order">+</AddButton>
          </ButtonWrapper>
          <div className="order__wrapper">
            <FlexBox className="order__label">
              <WriteLabel
                className="menu"
                htmlFor="menu"
                width={'30%'}
                justify={'center'}
                mgr={'0'}
              >
                메뉴명
              </WriteLabel>
              <WriteLabel
                className="quantity"
                htmlFor="quantity"
                width={'20%'}
                justify={'center'}
                mgr={'0'}
              >
                수량
              </WriteLabel>
              <WriteLabel
                className="price"
                htmlFor="price"
                width={'30%'}
                justify={'center'}
                mgr={'0'}
              >
                가격
              </WriteLabel>
            </FlexBox>
            <FlexBox className="order_input__wrapper">
              <WriteInput id="menu" width={'30%'} />
              <WriteInput id="quantity" width={'20%'} />
              <WriteInput id="price" width={'30%'} />
            </FlexBox>
          </div>
        </InputContainer>
        <InputContainer className="store__container">
          <FlexBox className="store__wrapper">
            <WriteLabel htmlFor="store" className="store__label" width={'80px'}>
              지점 정보
            </WriteLabel>
            <WriteInput
              type="text"
              className="store__address"
              id="store"
              width={'100%'}
            />
          </FlexBox>
          <MapWrapper className="store__map">지점 지도</MapWrapper>
        </InputContainer>
        <InputContainer className="pickup__container">
          <FlexBox className="pickup__wrapper">
            <WriteLabel htmlFor="pickup" className="pickup_info" width={'80px'}>
              픽업 장소
            </WriteLabel>
            <WriteInput
              type="text"
              className="pickup_address"
              id="pickup"
              width={'100%'}
            />
          </FlexBox>
          <MapWrapper className="pickup_address">픽업 지도</MapWrapper>
        </InputContainer>
      </Wrapper>
    </OuterWrapper>
  )
}

export default Write
