import { configureStore, createSlice } from '@reduxjs/toolkit'
import { contentSlice } from './contentStore'
// useState 와 비슷한 역할
// createSlice({
//     name: 'state이름',
//     initialState:'값'
// })

const stock = createSlice({
  name: 'user',
  initialState: [
    {
      p_id: 0,
      brand: '드롭드롭드롭',
      title: '소프트쉬폰 커튼 SAILING TO THE FOREST',
      cost: '84,000',
      deliveryFee: '3000',
    },
  ],
})

export default configureStore({
  // state 등록
  reducer: {
    // 작명: user.reducer
    // user: user.reducer,
    stock: stock.reducer,
    content: contentSlice,
  },
})
