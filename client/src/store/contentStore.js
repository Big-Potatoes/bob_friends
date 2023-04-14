import { createSlice } from '@reduxjs/toolkit'

const initValue = {
  contentList: [],
  singleContent: {},
}
export const contentSlice = createSlice({
  name: 'content',
  initialState: {
    value: initValue,
  },
  reducers: {
    getList: (state, action) => {
      state.value = action.payload
    },
  },
})
