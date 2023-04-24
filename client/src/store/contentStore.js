import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { api } from '../api/api'

const initialState = {
  contentData: {
    id: 0,
    tags: [],
    title: '',
    writer: '',
    peopleCount: 0,
    totalPeopleCount: 0,
    createDateTime: '',
    endDateTime: '',
    content: '',
    storeLocation: {
      locationDescription: '',
      address: '',
      latitude: 0,
      longitude: 0,
    },
    pickupLocation: {
      locationDescription: '',
      address: '',
      latitude: 0,
      longitude: 0,
      images: [],
    },
    deliveryPrice: 0,
    menus: [
      {
        name: '',
        price: 0,
        count: 0,
      },
    ],
    joinUserAccounts: [],
  },
}

export const getContent = createAsyncThunk(
  'contentSlice/getContent',
  async (contentId) => {
    try {
      const response = await api.get(`/recruit-content/${contentId}`)
      return response
    } catch (error) {
      console.log(error)
    }
  }
)

export const contentSlice = createSlice({
  name: 'contentSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getContent.fulfilled, (state, action) => {
      state.contentData = action.payload.data
    })
  },
})

export const { example } = contentSlice.actions
