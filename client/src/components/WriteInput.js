import React from 'react'
import { FlexBox, WriteLabel, CustomInput } from '../styles/s-pages/write'
const WriteInput = ({
  textAlign,
  title,
  value,
  inputType,
  inputWidth,
  labelWidth,
  inputValue,
  handleInput,
  submitInput,
  onClickFunc,
}) => {
  return (
    <FlexBox className={`${title}__wrapper`}>
      <WriteLabel
        className={`${title}__label`}
        htmlFor={title}
        width={labelWidth}
      >
        {value}
      </WriteLabel>
      <CustomInput
        className={`${title}__input`}
        type={inputType}
        id={title}
        value={inputValue}
        width={inputWidth}
        textAlign={textAlign}
        onChange={handleInput}
        onKeyDown={submitInput}
        onClick={onClickFunc}
      />
    </FlexBox>
  )
}

export default WriteInput
