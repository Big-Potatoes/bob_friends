import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { contentSlice } from './contentStore'
import { userSlice } from './userStore'

export default configureStore({
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
  reducer: {
    contentSlice: contentSlice.reducer,
    userSlice: userSlice.reducer,
  },
})
