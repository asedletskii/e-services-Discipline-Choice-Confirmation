import { createSlice, WithSlice } from '@reduxjs/toolkit'
import { rootReducer } from '@shared/store'
import { getDccGroupInitialState } from './dccGroup.state'
import {
  confirmStudentsChoice,
  getChoiceParams,
  getCurriculumById,
  getGroupStudents,
  setGroupConfirmStatus,
} from './dccGroup.thunks'

export const dccGroupSlice = createSlice<
  DccGroupSliceState,
  DccGroupSliceReducers,
  'dccGroup',
  any
>({
  name: 'dccGroup',
  initialState: getDccGroupInitialState(),
  reducers: {
    clearGroupState() {
      return getDccGroupInitialState()
    },

    updateTutorChoice(state, { payload }) {
      const { studentIdCard, blockId, disciplineId, tutorDiscId, chosenDisciplineIds } = payload
      const student = state.group.STUDENTS.find((s) => s.ID_CARD === studentIdCard)
      if (!student) return

      const block = student.CHOICE.find((b) => b.BLOCK_ID === blockId)
      if (!block) return

      const discipline = block.DISCIPLINES.find((d) => d.ID === disciplineId)
      if (!discipline) return

      discipline.TUTOR_DISC_ID = tutorDiscId
      block.CHOSEN_DISCIPLINE_IDS = chosenDisciplineIds
    },
  },

  extraReducers: (builder) => {
    /** Загрузка студентов группы */
    builder
      .addCase(getGroupStudents.fulfilled, (state, { payload }) => {
        state.group = payload.groupChoice
        state.finishDate = payload.finishDate
        state.isLoading = false
      })
      .addCase(getGroupStudents.rejected, (state) => {
        state.isLoading = false
      })
      .addCase(getGroupStudents.pending, (state) => {
        state.isLoading = true
      })

    /** Отправка выбора студента */
    builder
      .addCase(confirmStudentsChoice.fulfilled, (state, { meta }) => {
        meta.arg.STUDENTS.forEach((updatedStudent) => {
          const student = state.group.STUDENTS.find((s) => s.ID_CARD === updatedStudent.ID_CARD)
          if (student) {
            student.IS_CONFIRMED = updatedStudent.IS_CONFIRMED
          }
        })

        state.confirmLoadingIds = state.confirmLoadingIds.filter(
          (id) => !meta.arg.STUDENTS.some((s) => s.ID_CARD === id),
        )
      })
      .addCase(confirmStudentsChoice.rejected, (state, { meta }) => {
        state.confirmLoadingIds = state.confirmLoadingIds.filter(
          (id) => !meta.arg.STUDENTS.some((s) => s.ID_CARD === id),
        )
      })
      .addCase(confirmStudentsChoice.pending, (state, { meta }) => {
        state.confirmLoadingIds.push(...meta.arg.STUDENTS.map((s) => s.ID_CARD))
      })

    /** Получение сводной таблицы по учебному плану*/
    builder
      .addCase(getCurriculumById.fulfilled, (state, { payload }) => {
        state.curriculum = payload
        state.isCurriculumLoading = false
      })

      .addCase(getCurriculumById.rejected, (state) => {
        state.isCurriculumLoading = false
      })

      .addCase(getCurriculumById.pending, (state) => {
        state.isCurriculumLoading = true
      })

    /** Получение параметров для селектов группы и семестра */
    builder
      .addCase(getChoiceParams.fulfilled, (state, { payload }) => {
        state.ChoiceParams = payload
        state.isChoiceParamsLoading = false
      })
      .addCase(getChoiceParams.rejected, (state) => {
        state.isChoiceParamsLoading = false
      })
      .addCase(getChoiceParams.pending, (state) => {
        state.isChoiceParamsLoading = true
      })

    /** Установка/отмена фиксации  группы */
    builder
      .addCase(setGroupConfirmStatus.fulfilled, (state, { meta }) => {
        state.group.CONFIRM_STATUS = meta.arg.IS_CONFIRMED
        state.isConfirmStatusUpdating = false
      })

      .addCase(setGroupConfirmStatus.rejected, (state) => {
        state.isConfirmStatusUpdating = false
      })

      .addCase(setGroupConfirmStatus.pending, (state) => {
        state.isConfirmStatusUpdating = true
      })
  },
})

declare module '@shared/store' {
  interface AppLazySlices extends WithSlice<typeof dccGroupSlice> {}
}

dccGroupSlice.injectInto(rootReducer)

export const { clearGroupState, updateTutorChoice } = dccGroupSlice.actions
