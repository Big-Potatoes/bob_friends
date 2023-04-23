import React, { useState } from 'react'
import WriteInput from './WriteInput'
import { ModalBack, ModalContent } from '../styles/s-global/common'
import {
  ButtonWrapper,
  CloseButton,
  MainWrapper,
} from '../styles/s-components/addressmodal'
import MapContainer from './MapContainer'

const AddressModal = ({ category, handleAddressModal, handleAddressInput }) => {
  //* store, pickup 구분해서 보여주기
  const [inputValue, setInputValue] = useState('')
  const [mapAddress, setMapAddress] = useState('')
  const [keyword, setKeyword] = useState('')
  const handleAddress = (e) => {
    setInputValue(e.target.value)
  }
  const submitAddress = (e) => {
    if (e.key === 'Enter') {
      if (category === 'store') {
        setKeyword(inputValue)
        return
      }
      setMapAddress(inputValue)
    }
  }
  return (
    <ModalBack>
      <ModalContent width={'90%'} height={'60%'} justify={'flex-end'}>
        <ButtonWrapper className="button_wrapper">
          <CloseButton
            className="close_button"
            onClick={handleAddressModal('')}
          >
            X
          </CloseButton>
        </ButtonWrapper>
        <MainWrapper className="main_wrapper">
          <WriteInput
            title={`${category}_address`}
            value={'검색'}
            labelWidth={'30px'}
            inputValue={inputValue}
            inputWidth={'100%'}
            handleInput={handleAddress}
            submitInput={submitAddress}
          />
          <MapContainer
            mapid={`address`}
            address={mapAddress}
            keyword={keyword}
            marginTop={'10px'}
            isModal={true}
            handleAddressInput={handleAddressInput}
            handleAddressModal={handleAddressModal}
          />
        </MainWrapper>
      </ModalContent>
    </ModalBack>
  )
}

export default AddressModal
