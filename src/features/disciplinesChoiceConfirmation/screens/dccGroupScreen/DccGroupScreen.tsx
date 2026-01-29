import { useEffect, useMemo } from 'react'
import { CurriculumContainer } from '@features/disciplinesChoiceConfirmation/components'
import { useDccServiceAvailability } from '@features/disciplinesChoiceConfirmation/hooks'
import {
  clearGroupState,
  getChoiceParams,
  getCurriculumById,
  getGroupStudents,
  selectChoiceParams,
  selectChoiceParamsLoading,
  selectCurriculum,
  selectCurriculumIsLoading,
  selectGroup,
  selectGroupIsLoading,
} from '@features/disciplinesChoiceConfirmation/store/disciplinesChoiceConfirmationGroup'
import { Stack } from '@mui/material'
import { ScreenContent } from '@nstu/e-services-kit'
import { useTranslate, useWebPageTitle } from '@shared/hooks'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router'
import { GroupContainer } from './GroupContainer/GroupContainer'

export default function DccGroupScreen() {
  const dispatch = useDispatch<AppDispatch>()
  const translate = useTranslate('GroupScreen')

  useWebPageTitle(translate('screenTitle'))

  const [searchParams] = useSearchParams()

  const groupIdParam = searchParams.get('group')
  const semesterParam = searchParams.get('semester')

  const groupId = groupIdParam ? Number(groupIdParam) : null
  const semester = semesterParam ? Number(semesterParam) : null

  const isAvailable = useDccServiceAvailability().isAvailable

  const isChoiceParamsLoading = useSelector(selectChoiceParamsLoading)
  const isGroupLoading = useSelector(selectGroupIsLoading)
  const isCurriculumLoading = useSelector(selectCurriculumIsLoading)
  const group = useSelector(selectGroup)
  const curriculum = useSelector(selectCurriculum)
  const choiceParams = useSelector(selectChoiceParams)

  useEffect(() => {
    if (!isAvailable || !isChoiceParamsLoading) return

    dispatch(getChoiceParams())

    if (groupId && semester) {
      const payload = {
        GROUP_ID: groupId,
        SEMESTER: semester,
      }

      dispatch(getGroupStudents(payload))
    }
  }, [dispatch, isAvailable, isChoiceParamsLoading, groupId, semester])

  useEffect(() => {
    if (group.CURRICULUM_ID > 0) {
      dispatch(getCurriculumById({ CURRICULUM_ID: group.CURRICULUM_ID }))
    }
  }, [dispatch, group.CURRICULUM_ID])

  useEffect(() => {
    return () => {
      dispatch(clearGroupState())
    }
  }, [dispatch])

  const filters = useMemo<CurriculumFilter[]>(
    () => [
      {
        label: translate('course', { course: group.COURSE }),
        type: 'course',
        isChecked: false,
        value: group.COURSE,
      },
      {
        label: translate('group', { group: group.NAME }),
        type: 'group',
        isChecked: false,
        value: group.ID,
      },
      {
        label: translate('semester', { semester: group.SEMESTER }),
        type: 'semester',
        isChecked: false,
        value: group.SEMESTER,
      },
    ],
    [group.COURSE, group.NAME, group.ID, group.SEMESTER, translate],
  )

  return (
    <ScreenContent>
      <Stack spacing={2}>
        <GroupContainer selectBlock={choiceParams} studentsData={group} />

        {!(isGroupLoading || isCurriculumLoading) && (
          <CurriculumContainer
            key={`${group.ID - group.SEMESTER}`}
            curriculum={curriculum}
            initFilters={filters}
            isLinks={false}
          />
        )}
      </Stack>
    </ScreenContent>
  )
}
