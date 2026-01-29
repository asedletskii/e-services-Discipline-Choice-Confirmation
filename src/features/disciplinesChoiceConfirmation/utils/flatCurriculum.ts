import {
  choiceStatsAdapter,
  disciplinesAdapter,
  selectChoiceStatsAll,
  selectChoiceStatsByCourse,
  selectDisciplineById,
  selectDisciplineEntityId,
  selectDisciplinesAll,
} from '@features/disciplinesChoiceConfirmation/adapters'

const emptyChoiceStats: ChoiceStats = {
  COURSE: 0,
  CHOSE_COUNT: 0,
  STUDENT_TOTAL: 0,
  GROUPS: [],
}

export function flatCurriculumData(curriculum: Curriculum): FlatCurriculum {
  const flatDisciplines = curriculum.BLOCKS.flatMap((block, blockI) => {
    return block.DISCIPLINES.map<FlatDiscipline>((discipline, disciplineI) => ({
      ...discipline,
      BLOCK_ID: block.ID,
      BLOCK_INDEX: blockI,
      INDEX_PER_BLOCK: disciplineI,
      SEMESTER: block.SEMESTER,

      CHOICE_STATS: choiceStatsAdapter.getInitialState(),
    }))
  })

  let disciplines = disciplinesAdapter.setAll(disciplinesAdapter.getInitialState(), flatDisciplines)

  const groupsChoices = curriculum.GROUPS_CHOICES.slice().sort((a, b) =>
    a.NAME.localeCompare(b.NAME),
  )

  groupsChoices.forEach((group) => {
    group.CHOICES.forEach((groupChoice) => {
      const disciplineEntityId = selectDisciplineEntityId(
        groupChoice.DISCIPLINE_ID,
        groupChoice.BLOCK_ID,
      )
      const discipline = selectDisciplineById(disciplines, disciplineEntityId)

      const choiceStats =
        selectChoiceStatsByCourse(discipline.CHOICE_STATS, group.COURSE) ?? emptyChoiceStats

      disciplines = disciplinesAdapter.updateOne(disciplines, {
        id: disciplineEntityId,
        changes: {
          CHOICE_STATS: choiceStatsAdapter.upsertOne(discipline.CHOICE_STATS, {
            COURSE: group.COURSE,
            CHOSE_COUNT: choiceStats.CHOSE_COUNT + groupChoice.CHOSE_COUNT,
            STUDENT_TOTAL: choiceStats.STUDENT_TOTAL + group.STUDENT_TOTAL,
            GROUPS: [
              ...choiceStats.GROUPS,
              {
                ID: group.ID,
                NAME: group.NAME,
                STUDENT_TOTAL: group.STUDENT_TOTAL,
                CHOSE_COUNT: groupChoice.CHOSE_COUNT,
                CONFIRM_STATUS: groupChoice.CONFIRM_STATUS,
              },
            ],
          }),
        },
      })
    })
  })

  return {
    ID: curriculum.ID,
    PROGRAM_NAME: curriculum.PROGRAM_NAME,
    PROGRAM_CODE: curriculum.PROGRAM_CODE,
    PROFILE_NAME: curriculum.PROFILE_NAME,
    EDUCATION_LEVEL: curriculum.EDUCATION_LEVEL,
    DISCIPLINES: selectDisciplinesAll(disciplines).map((d) => ({
      ...d,
      CHOICE_STATS: selectChoiceStatsAll(d.CHOICE_STATS),
    })),
  }
}
