import { Button } from '@mui/material'

type Props = {
  visible: boolean
  label: string
  onClick: () => void
}

export function CancelButton({ visible, label, onClick }: Props) {
  if (!visible) return null
  return (
    <Button variant="outlined" onClick={onClick}>
      {label}
    </Button>
  )
}
