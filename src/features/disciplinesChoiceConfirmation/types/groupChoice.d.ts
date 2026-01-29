type GroupChoiceApiResponse = {
  ID: number
  NAME: string

  COURSE: number
  SEMESTER: number

  CURRICULUM_ID: number
  BLOCKS: DisciplinesBlock[]

  CONFIRM_STATUS: ChoiceConfirmStatus

  STUDENTS: {
    ID_CARD: number

    NAME: string
    SURNAME: string
    PATRONYMIC: string | null

    PHOTO: string | null

    /**
     * Зафиксирован ли выбор тьютором
     * * 0 - не зафиксирован
     * * 1 - зафиксирован
     */
    IS_CONFIRMED: 0 | 1

    CHOICE: {
      BLOCK_ID: number
      DISCIPLINES: {
        STUDENT_DISC_ID: number | null
        TUTOR_DISC_ID: number | null
      }[]
    }[]
  }[]
}

type ChoiceRequestParams = {
  ID: number
  NAME: string
  CURRICULUM_ID: number
  CURRENT_SEMESTER: number
  SEMESTERS: number[]
}[]

type GroupChoice = Omit<GroupChoiceApiResponse, 'STUDENTS'> & {
  STUDENTS: StudentChoice[]
}

type StudentChoice = Omit<GroupChoiceApiResponse['STUDENTS'][number], 'CHOICE'> & {
  CHOICE: {
    BLOCK_ID: number
    IS_OPTIONAL: 0 | 1
    DISCIPLINES: {
      ID: number
      DEPARTMENT: string | null;
      STUDENT_DISC_NAME: string | null
      STUDENT_DISC_ID: number | null
      TUTOR_DISC_ID: number | null
    }[]
    AVAILABLE_DISCIPLINES: {
      ID: number
      NAME: string
    }[]
    CHOSEN_DISCIPLINE_IDS: (number | null)[]
  }[]
}

type FinishDate = string | null