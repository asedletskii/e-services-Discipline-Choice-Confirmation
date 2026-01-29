import { createAsyncThunk } from '@reduxjs/toolkit'
import { disciplinesChoiceConfirmation_mock } from '../../api'

export const getDссServicesAvailability = createAsyncThunk<boolean, void, { state: RootState }>(
  'getDccServicesAvailability',
  async () => {
    const availability = await disciplinesChoiceConfirmation_mock.getServiceAvailability()

    return availability
  },
)