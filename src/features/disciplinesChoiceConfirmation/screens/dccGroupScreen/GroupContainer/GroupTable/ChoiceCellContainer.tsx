import { columnCoordinates } from '@features/disciplinesChoiceConfirmation/constants/groupTable'
import {
  selectConfirmStatus,
  selectLoadingIds,
} from '@features/disciplinesChoiceConfirmation/store/disciplinesChoiceConfirmationGroup'
import { Box, Stack, TableCell, Typography } from '@mui/material'
import { useTranslate } from '@shared/hooks'
import { useSelector } from 'react-redux'
import { ChoicesRow } from './ChoicesRow'

type Props = {
  choice: StudentChoice['CHOICE']
  studentIdCard: number
  isConfirmed: 0 | 1
}

export function ChoiceCellContainer({ choice, studentIdCard, isConfirmed }: Props) {
  const translate = useTranslate('GroupTable')

  const loadingIds = useSelector(selectLoadingIds)
  const confirmStatus = useSelector(selectConfirmStatus)

  const mandatoryBlocks = choice.filter((c) => c.IS_OPTIONAL === 0)
  const optionalBlocks = choice.filter((c) => c.IS_OPTIONAL === 1)

  return (
    <TableCell
      colSpan={2}
      sx={{
        minWidth: '450px',
        position: 'sticky',
        left: columnCoordinates[2],
      }}
    >
      <Stack spacing={1.5}>
        <Stack spacing={0.5}>
          {mandatoryBlocks.map((block, blockI) => (
            <ChoicesRow
              key={blockI}
              blockI={blockI}
              studentIdCard={studentIdCard}
              isConfirmed={isConfirmed}
              block={block}
              loadingIds={loadingIds}
              confirmStatus={confirmStatus}
            />
          ))}
        </Stack>

        <Stack spacing={0.5}>
          {optionalBlocks.length > 0 && (
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                columnGap: 3,
              }}
            >
              {(['optional', 'optional'] as const).map((key, i) => (
                <Typography key={i} color="gray.main">
                  {translate(key)}
                </Typography>
              ))}
            </Box>
          )}

          {optionalBlocks.map((block, blockI) => (
            <ChoicesRow
              key={blockI}
              blockI={blockI + mandatoryBlocks.length}
              studentIdCard={studentIdCard}
              isConfirmed={isConfirmed}
              block={block}
              loadingIds={loadingIds}
              confirmStatus={confirmStatus}
            />
          ))}
        </Stack>
      </Stack>
    </TableCell>
  )
}
