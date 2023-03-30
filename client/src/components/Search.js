import React, { useState } from 'react'
import { InputBase } from '../styles/s-global/common'
import { Wrapper } from '../styles/s-components/search'
import { CiSearch } from 'react-icons/ci'

const Search = () => {
  const [inputValue, setInputValue] = useState('')
  const searchInputHandler = (e) => {
    setInputValue(e.target.value)
  }
  const searchHandler = (e) => {
    // input 창에 입력한 값을 가지고 get 요청 보내기
    if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
      console.log(inputValue, 'enter 이벤트!')
    }
  }

  return (
    <Wrapper className="search_container">
      <InputBase
        className="search__input"
        type="search"
        id="search_input"
        width={'100%'}
        value={inputValue}
        onChange={searchInputHandler}
        onKeyDown={searchHandler}
        placeholder="먹고 싶은 메뉴를 검색해 보세요."
      />
      <CiSearch className="search__icon" onClick={searchHandler} />
    </Wrapper>
  )
}

export default Search
