import { createLazySliceStateSelector } from '@shared/utils/store'
import { getDccInitialState } from './disciplinesChoiceConfirmation.state'

const sliceStateSelector = createLazySliceStateSelector('dccAvailability', getDccInitialState())

export const selectIsDccAvailable = sliceStateSelector((state) => state.isServiceAvailable)

export const selectDccAvailabilityIsLoading = sliceStateSelector((state) => state.isLoading)
