import { Skeleton, Stack } from '@mui/material'

export const DccCurriculumScreenSkeleton = () => {
  return (
    <Stack spacing={2}>
      <Skeleton sx={{ height: 100 }} />

      {Array(2).fill(0).map(renderCurriculum)}
    </Stack>
  )
}

function renderCurriculum(_: any, index: number) {
  return <Skeleton key={index} height={600} />
}
