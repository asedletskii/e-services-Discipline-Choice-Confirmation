import { createSlice, WithSlice } from '@reduxjs/toolkit'
import { rootReducer } from '@shared/store'
import { getDccInitialState } from './disciplinesChoiceConfirmation.state'
import { getDссServicesAvailability } from './disciplinesChoiceConfirmation.thunks'

export const dccSlice = createSlice({
  name: 'dccAvailability',
  initialState: getDccInitialState(),
  reducers: {},

  extraReducers: (builder) => {
    /** Проверка доступности сервиса */
    builder
      .addCase(getDссServicesAvailability.fulfilled, (state, { payload }) => {
        state.isServiceAvailable = payload
        state.isLoading = false
      })
      .addCase(getDссServicesAvailability.rejected, (state) => {
        state.isLoading = false
      })
      .addCase(getDссServicesAvailability.pending, (state) => {
        state.isLoading = true
      })
  },
})

declare module '@shared/store' {
  interface AppLazySlices extends WithSlice<typeof dccSlice> {}
}

dccSlice.injectInto(rootReducer)