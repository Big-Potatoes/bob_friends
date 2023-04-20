import React from 'react'
import { FlexBox, CustomInput } from '../styles/s-pages/write'
const Order = ({ order, idx, handleOrderInput }) => {
  return (
    <FlexBox className="order_input__wrapper" marginBottom={'3px'}>
      <CustomInput
        id={`menu${idx}`}
        width={'35%'}
        textAlign={'center'}
        value={order.menu}
        onChange={handleOrderInput('menu', idx)}
      />
      <CustomInput
        type={'number'}
        id={`quantity${idx}`}
        width={'20%'}
        textAlign={'center'}
        value={order.quantity}
        onChange={handleOrderInput('quantity', idx)}
      />
      <CustomInput
        type={'number'}
        id={`price${idx}`}
        width={'35%'}
        textAlign={'center'}
        value={order.price}
        onChange={handleOrderInput('price', idx)}
      />
    </FlexBox>
  )
}

export default Order
