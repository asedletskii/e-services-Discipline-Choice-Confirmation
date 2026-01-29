import { configureStore, createListenerMiddleware, UnknownAction } from '@reduxjs/toolkit'
import { rootReducer } from './rootReducer'

const resettableRootReducer = (
  state: ReturnType<typeof rootReducer> | undefined,
  action: UnknownAction,
) => {
  if (action?.type === 'store/reset') {
    return rootReducer({}, action)
  }

  return rootReducer(state, action)
}

export const draftsListenerMiddleware = createListenerMiddleware()
export const slicesListenerMiddleware = createListenerMiddleware()

export const store = configureStore({
  reducer: resettableRootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ immutableCheck: false, serializableCheck: false }).prepend(
      draftsListenerMiddleware.middleware,
      slicesListenerMiddleware.middleware,
    ),
})

export const getState = store.getState
export const dispatch = store.dispatch
