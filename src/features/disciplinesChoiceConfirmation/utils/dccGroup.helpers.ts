export const canConfirmStudent = (student: StudentChoice): boolean => {
  const allBlocksChosenByStudent = student.CHOICE.every((block) => {
    if (block.IS_OPTIONAL === 1) return true
    return block.DISCIPLINES.every((disc) => disc.STUDENT_DISC_ID !== null)
  })

  const allBlocksChosenByTutor = student.CHOICE.every((block) => {
    if (block.IS_OPTIONAL === 1) return true
    return block.DISCIPLINES.every((disc) => disc.TUTOR_DISC_ID !== null)
  })

  return allBlocksChosenByStudent || allBlocksChosenByTutor
}

export const flatGroupChoice = (data: GroupChoiceApiResponse): GroupChoice => {
  const blocks = data.BLOCKS.sort((a, b) => a.IS_OPTIONAL - b.IS_OPTIONAL || a.ID - b.ID).map(
    (block) => {
      return {
        ID: block.ID,
        IS_OPTIONAL: block.IS_OPTIONAL,
        DISCIPLINES: block.DISCIPLINES.map((d) => {
          return {
            ID: d.ID,
            NAME: d.NAME,
            DEPARTMENT: d.DEPARTMENT,
          }
        }),
      }
    },
  )

  const result = data.STUDENTS.map((student) => {
    return {
      ...student,
      CHOICE: blocks.map((block) => {
        const choice = student.CHOICE.find((choice) => choice.BLOCK_ID === block.ID) ?? {
          DISCIPLINES: [],
        }

        const chosenIds = choice.DISCIPLINES.map((disc) => disc.TUTOR_DISC_ID ?? null)

        const disciplines = choice.DISCIPLINES.map((disc, i) => {
          const studentDisc = block.DISCIPLINES.find((bd) => bd.ID === disc.STUDENT_DISC_ID)

          return {
            ID: i,
            DEPARTMENT: studentDisc ? studentDisc.DEPARTMENT : null,
            STUDENT_DISC_ID: disc.STUDENT_DISC_ID,
            STUDENT_DISC_NAME: studentDisc ? studentDisc.NAME : null,
            TUTOR_DISC_ID: disc.TUTOR_DISC_ID,
          }
        })
        return {
          BLOCK_ID: block.ID,
          IS_OPTIONAL: block.IS_OPTIONAL,
          DISCIPLINES: disciplines,
          AVAILABLE_DISCIPLINES: block.DISCIPLINES,
          CHOSEN_DISCIPLINE_IDS: chosenIds,
        }
      }),
    }
  })
  return {
    ...data,
    STUDENTS: result,
  }
}
