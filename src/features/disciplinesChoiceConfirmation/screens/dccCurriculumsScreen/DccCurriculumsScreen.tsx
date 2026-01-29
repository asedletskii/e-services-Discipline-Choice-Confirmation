import { useEffect, useMemo, useState } from 'react'
import { CurriculumContainer } from '@features/disciplinesChoiceConfirmation/components'
import { useDccServiceAvailability } from '@features/disciplinesChoiceConfirmation/hooks'
import {
  getCurriculums,
  selectCurriculums,
  selectCurriculumsIsLoading,
} from '@features/disciplinesChoiceConfirmation/store/disciplinesChoiceConfirmationCurriculums'
import { Stack } from '@mui/material'
import { ScreenContent } from '@nstu/e-services-kit'
import { useTranslate, useWebPageTitle } from '@shared/hooks'
import { useDispatch, useSelector } from 'react-redux'
import { DccCurriculumScreenSkeleton } from './DccCurriculumScreenSkeleton'
import { SearchBar } from './SearchBar'

export default function DccCurriculumsScreen() {
  const dispatch = useDispatch<AppDispatch>()
  const translate = useTranslate('CurriculumScreen')

  useWebPageTitle(translate('screenTitle'))

  const isLoading = useSelector(selectCurriculumsIsLoading)
  const curriculums = useSelector(selectCurriculums)

  const { isChecking, isAvailable } = useDccServiceAvailability()

  useEffect(() => {
    if (!isAvailable) return

    if (!isLoading) return

    dispatch(getCurriculums())
  }, [isLoading, isAvailable, dispatch])

  const [filtersVersion, setFiltersVersion] = useState(0)

  const data = useMemo(() => {
    return curriculums.map((curriculum) => {
      const courses: number[] = Array.from(
        new Set(
          curriculum.DISCIPLINES.flatMap((disc) =>
            disc.CHOICE_STATS.map((choice) => choice.COURSE),
          ),
        ),
      )

      const filters: CurriculumFilter[] = courses.sort().map((course) => ({
        label: translate('ignoredCourse', { course }),
        type: 'course',
        isChecked: true,
        value: course,
      }))

      return {
        curriculum,
        initFilters: filters,
      }
    })
  }, [curriculums, translate])

  return (
    <ScreenContent
      title={translate('screenTitle')}
      isLoading={isLoading || isChecking}
      ContentSkeleton={DccCurriculumScreenSkeleton}
    >
      <Stack gap={'32px'}>
        <SearchBar onResetFilters={() => setFiltersVersion((v) => v + 1)} />

        <Stack gap={'20px'}>
          {data.map((curriculum) => (
            <CurriculumContainer
              key={`${curriculum.curriculum.ID}-${filtersVersion}`}
              curriculum={curriculum.curriculum}
              initFilters={curriculum.initFilters}
            />
          ))}
        </Stack>
      </Stack>
    </ScreenContent>
  )
}
