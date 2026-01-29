/* eslint-disable simple-import-sort/imports */
import { PropsWithChildren } from 'react'
import { LocalizationProvider } from './LocalizationProvider'
import { ReduxProvider } from './ReduxProvider'
import { RouterProvider } from './RouterProvider'
import { KitProvider, ThemeProvider } from '@nstu/e-services-kit'
import { ToastProvider } from './ToastProvider'
import { components } from '@nstu/e-services-kit/muiDataGrid'
import { useBreadCrumbsMap } from '@shared/hooks/useBreadcrumbsMap'

export function Providers({ children }: PropsWithChildren) {
  return (
    <ReduxProvider>
      <RouterProvider>
        <ThemeProvider componentsEnhancer={components}>
          <LocalizationProvider>
            <ToastProvider>
              <KitProvider useBreadCrumbsMap={useBreadCrumbsMap} supportEmail={''}>
                {children}
              </KitProvider>
            </ToastProvider>
          </LocalizationProvider>
        </ThemeProvider>
      </RouterProvider>
    </ReduxProvider>
  )
}
