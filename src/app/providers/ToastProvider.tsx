import { createContext, memo, PropsWithChildren, useState } from 'react'
import { AlertColor } from '@mui/material'
import { Toast } from '@nstu/e-services-kit'
import { SnackbarProvider } from 'notistack'

export interface IToast {
  type: AlertColor
  title: string
  message?: string
}

export const ToastContext = createContext<{
  showToast(toast: IToast): void
}>({
  showToast() {},
})

export const ToastProvider = memo<PropsWithChildren>(function ToastProvider({ children }) {
  const [toast, setToast] = useState<IToast | null>(null)

  const showToast = (toast: IToast) => {
    setToast(toast)
  }

  const closeToast = () => {
    setToast(null)
  }

  return (
    <SnackbarProvider maxSnack={2}>
      <ToastContext.Provider value={{ showToast }}>
        {children}

        {toast && (
          <Toast
            onClose={closeToast}
            type={toast.type}
            title={toast.title}
            message={toast.message}
          />
        )}
      </ToastContext.Provider>
    </SnackbarProvider>
  )
})
