/* eslint-disable */
import React from 'react'
import { OuterWrapper, InputBase, InputLabel } from '../styles/s-global/common'
import {
  Wrapper,
  InputContainer,
  InputWrapper,
  TitleInput,
  ContentInput,
  WriteLabel,
  WriteInput,
  MapWrapper,
  SelectBox,
  ColumnBox,
} from '../styles/s-pages/write'

const Write = () => {
  return (
    <OuterWrapper>
      <Wrapper action="#" className="write__wrapper">
        <TitleInput type="text" className="title" placeholder="제목" />
        <ContentInput className="content" placeholder="내용" />
        <InputContainer className="store__container">
          <InputWrapper className="store__wrapper">
            <WriteLabel htmlFor="store__label" className="store-info">
              지점 정보
            </WriteLabel>
            <WriteInput
              type="text"
              className="store__input"
              id="store"
              width={'100%'}
            />
          </InputWrapper>
          <MapWrapper className="store__map">지점 지도</MapWrapper>
        </InputContainer>
        <InputContainer className="recruit__container">
          <ColumnBox className="first_row">
            <InputWrapper className="delivery_price">
              <WriteLabel
                htmlFor="delivery_price"
                className="delivery_price__label"
              >
                배달비
              </WriteLabel>
              <WriteInput
                type="number"
                className="delivery_price__input"
                id="delivery_price"
              />
            </InputWrapper>
            <InputWrapper className="recruit_people">
              <WriteLabel
                htmlFor="recruit_people"
                className="recruit_people__label"
              >
                모집 인원
              </WriteLabel>
              <SelectBox
                name=""
                id="recruit_people"
                className="recruit_people__select"
              >
                <option value="">모집 인원을 선택해 주세요.</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </SelectBox>
            </InputWrapper>
          </ColumnBox>
          <ColumnBox className="second_row">
            <InputWrapper className="expect_price">
              <WriteLabel
                htmlFor="expect_price"
                className="expect_price__label"
              >
                예상 개인 부담금
              </WriteLabel>
              <span id="expect_price" className="expect_price__data">
                {'20000원'}
              </span>
            </InputWrapper>
            <InputWrapper className="recruit_endtime">
              <WriteLabel>모집 종료 시간</WriteLabel>
              <SelectBox className="date_picker">
                <option value="">time1</option>
                <option value="">time2</option>
                <option value="">time3</option>
                <option value="">time4</option>
              </SelectBox>
            </InputWrapper>
          </ColumnBox>
        </InputContainer>
        <InputContainer className="pickup__container">
          <WriteLabel htmlFor="pickup_address" className="pickup_address">
            픽업 장소
          </WriteLabel>
          <WriteInput type="text" className="pickup_address" />
          <MapWrapper className="pickup_address">픽업 지도</MapWrapper>
        </InputContainer>
        <InputContainer className="order__wrapper">
          <button className="new_order">+</button>
          <div className="label">
            <WriteLabel className="menu" htmlFor="menu">
              메뉴명
            </WriteLabel>
            <WriteLabel className="quantity" htmlFor="quantity">
              수량
            </WriteLabel>
            <WriteLabel className="price" htmlFor="price">
              가격
            </WriteLabel>
          </div>
          <div className="order_input__wrapper">
            <WriteInput id="menu" />
            <WriteInput id="quantity" />
            <WriteInput id="price" />
          </div>
        </InputContainer>
      </Wrapper>
    </OuterWrapper>
  )
}

export default Write
