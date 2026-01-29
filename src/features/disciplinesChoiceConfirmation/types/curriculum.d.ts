type Curriculum = {
  ID: number

  PROGRAM_CODE: string
  PROGRAM_NAME: string

  PROFILE_NAME: string
  EDUCATION_LEVEL: 1 | 2 | 3 | 4

  BLOCKS: DisciplinesBlock[]

  GROUPS_CHOICES: GroupChoicesStats[]
}

type DisciplinesBlock = {
  ID: number

  SEMESTER: number

  IS_OPTIONAL: 0 | 1

  DISCIPLINES: DccDisciplineInfo[]
}

type DccDisciplineInfo = {
  ID: number
  NAME: string

  DEPARTMENT: string
  CREDITS: number

  /**
   * Тип экзамена дисциплины
   * - 0 - Зачет
   * - 1 - Экзамен
   *  */
  EXAM_TYPE: 0 | 1
}

type GroupChoicesStats = {
  ID: number
  NAME: string
  COURSE: number

  STUDENT_TOTAL: number

  CHOICES: {
    BLOCK_ID: number
    DISCIPLINE_ID: number

    CHOSE_COUNT: number

    CONFIRM_STATUS: ChoiceConfirmStatus
  }[]
}

/** Зафиксирован ли выбор для группы
 * * 0 - не зафиксирован
 * * 1 - зафиксирован тьютором
 * * 2 - зафиксирован деканатом
 */
type ChoiceConfirmStatus = 0 | 1 | 2
