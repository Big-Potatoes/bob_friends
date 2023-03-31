import React from 'react'
import { OuterWrapper, Tag } from '../styles/s-global/common'
import { TagWrap, DetailHead, DetailUser } from '../styles/s-pages/detail'

const Detail = () => {
  return (
    <OuterWrapper>
      <TagWrap>
        <Tag>치킨</Tag>
        <Tag>또래오래</Tag>
      </TagWrap>
      <DetailHead>
        <h2>
          또래오래 같이 드실 분 감자 아파트로 오세여 사주는 건 아님 엔빵이에요
        </h2>
        <DetailUser>
          <p>수미감자칩</p>
          <div>
            <span>2023.10.10 19:00</span>
            <span>20분 전</span>
          </div>
        </DetailUser>
      </DetailHead>
    </OuterWrapper>
  )
}

export default Detail
