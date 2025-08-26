import { configureStore } from '@reduxjs/toolkit'
import exhibitorReducer from './exhibitorSlice'

export const store = configureStore({
  reducer: {
    exhibitors: exhibitorReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
