import { flatCurriculumData, flatGroupChoice } from '@features/disciplinesChoiceConfirmation/utils'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { disciplinesChoiceConfirmation_mock } from '../../api'

export const getGroupStudents = createAsyncThunk<
  { groupChoice: GroupChoice; finishDate: FinishDate },
  { GROUP_ID: number; SEMESTER: number },
  { state: RootState }
>('getDccGroupStudents', async ({ GROUP_ID, SEMESTER }) => {
  const { GROUP_CHOICE, FINISH_DATE } = await disciplinesChoiceConfirmation_mock.getStudentsChoices(
    GROUP_ID,
    SEMESTER,
  )

  return {
    groupChoice: flatGroupChoice(GROUP_CHOICE),
    finishDate: FINISH_DATE,
  }
})

export const confirmStudentsChoice = createAsyncThunk<
  void,
  { STUDENTS: { ID_CARD: number; IS_CONFIRMED: 0 | 1 }[] },
  { state: RootState }
>('confirmStudentsChoices', async ({ STUDENTS }, { getState }) => {
  const state = getState().dccGroup

  if (!state) return

  const GROUP_ID = state.group.ID
  const SEMESTER = state.group.SEMESTER

  const STUDENTS_CHOICES = STUDENTS.map(({ ID_CARD, IS_CONFIRMED }) => {
    const student = state.group.STUDENTS.find((s) => s.ID_CARD === ID_CARD)
    if (!student) return

    const studentPayload: {
      ID_CARD: number
      IS_CONFIRMED: 0 | 1
      CHOICE?: {
        BLOCK_ID: number
        DISCIPLINES: {
          STUDENT_DISC_ID: number | null
          TUTOR_DISC_ID: number | null
        }[]
      }[]
    } = {
      ID_CARD: student.ID_CARD,
      IS_CONFIRMED,
    }

    if (IS_CONFIRMED === 1) {
      studentPayload.CHOICE = student.CHOICE.map((c) => ({
        BLOCK_ID: c.BLOCK_ID,
        DISCIPLINES: (c.DISCIPLINES ?? []).map((d) => ({
          STUDENT_DISC_ID: d.STUDENT_DISC_ID,
          TUTOR_DISC_ID: d.TUTOR_DISC_ID,
        })),
      }))
    }

    return studentPayload
  }).filter((student) => student !== undefined)

  const payload = {
    GROUP_ID,
    SEMESTER,
    STUDENTS_CHOICES,
  }

  await disciplinesChoiceConfirmation_mock.confirmStudents(payload)
})

export const setGroupConfirmStatus = createAsyncThunk<void, { IS_CONFIRMED: 0 | 1 }, { state: RootState }>(
  'setGroupConfirmStatus',
  async ({ IS_CONFIRMED }, { getState }) => {
    const state = getState()

    if (!state.dccGroup) return

    const GROUP_ID = state.dccGroup.group.ID
    const SEMESTER = state.dccGroup.group.SEMESTER

    await disciplinesChoiceConfirmation_mock.setGroupConfirmationStatus(
      GROUP_ID,
      SEMESTER,
      IS_CONFIRMED,
    )
  },
)

export const getCurriculumById = createAsyncThunk<
  FlatCurriculum,
  { CURRICULUM_ID: number },
  { state: RootState }
>('getCurriculumWithId', async ({ CURRICULUM_ID }) => {
  const data = await disciplinesChoiceConfirmation_mock.getCurriculumById(CURRICULUM_ID)

  const result = flatCurriculumData(data)
  return result
})

export const getChoiceParams = createAsyncThunk<ChoiceRequestParams, void, { state: RootState }>(
  'getChoiceParams',
  async () => {
    const data = await disciplinesChoiceConfirmation_mock.getChoiceParams()

    return data
  },
)
