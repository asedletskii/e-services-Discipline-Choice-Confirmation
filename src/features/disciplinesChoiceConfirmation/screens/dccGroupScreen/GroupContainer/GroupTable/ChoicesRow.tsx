import { updateTutorChoice } from '@features/disciplinesChoiceConfirmation/store/disciplinesChoiceConfirmationGroup/'
import { Stack, Typography } from '@mui/material'
import { Select, SimpleSelectOption } from '@nstu/e-services-kit'
import { useDispatch } from 'react-redux'

type Props = {
  blockI: number
  studentIdCard: number
  block: StudentChoice['CHOICE'][number]
  isConfirmed: 0 | 1
  loadingIds: number[]
  confirmStatus: ChoiceConfirmStatus
}

export function ChoicesRow({
  studentIdCard,
  block,
  isConfirmed,
  blockI,
  loadingIds,
  confirmStatus,
}: Props) {
  const dispatch = useDispatch<AppDispatch>()

  const isOptional = !!block.IS_OPTIONAL

  const disciplineOptions: SimpleSelectOption[] = [
    ...(isOptional ? [{ value: -1, text: 'Ничего' }] : []),
    ...block.AVAILABLE_DISCIPLINES.map((d) => ({ value: d.ID, text: d.NAME })),
  ]

  const handleChange = (index: number, newValue: number | string | null) => {
    const updatedIds = [...block.CHOSEN_DISCIPLINE_IDS]
    updatedIds[index] = newValue as number

    const discipline = block.DISCIPLINES[index]
    const tutorDiscId = newValue as number

    dispatch(
      updateTutorChoice({
        studentIdCard,
        blockId: block.BLOCK_ID,
        disciplineId: discipline.ID,
        tutorDiscId,
        chosenDisciplineIds: updatedIds,
      }),
    )
  }

  const isLoading = loadingIds.includes(studentIdCard)
  const isDisabled = !!isConfirmed || isLoading || !!confirmStatus

  return (
    <Stack spacing={0.5}>
      {Array.from({ length: block.DISCIPLINES.length }).map((_, index) => {
        const alreadyChosen = block.CHOSEN_DISCIPLINE_IDS.filter((_, i) => i !== index)
        const disc = block.DISCIPLINES.map((disc) => {
          const res = {
            NAME: disc.STUDENT_DISC_NAME,
            DEPARTMENT: disc.DEPARTMENT,
          }
          return res
        })
        const filteredOptions = disciplineOptions.filter((opt) => {
          if (isOptional && opt.value === -1) return true
          return !alreadyChosen.includes(opt.value as number)
        })
        return (
          <Stack
            direction={'row'}
            key={index + 1}
            sx={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              columnGap: 3,
            }}
          >
            <Typography key={(index + 1) * 2}>
              {`${blockI + 1}.${index + 1} ${
                disc[index].NAME ?? '—'
              } ${disc[index].DEPARTMENT ? `(${disc[index].DEPARTMENT});` : ''}`}
            </Typography>

            <Select
              key={(index + 1) * 3}
              size="small"
              startAdornment={`${blockI + 1}.${index + 1}`}
              options={filteredOptions}
              value={block.CHOSEN_DISCIPLINE_IDS[index] ?? ''}
              onChange={(val) => handleChange(index, val)}
              disabled={isDisabled}
            />
          </Stack>
        )
      })}
    </Stack>
  )
}
