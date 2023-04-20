/* eslint-disable */
import React, { useState } from 'react'
// import { HiChevronDown } from 'react-icons/hi2'
import { OuterWrapper } from '../styles/s-global/common'
import {
  Wrapper,
  InputContainer,
  FlexBox,
  TitleInput,
  ContentInput,
  WriteLabel,
  MapWrapper,
  SelectBox,
  WriteAlert,
  ButtonWrapper,
  AddBtn,
  OrderDeleteBtn,
} from '../styles/s-pages/write'
import Select from '../components/Select'
import WriteInput from '../components/WriteInput'
import TagList from '../components/Tag'
import Order from '../components/Order'
import Timepicker from '../components/Timepicker'
const Write = () => {
  //* api 보내는 데이터 기준 구조
  const [singleContent, setSingleContent] = useState({
    title: '',
    writer: '',
    content: '',
    // "2023-04-16T13:10:14.207Z" 형태로 만들어 줄 것
    endDateTime: '',
    totalPeopleCount: 0,
    deliveryPrice: '',
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
        quantity: '',
        price: '',
      },
    ],
  })
  const [tagContent, setTagContent] = useState('')
  // const [storeLocation, setStoreLocation] = useState({
  //   address: '',
  //   latitude: 0,
  //   longitude: 0,
  // })
  // const [pickupLocation, setPickupLocation] = useState({
  //   locationDescription: '',
  //   address: '',
  //   latitude: 0,
  //   longitude: 0,
  //   images: [],
  // })

  const handleContentInput = (key) => (e) => {
    setSingleContent({
      ...singleContent,
      [key]: e.target.value,
    })
  }
  // tag handle functions
  const handleTagContent = (e) => {
    setTagContent(e.target.value)
  }
  const submitTagContent = (e) => {
    if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
      e.preventDefault()
      const newTag = [...singleContent.tags]
      setSingleContent({
        ...singleContent,
        tags: [...newTag, tagContent],
      })
      setTagContent('')
    }
  }
  const deleteTagContent = (e, el) => {
    const newTag = [...singleContent.tags].filter((tag) => tag !== el)
    setSingleContent({
      ...singleContent,
      tags: [...newTag],
    })
  }
  // order handle function
  const handleOrderInput = (key, targetIdx) => (e) => {
    // orderList에서 idx가 같은 요소를 먼저 찾아서
    // 그 요소의 key 값을 교체한 다음에 orderList 업데이트까지 해야함
    const singleOrder = singleContent.order.filter(
      (el, index) => index === targetIdx
    )[0]
    const updateOrder = {
      ...singleOrder,
      [key]: e.target.value,
    }
    const updateList = [...singleContent.order].map((el, index) => {
      if (targetIdx === index) {
        el = updateOrder
      }
      return el
    })
    setSingleContent({
      ...singleContent,
      order: updateList,
    })
  }
  const addOrder = (e) => {
    const updateList = [
      ...singleContent.order,
      {
        menu: '',
        quantity: '',
        price: '',
      },
    ]
    setSingleContent({
      ...singleContent,
      order: updateList,
    })
  }
  const deleteOrder = (e, targetIdx) => {
    const updateList = singleContent.order.filter(
      (el, idx) => idx !== targetIdx
    )
    setSingleContent({
      ...singleContent,
      order: updateList,
    })
  }
  // address handle function
  const handleAddressInput = (category, key) => (e) => {
    //* category -> store / pickup
    // key -> address, latitude, longitude
    if (category === 'store') {
      const updatestore = {
        ...singleContent.storeLocation,
        [key]: e.target.value,
      }
      setSingleContent({
        ...singleContent,
        storeLocation: updatestore,
      })
    } else if (category === 'pickup') {
      const updatestore = {
        ...singleContent.storeLocation,
        [key]: e.target.value,
      }
      setSingleContent({
        ...singleContent,
        storeLocation: updatestore,
      })
    }
  }
  return (
    <OuterWrapper>
      <Wrapper action="#" className="write__wrapper">
        <TitleInput
          type="text"
          className="title"
          placeholder="제목"
          onChange={handleContentInput('title')}
        />
        <ContentInput
          className="content"
          placeholder="내용"
          onChange={handleContentInput('content')}
        />
        <InputContainer className="tag__container">
          <WriteInput
            title={'tag'}
            value={'카테고리'}
            inputValue={tagContent}
            inputWidth={'100%'}
            handleInput={handleTagContent}
            submitInput={submitTagContent}
          />
          <TagList
            tags={singleContent.tags}
            deleteTagContent={deleteTagContent}
          />
        </InputContainer>
        <InputContainer className="recruit__container">
          <WriteInput
            title={'delivery_price'}
            value={'배달비'}
            inputType={'number'}
            inputValue={singleContent.deliveryPrice}
            textAlign={'center'}
            handleInput={handleContentInput('deliveryPrice')}
          />
          <FlexBox className="recruit_people__wrapper">
            <WriteLabel
              htmlFor="recruit_people"
              className="recruit_people__label"
            >
              모집 인원
            </WriteLabel>
            <Select
              className="recruit_people__selet"
              min={2}
              max={10}
              defaultValue={'모집 인원 선택'}
              handleSelect={handleContentInput('totalPeopleCount')}
            />
          </FlexBox>
          <FlexBox className="recruit_endtime__wrapper">
            <WriteLabel width={'max-content'}>모집 종료 시간</WriteLabel>
            <Timepicker />
          </FlexBox>
          {singleContent.deliveryPrice && singleContent.totalPeopleCount ? (
            <WriteAlert
              id="expect_price"
              className="expect_price__data"
              role="alert"
            >
              예상 배달비는{' '}
              {parseInt(
                singleContent.deliveryPrice / singleContent.totalPeopleCount
              )}
              입니다.
            </WriteAlert>
          ) : null}
        </InputContainer>
        <InputContainer className="order__container">
          <div className="order__wrapper">
            <FlexBox className="order__label" width={'calc(90%)'}>
              <WriteLabel
                className="menu"
                htmlFor="menu"
                width={'35%'}
                justify={'center'}
                marginRight={'0'}
              >
                메뉴명
              </WriteLabel>
              <WriteLabel
                className="quantity"
                htmlFor="quantity"
                width={'25%'}
                justify={'center'}
                marginRight={'0'}
              >
                수량
              </WriteLabel>
              <WriteLabel
                className="price"
                htmlFor="price"
                width={'35%'}
                justify={'center'}
                marginRight={'0'}
              >
                가격
              </WriteLabel>
            </FlexBox>
            {singleContent.order.map((el, idx) => {
              return (
                <FlexBox
                  className="singleOrder__wrapper"
                  key={idx}
                  flex={'row'}
                >
                  <Order
                    order={el}
                    idx={idx}
                    handleOrderInput={handleOrderInput}
                  />
                  <OrderDeleteBtn onClick={(e) => deleteOrder(e, idx)}>
                    삭제
                  </OrderDeleteBtn>
                </FlexBox>
              )
            })}
          </div>
          <ButtonWrapper className="order_button__wrapper">
            <AddBtn className="new_order" onClick={addOrder}>
              +
            </AddBtn>
          </ButtonWrapper>
        </InputContainer>
        <InputContainer className="store__container">
          <WriteInput
            title={'store_address'}
            value={'지점 정보'}
            inputWidth={'100%'}
            onChange={handleContentInput('title')}
          />
          <MapWrapper className="store__map">지점 지도</MapWrapper>
        </InputContainer>
        <InputContainer className="pickup__container">
          <WriteInput
            title={'pickup_address'}
            value={'픽업 정보'}
            inputWidth={'100%'}
          />
          <MapWrapper className="pickup_address">픽업 지도</MapWrapper>
        </InputContainer>
      </Wrapper>
    </OuterWrapper>
  )
}

export default Write
