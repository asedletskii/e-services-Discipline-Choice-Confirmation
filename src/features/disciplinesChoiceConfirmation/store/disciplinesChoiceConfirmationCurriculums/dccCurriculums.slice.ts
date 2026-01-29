import { createSlice, WithSlice } from '@reduxjs/toolkit'
import { rootReducer } from '@shared/store'
import { getDccCurriculumsInitialState } from './dccCurriculums.state'
import { getCurriculums } from './dccCurriculums.thunks'

export const dccCurriculumsSlice = createSlice<
  DccCurriculumSliceState,
  DccCurriculumSliceReducers,
  'dccCurriculums',
  any
>({
  name: 'dccCurriculums',
  initialState: getDccCurriculumsInitialState(),
  reducers: {},

  extraReducers: (builder) => {
    /** Загрузка учебных планов */
    builder
      .addCase(getCurriculums.fulfilled, (state, { payload }) => {
        state.curriculums = payload
        state.isLoading = false
      })
      .addCase(getCurriculums.rejected, (state) => {
        state.isLoading = false
      })
      .addCase(getCurriculums.pending, (state) => {
        state.isLoading = true
      })
  },
})

declare module '@shared/store' {
  interface AppLazySlices extends WithSlice<typeof dccCurriculumsSlice> {}
}

dccCurriculumsSlice.injectInto(rootReducer)
