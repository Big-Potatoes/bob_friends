/* eslint-disable */
import React, { useState } from 'react'
import {
  PartyWrap,
  PartyContent,
  PartyModalClose,
  MenuTable,
  MenuInput,
  OrderBox,
  MenuList,
  MenuSum,
  TotalSum,
} from '../styles/s-components/partymodal'
import { IoClose } from 'react-icons/io5'

const PartyModal = ({ partyModalOpen, setPartyModalOpen }) => {

  return (
    <PartyWrap className={partyModalOpen ? 'modalopen' : null}>
      <PartyContent>
        <PartyModalClose onClick={() => setPartyModalOpen(!partyModalOpen)}>
          <IoClose />
        </PartyModalClose>
        <OrderBox>
          <h2>MENU</h2>
          <MenuTable>
            <MenuList>
              <div>
                <MenuInput />
              </div>
              <span>
                <MenuInput type="number" min="1" />
              </span>
              <p>
                <MenuInput type="number" min="0" />
              </p>
            </MenuList>
            <MenuList>
              <div>asfasd</div>
              <span>1</span>
              <p>8,000원</p>
            </MenuList>
            <MenuList>
              <div>제로콜라</div>
              <span>13</span>
              <p>120,000원</p>
            </MenuList>
          </MenuTable>
          <MenuSum>
            <li>
              <span>메뉴 합계</span>
              <p>128,000원</p>
            </li>
            <li>
              <span>배달 부담금</span>
              <span>2,050원</span>
            </li>
          </MenuSum>
          <TotalSum>
            <p>결제하실 포인트</p>
            <p>130,050원</p>
          </TotalSum>
        </OrderBox>
      </PartyContent>
    </PartyWrap>
  )
}

export default PartyModal
