import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { contentSlice } from './contentStore'

export default configureStore({
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
  reducer: {
    contentSlice: contentSlice.reducer,
  },
})
