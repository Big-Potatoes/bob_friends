import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { api } from '../api/api'
const initialState = {
  isLogin: false,
  userInfo: {
    id: 0,
    account: '',
    nickname: '',
    localCertification: false,
  },
}
export const getUserInfo = createAsyncThunk(
  'userSlice/getUserInfo',
  async () => {
    try {
      const response = await api.get('/auth/current')
      return response
    } catch (error) {
      console.log(error)
    }
  }
)
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLogin = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserInfo.fulfilled, (state, action) => {
      state.userInfo = action.payload.data
      state.isLogin = true
    })
  },
})
export const { login } = userSlice.actions
