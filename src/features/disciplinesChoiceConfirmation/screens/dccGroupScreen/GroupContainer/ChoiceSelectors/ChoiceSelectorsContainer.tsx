import { useChoiceSelectors } from '@features/disciplinesChoiceConfirmation/hooks'
import { Stack } from '@mui/material'
import { useTranslate } from '@shared/hooks'
import { CancelButton } from './CancelButton'
import { GroupSelect } from './GroupSelect'
import { SemesterSelect } from './SemesterSelect'

type Props = {
  selectBlock: ChoiceRequestParams
}

export function ChoiceSelectors({ selectBlock }: Props) {
  const translate = useTranslate('GroupContainer')
  const {
    groupId,
    semester,
    currentGroup,
    isGroupLoading,
    requestCountRef,
    handleGroupChange,
    handleSemesterChange,
    cancelRequest,
  } = useChoiceSelectors(selectBlock)

  return (
    <Stack spacing={2} direction="row">
      <GroupSelect
        label={translate('group')}
        options={selectBlock.map((g) => ({ text: g.NAME, value: g.ID }))}
        value={groupId}
        onChange={handleGroupChange}
        disabled={(!currentGroup && !isGroupLoading) || (currentGroup !== null && isGroupLoading)}
      />

      <SemesterSelect
        label={translate('semester')}
        options={
          currentGroup?.SEMESTERS.map((s) => ({
            text: translate('semesterValue', { value: s }),
            value: s,
          })) || []
        }
        value={semester}
        onChange={handleSemesterChange}
        disabled={!currentGroup || (semester !== null && isGroupLoading)}
      />

      <CancelButton
        visible={isGroupLoading && requestCountRef.current > 0}
        label={translate('cancel')}
        onClick={cancelRequest}
      />
    </Stack>
  )
}
