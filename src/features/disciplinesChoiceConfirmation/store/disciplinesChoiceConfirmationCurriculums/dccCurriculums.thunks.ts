import { flatCurriculumData } from '@features/disciplinesChoiceConfirmation/utils'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { disciplinesChoiceConfirmation_mock } from '../../api'

export const getCurriculums = createAsyncThunk<FlatCurriculum[], void, { state: RootState }>(
  'getDccCurriculums',
  async () => {
    const data = await disciplinesChoiceConfirmation_mock.getCurriculums()
    const result = data.map((curriculum) => flatCurriculumData(curriculum))

    return result
  },
)
