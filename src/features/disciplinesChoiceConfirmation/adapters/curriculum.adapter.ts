import { createEntityAdapter } from '@reduxjs/toolkit'

export const disciplinesAdapter = createEntityAdapter<FlatDiscipline, string>({
  selectId: ({ ID, BLOCK_ID }) => selectDisciplineEntityId(ID, BLOCK_ID),
  sortComparer: (a, b) =>
    a.BLOCK_INDEX - b.BLOCK_INDEX ||
    a.INDEX_PER_BLOCK - b.INDEX_PER_BLOCK ||
    a.SEMESTER - b.SEMESTER,
})

export function selectDisciplineEntityId(discipline: number, blockId: number) {
  return `${blockId}-${discipline}`
}

export const { selectById: selectDisciplineById, selectAll: selectDisciplinesAll } =
  disciplinesAdapter.getSelectors()

export const choiceStatsAdapter = createEntityAdapter<ChoiceStats, number>({
  selectId: ({ COURSE }) => COURSE,
  sortComparer: (a, b) => a.COURSE - b.COURSE,
})

export const { selectById: selectChoiceStatsByCourse, selectAll: selectChoiceStatsAll } =
  choiceStatsAdapter.getSelectors()
