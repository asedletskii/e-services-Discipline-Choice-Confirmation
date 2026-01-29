import { dccRoutes } from '@features/disciplinesChoiceConfirmation/routes'
import { ErrorBoundary } from '@nstu/e-services-kit'
import { ServicesScreen } from '@shared/screens'
import { Location, Navigate, Route, Routes, useLocation } from 'react-router'

export function PageRouter() {
  const location = useLocation()
  const state = location.state as { backgroundLocation?: Location }

  return (
    <ErrorBoundary>
      <Routes location={state?.backgroundLocation || location}>
        <Route path="/" element={<Navigate to="/services" replace />} />

        <Route path="services">
          <Route index element={<ServicesScreen />} />

          {dccRoutes.pages}
        </Route>
      </Routes>
    </ErrorBoundary>
  )
}
