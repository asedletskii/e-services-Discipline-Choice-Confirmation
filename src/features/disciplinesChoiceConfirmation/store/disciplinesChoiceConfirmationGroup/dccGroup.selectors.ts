import { canConfirmStudent } from '@features/disciplinesChoiceConfirmation/utils'
import { createSelector } from '@reduxjs/toolkit'
import { createLazySliceStateSelector } from '@shared/utils/store'
import { getDccGroupInitialState } from './dccGroup.state'

const sliceStateSelector = createLazySliceStateSelector('dccGroup', getDccGroupInitialState())

export const selectGroupIsLoading = sliceStateSelector((state) => state.isLoading)

export const selectChoiceParamsLoading = sliceStateSelector((state) => state.isChoiceParamsLoading)

export const selectCurriculum = sliceStateSelector((state) => state.curriculum)

export const selectCurriculumIsLoading = sliceStateSelector((state) => state.isCurriculumLoading)

export const selectGroup = sliceStateSelector((state) => state.group)

export const selectChoiceParams = sliceStateSelector((state) => state.ChoiceParams)

export const selectLoadingIds = sliceStateSelector((state) => state.confirmLoadingIds)

export const selectConfirmStatus = sliceStateSelector((state) => state.group.CONFIRM_STATUS)

export const selectFinishDate = sliceStateSelector((state) => state.finishDate)

export const selectIsGroupStatusUpdating = sliceStateSelector(
  (state) => state.isConfirmStatusUpdating,
)

export const selectIsAllStudentsConfirmed = createSelector(selectGroup, (group) => {
  const result = new Array<0 | 1>()

  group.STUDENTS.map((s) => result.push(s.IS_CONFIRMED))

  return !result.some((r) => r === 0)
})

export const selectTutorChoices = (studentIdCard: number, blockId: number) =>
  createSelector(selectGroup, (group) => {
    const student = group.STUDENTS.find((s) => s.ID_CARD === studentIdCard)
    if (!student) return

    const result = student.CHOICE.find((choice) => choice.BLOCK_ID === blockId)
    if (!result) return

    return result
  })

export const selectIsCheckboxDisabled = (students: StudentChoice[]) =>
  createSelector(
    selectConfirmStatus,
    selectIsGroupStatusUpdating,
    (confirmStatus, isGroupStatusLoading) => {
      return !!confirmStatus || students.every((s) => !canConfirmStudent(s)) || isGroupStatusLoading
    },
  )

export const selectIsCheckboxLoading = (students: StudentChoice[]) =>
  createSelector(selectLoadingIds, (loadingIds) => {
    return students.length === 1 ? loadingIds.includes(students[0].ID_CARD) : loadingIds.length > 0
  })
