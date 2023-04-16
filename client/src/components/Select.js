/* eslint-disable */
import React from 'react'
import { SelectBox } from '../styles/s-pages/write'

const Select = ({ min, max, defaultValue }) => {
  const array = new Array(max - min + 1).fill(min)
  for (let i = 0; i <= max - min; i++) {
    array[i] += i
  }
  return (
    <SelectBox defaultValue="default">
      <option value="default" disabled>
        {defaultValue}
      </option>
      {array.map((el, idx) => {
        return (
          <option key={idx} value={el}>
            {el}
          </option>
        )
      })}
    </SelectBox>
  )
}

export default Select
