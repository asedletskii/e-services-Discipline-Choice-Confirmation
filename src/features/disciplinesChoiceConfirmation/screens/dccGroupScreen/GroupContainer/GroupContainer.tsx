import { Stack } from '@mui/material'
import { ContentBlock } from '@nstu/e-services-kit'
import { useTranslate } from '@shared/hooks'
import { ChoiceSelectors } from './ChoiceSelectors/ChoiceSelectorsContainer'
import { ConfirmGroupBlock } from './ConfirmGroupBlock'
import { GroupTable } from './GroupTable/GroupTable'

type Props = {
  selectBlock: ChoiceRequestParams
  studentsData: GroupChoice
}

export function GroupContainer({ selectBlock, studentsData }: Props) {
  const translate = useTranslate('GroupContainer')

  return (
    <ContentBlock title={translate('studentsList')} sx={{ p: 3 }}>
      <Stack spacing={2.5}>
        <ChoiceSelectors selectBlock={selectBlock} />

        <ConfirmGroupBlock />

        <GroupTable groupChoice={studentsData} />
      </Stack>
    </ContentBlock>
  )
}
