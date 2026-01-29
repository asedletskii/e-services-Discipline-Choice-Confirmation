type DccGroupSliceState = {
  group: GroupChoice
  isLoading: boolean

  /** Флаг загрузки селектов */
  isChoiceParamsLoading: boolean
  /** Данные для селектов группы/семестра */
  ChoiceParams: ChoiceRequestParams

  /** Сводная таблица */
  curriculum: FlatCurriculum
  /** Флаг загрузки сводной таблицы */
  isCurriculumLoading: boolean

  /** Флаг обновления статуса группы */
  isConfirmStatusUpdating: boolean

  /** Массив IdCards студентов, для которых происходит запрос на подтверждение выбора */
  confirmLoadingIds: number[]

  finishDate: FinishDate
}

type DccGroupSliceReducers = SliceCaseReducers<DccGroupSliceState> & {
  /** Очистка при выходе со страницы */
  clearGroupState(state: DccGroupSliceState): void

  /** Обновление выбора дисциплин у конкретного студента в конкретном блоке */
  updateTutorChoice(
    state: DccGroupSliceState,
    action: PayloadAction<{
      studentIdCard: number
      blockId: number
      disciplineId: number
      tutorDiscId: number | null
      chosenDisciplineIds: (number | null)[]
    }>,
  ): void
}
