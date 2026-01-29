import { lazy, Suspense } from 'react'
import { Route } from 'react-router'

const DccCurriculumsScreen = lazy(() => import('./screens/dccCurriculumsScreen'))
const DccGroupScreen = lazy(() => import('./screens/dccGroupScreen'))

export const dccRoutes = {
  pages: (
    <Route path="dcc">
      <Route
        index
        element={
          <Suspense>
            <DccCurriculumsScreen />
          </Suspense>
        }
      />

      <Route
        path="groupChoice"
        element={
          <Suspense>
            <DccGroupScreen />
          </Suspense>
        }
      />
    </Route>
  ),
}
