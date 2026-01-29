import {
  CurriculumHeader,
  CurriculumTable,
} from '@features/disciplinesChoiceConfirmation/components'
import { useCurriculumFilters } from '@features/disciplinesChoiceConfirmation/hooks'
import { Checkbox, FormControlLabel, Paper, Stack, Typography } from '@mui/material'
import { useTranslate } from '@shared/hooks'

type Props = {
  curriculum: FlatCurriculum
  initFilters: CurriculumFilter[]
  isLinks?: boolean
}

export function CurriculumContainer({ curriculum, initFilters, isLinks = true }: Props) {
  const translate = useTranslate('CurriculumContainer')

  const data = curriculum.DISCIPLINES

  const { filters, toggleFilter, filteredData } = useCurriculumFilters({ data, initFilters })

  function renderCheckbox(filter: CurriculumFilter, id: number) {
    return (
      <FormControlLabel
        key={id}
        label={filter.label}
        checked={filter.isChecked}
        control={<Checkbox />}
        onChange={() => toggleFilter(filter.type, filter.value)}
        sx={{ margin: 0 }}
      />
    )
  }

  return (
    <Paper sx={{ p: 3 }}>
      <CurriculumHeader
        programCode={curriculum.PROGRAM_CODE}
        programName={curriculum.PROGRAM_NAME}
        programProfile={curriculum.PROFILE_NAME}
        educationLevel={curriculum.EDUCATION_LEVEL}
      />

      <Stack sx={{ mt: 2 }}>
        <Typography variant="caption" color="gray.main">
          {translate('show')}
        </Typography>

        <Stack direction="row" spacing={2} sx={{ ml: '-11px' }}>
          {filters.map(renderCheckbox)}
        </Stack>
      </Stack>

      <CurriculumTable data={filteredData} isLinks={isLinks} />
    </Paper>
  )
}
