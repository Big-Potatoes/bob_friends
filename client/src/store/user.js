import { createSlice } from '@reduxjs/toolkit'

const initValue = {
  isLogin: false,
  userInfo: {
    id: 0,
    account: '',
    nickname: '',
    localCertification: false,
  },
}
export const userSlice = createSlice({
  name: 'user',
  initialState: {
    value: initValue,
  },
  reducers: {
    login: (state, action) => {
      state.value = action.payload
    },
    getuserInfo: (state, action) => {
      state.value = action.payload
    },
  },
})
