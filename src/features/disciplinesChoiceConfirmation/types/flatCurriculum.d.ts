type FlatCurriculum = Pick<
  Curriculum,
  'ID' | 'PROGRAM_NAME' | 'PROGRAM_CODE' | 'PROFILE_NAME' | 'EDUCATION_LEVEL'
> & {
  DISCIPLINES: (Omit<FlatDiscipline, 'CHOICE_STATS'> & {
    CHOICE_STATS: ChoiceStats[]
  })[]
}

type FlatDiscipline = DccDisciplineInfo & {
  BLOCK_ID: number
  BLOCK_INDEX: number
  SEMESTER: number

  INDEX_PER_BLOCK: number
  CHOICE_STATS: EntityState<ChoiceStats>
}

type ChoiceStats = {
  COURSE: number

  CHOSE_COUNT: number
  STUDENT_TOTAL: number

  GROUPS: GroupChoiceStats[]
}

type GroupChoiceStats = {
  ID: number
  NAME: string

  CHOSE_COUNT: number
  STUDENT_TOTAL: number

  CONFIRM_STATUS: ChoiceConfirmStatus
}
