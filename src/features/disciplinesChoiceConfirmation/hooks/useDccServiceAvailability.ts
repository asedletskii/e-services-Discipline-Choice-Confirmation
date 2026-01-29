import { useEffect } from 'react'
import {
  getDссServicesAvailability,
  selectDccAvailabilityIsLoading,
  selectIsDccAvailable,
} from '@features/disciplinesChoiceConfirmation/store/disciplinesChoiceConfirmation'
import { useDispatch, useSelector } from 'react-redux'

export function useDccServiceAvailability() {
  const dispatch = useDispatch<AppDispatch>()

  const isChecking = useSelector(selectDccAvailabilityIsLoading)
  const isAvailable = useSelector(selectIsDccAvailable)

  useEffect(() => {
    if (!isChecking) return

    dispatch(getDссServicesAvailability())
  }, [isChecking, dispatch])

  return {
    isChecking,
    isAvailable,
  }
}
