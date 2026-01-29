import { type ComponentType } from 'react'
import { Skeleton, Stack, SvgIconProps, Typography } from '@mui/material'
import { CardGridItem, IconBox, PressablePaper } from '@nstu/e-services-kit'

interface Props {
  name: string
  description: string
  Icon: ComponentType<SvgIconProps>
  onClick(): void
  isLoading?: boolean
}

export const ServiceCard = ({ name, description, Icon, onClick, isLoading }: Props) => {
  const Content = (
    <PressablePaper
      sx={{
        width: '100%',
        height: '100%',
        padding: 4,
      }}
      elevation={0}
      onClick={onClick}
    >
      <Stack
        spacing={3}
        sx={{
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          height: '100%',
        }}
      >
        <IconBox
          color="primary"
          Icon={Icon}
          IconProps={{ sx: { fontSize: '48px' } }}
          sx={{ alignSelf: 'flex-start' }}
        />

        <Stack spacing={2}>
          <Typography
            sx={{
              typography: 'h2',
              whiteSpace: 'pre-line',
            }}
          >
            {name}
          </Typography>

          <Typography
            sx={{
              typography: 'h5',
              whiteSpace: 'pre-line',
              color: 'gray.dark',
            }}
          >
            {description}
          </Typography>
        </Stack>
      </Stack>
    </PressablePaper>
  )

  return (
    <CardGridItem columns={4}>
      {isLoading ? <Skeleton sx={{ height: '100%', width: '100%' }}>{Content}</Skeleton> : Content}
    </CardGridItem>
  )
}
