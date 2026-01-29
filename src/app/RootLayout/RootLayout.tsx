import { PropsWithChildren } from 'react'
import { Box } from '@mui/material'

export function RootLayout({ children }: PropsWithChildren) {
  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'surface.dark',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flex: 1,
          backgroundColor: 'surface.dark',
          paddingBottom: { xs: 8, sm: 12 },
        }}
      >
        {children}
      </Box>
    </Box>
  )
}
