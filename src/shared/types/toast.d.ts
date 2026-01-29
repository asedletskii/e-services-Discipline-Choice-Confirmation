type ToastOptions = {
  type: import('@mui/material').AlertColor
  title: string
  message?: string
  onClose?: () => void
}
