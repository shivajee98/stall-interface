import { configureStore } from '@reduxjs/toolkit'

// Since there are no reducers yet, we'll create a simple store
export const store = configureStore({
  reducer: {
    // Add reducers here when needed
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
