class DisciplinesChoiceConfirmationMock {
  async getServiceAvailability(): Promise<boolean> {
    return true
  }

  async getCurriculums(): Promise<Curriculum[]> {
    const blocks = 4
    const disciplines = 2

    return [
      {
        ID: 1,
        PROGRAM_NAME: 'Прикладная математика и информатика',
        PROGRAM_CODE: '01.03.02',
        PROFILE_NAME: 'Компьютерное моделирование и информационные технологии',
        BLOCKS: new Array(blocks).fill(0).map((_, i) => ({
          ID: i + 1,
          CHOICE_COUNT: 1,
          DISCIPLINES: new Array(disciplines).fill(0).map((_, d) => ({
            ID: (i + 1) * 100 + d + 1,
            NAME: `Разработка web-приложений ${d + 1}`,
            DEPARTMENT: d % 2 ? 'ПМт' : 'ТПИ',
            CREDITS: 5,
            EXAM_TYPE: 1,
          })),
          IS_OPTIONAL: 0,
          SEMESTER: i + 1,
        })),

        EDUCATION_LEVEL: 1,
        GROUPS_CHOICES: new Array(6).fill(0).flatMap((_, i) => ({
          ID: i + 1,
          NAME: i < 3 ? `ПМ-1${i + 1}` : `ПМ-2${i + 1}`,
          COURSE: i < 3 ? 4 : 3,
          STUDENT_TOTAL: 20 + i + 1,
          CHOICES: new Array(blocks).fill(0).flatMap((_, j) =>
            new Array(disciplines).fill(0).map((_, d) => ({
              BLOCK_ID: j + 1,
              DISCIPLINE_ID: (j + 1) * 100 + d + 1,
              CHOSE_COUNT: 10 + i,
              CONFIRM_STATUS: d % 2 ? 1 : 2,
            })),
          ),
        })),
      },
    ]
  }

  async getStudentsChoices(
    groupId: GroupChoiceApiResponse['ID'],
    semester: number,
  ): Promise<{ GROUP_CHOICE: GroupChoiceApiResponse; FINISH_DATE: FinishDate }> {
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const blocks = 3
    const disciplines = 3
    return {
      GROUP_CHOICE: {
        ID: 4,
        NAME: 'ПМ-24',
        COURSE: 3,
        CURRICULUM_ID: 68222,
        CONFIRM_STATUS: 0,
        SEMESTER: 1,
        BLOCKS: new Array(blocks).fill(0).map((_, i) => ({
          ID: i + 1,
          DISCIPLINES: new Array(disciplines).fill(0).map((_, d) => ({
            ID: (i + 1) * 100 + d + 1,
            NAME: `Разработка объектно-ориентированных программ с использованием С#/C++ ${d + 1}`,
            DEPARTMENT: d % 2 ? 'ПМт' : 'ТПИ',
            CREDITS: 5,
            EXAM_TYPE: 1,
          })),
          IS_OPTIONAL: i % 2 ? 0 : 1,
          SEMESTER: i + 1,
        })),
        STUDENTS: [
          {
            ID_CARD: 111,
            NAME: 'Иван',
            SURNAME: 'Иванов',
            PATRONYMIC: 'Иванович',
            PHOTO: null,
            CHOICE: [
              {
                BLOCK_ID: 1,
                DISCIPLINES: [
                  {
                    STUDENT_DISC_ID: 102,
                    TUTOR_DISC_ID: null,
                  },
                  {
                    STUDENT_DISC_ID: 101,
                    TUTOR_DISC_ID: 101,
                  },
                ],
              },
              {
                BLOCK_ID: 3,
                DISCIPLINES: [
                  {
                    STUDENT_DISC_ID: null,
                    TUTOR_DISC_ID: null,
                  },
                  {
                    STUDENT_DISC_ID: 303,
                    TUTOR_DISC_ID: 303,
                  },
                ],
              },
              {
                BLOCK_ID: 2,
                DISCIPLINES: [
                  {
                    STUDENT_DISC_ID: null,
                    TUTOR_DISC_ID: null,
                  },
                  {
                    STUDENT_DISC_ID: 202,
                    TUTOR_DISC_ID: 202,
                  },
                ],
              },
            ],
            IS_CONFIRMED: 0,
          },
          {
            ID_CARD: 112,
            NAME: 'Пётр',
            SURNAME: 'Петров',
            PATRONYMIC: null,
            PHOTO: null,
            CHOICE: [
              {
                BLOCK_ID: 1,
                DISCIPLINES: [
                  {
                    STUDENT_DISC_ID: null,
                    TUTOR_DISC_ID: null,
                  },
                  {
                    STUDENT_DISC_ID: 101,
                    TUTOR_DISC_ID: 101,
                  },
                ],
              },
              {
                BLOCK_ID: 3,
                DISCIPLINES: [
                  {
                    STUDENT_DISC_ID: null,
                    TUTOR_DISC_ID: null,
                  },
                  {
                    STUDENT_DISC_ID: 303,
                    TUTOR_DISC_ID: 303,
                  },
                ],
              },
              {
                BLOCK_ID: 2,
                DISCIPLINES: [
                  {
                    STUDENT_DISC_ID: null,
                    TUTOR_DISC_ID: null,
                  },
                  {
                    STUDENT_DISC_ID: 202,
                    TUTOR_DISC_ID: 202,
                  },
                ],
              },
            ],
            IS_CONFIRMED: 0,
          },
        ],
      },
      FINISH_DATE: null,
    }
  }
  async getCurriculumById(CURRICULUM_ID: number): Promise<Curriculum> {
    const blocks = 4
    const disciplines = 2

    const result: Curriculum = {
      ID: CURRICULUM_ID,
      PROGRAM_NAME: 'Прикладная математика и информатика',
      PROGRAM_CODE: `${CURRICULUM_ID}.${CURRICULUM_ID + 1}.${CURRICULUM_ID + 2}`,
      PROFILE_NAME: 'Компьютерное моделирование и информационные технологии',
      BLOCKS: new Array(blocks).fill(0).map((_, i) => ({
        ID: i + 1,
        CHOICE_COUNT: 1,
        DISCIPLINES: new Array(disciplines).fill(0).map((_, d) => ({
          ID: (i + 1) * 100 + d + 1,
          NAME: `Матан ${d + 1}`,
          DEPARTMENT: d % 2 ? 'ПМт' : 'ТПИ',
          CREDITS: 5,
          EXAM_TYPE: 1,
        })),
        IS_OPTIONAL: 0,
        SEMESTER: i + 1,
      })),

      EDUCATION_LEVEL: 1,
      GROUPS_CHOICES: new Array(6).fill(0).flatMap((_, i) => ({
        ID: i + 1,
        NAME: i < 3 ? `ПМ-1${i + 1}` : `ПМ-2${i + 1}`,
        COURSE: i < 3 ? 4 : 3,
        STUDENT_TOTAL: 20 + i + 1,
        CHOICES: new Array(blocks).fill(0).flatMap((_, j) =>
          new Array(disciplines).fill(0).map((_, d) => ({
            BLOCK_ID: j + 1,
            DISCIPLINE_ID: (j + 1) * 100 + d + 1,
            CHOSE_COUNT: 10 + i,
            CONFIRM_STATUS: d % 2 ? 1 : 2,
          })),
        ),
      })),
    }

    return result
  }

