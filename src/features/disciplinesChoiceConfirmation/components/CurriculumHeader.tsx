import { Stack, Typography } from '@mui/material'
import { useTranslate } from '@shared/hooks'

type Props = {
  programName: string
  programCode: string
  programProfile: string
  educationLevel: 1 | 2 | 3 | 4
}

export function CurriculumHeader({
  programName,
  programCode,
  programProfile,
  educationLevel,
}: Props) {
  const translate = useTranslate('CurriculumHeader')

  return (
    <Stack spacing={1}>
      <Typography variant="h3">
        {`${programCode} ${programName} (${translate(educationLevel)})`}
      </Typography>

      <Typography variant="h5">
        {programProfile}
      </Typography>
    </Stack>
  )
}
