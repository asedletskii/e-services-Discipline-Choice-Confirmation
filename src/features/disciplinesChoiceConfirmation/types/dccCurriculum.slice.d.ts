type DccCurriculumSliceState = {
  curriculums: FlatCurriculum[]
  isLoading: boolean
}

type DccCurriculumSliceReducers = SliceCaseReducers<DccCurriculumSliceState>