  async getChoiceParams(): Promise<ChoiceRequestParams> {
    return [
      {
        ID: 1,
        NAME: 'ПМ-11',
        CURRICULUM_ID: 68222,
        CURRENT_SEMESTER: 1,
        SEMESTERS: [1, 2, 3, 4],
      },
      {
        ID: 2,
        NAME: 'ПМ-12',
        CURRICULUM_ID: 68222,
        CURRENT_SEMESTER: 2,
        SEMESTERS: [1, 2, 3, 4],
      },
      {
        ID: 3,
        NAME: 'ПМ-13',
        CURRICULUM_ID: 68222,
        CURRENT_SEMESTER: 3,
        SEMESTERS: [1, 2, 3, 4],
      },
      {
        ID: 4,
        NAME: 'ПМ-24',
        CURRICULUM_ID: 68222,
        CURRENT_SEMESTER: 4,
        SEMESTERS: [1, 2, 3, 4],
      },
      {
        ID: 5,
        NAME: 'ПМ-25',
        CURRICULUM_ID: 68222,
        CURRENT_SEMESTER: 5,
        SEMESTERS: [1, 2, 5],
      },
      {
        ID: 6,
        NAME: 'ПМ-26',
        CURRICULUM_ID: 68222,
        CURRENT_SEMESTER: 6,
        SEMESTERS: [1, 2, 6],
      },
    ]
  }

  async confirmStudents({
    GROUP_ID,
    SEMESTER,
    STUDENTS_CHOICES,
  }: {
    GROUP_ID: number
    SEMESTER: number
    STUDENTS_CHOICES: {
      ID_CARD: number
      IS_CONFIRMED: 0 | 1
      TUTOR_CHOICES?: {
        BLOCK_ID: number
        DISCIPLINES_IDS: (number | null)[]
      }[]
    }[]
  }): Promise<boolean> {
    console.log(STUDENTS_CHOICES)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    return true
  }

  async setGroupConfirmationStatus(
    GROUP_ID: number,
    SEMESTER: number,
    IS_CONFIRMED: 0 | 1,
  ): Promise<boolean> {
    await new Promise((resolve) => setTimeout(resolve, 2000))
    return true
  }
}

export const disciplinesChoiceConfirmation_mock = new DisciplinesChoiceConfirmationMock()
