import { createSelector } from '@reduxjs/toolkit'
import { createLazySliceStateSelector } from '@shared/utils/store'
import { getDccCurriculumsInitialState } from './dccCurriculums.state'

const sliceStateSelector = createLazySliceStateSelector(
  'dccCurriculums',
  getDccCurriculumsInitialState(),
)

export const selectCurriculumsIsLoading = sliceStateSelector((state) => state.isLoading)

export const selectCurriculums = sliceStateSelector((state) => state.curriculums)

export const selectCurriculumsGroups = createSelector(selectCurriculums, (curriculums) => {
  const groupMap = new Map<number, string>()
  curriculums.forEach((curriculum) => {
    curriculum.DISCIPLINES.forEach((disc) => {
      disc.CHOICE_STATS.forEach((stat) => {
        stat.GROUPS.forEach((g) => {
          groupMap.set(g.ID, g.NAME)
        })
      })
    })
  })

  return groupMap
})
