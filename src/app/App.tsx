import './dayjsSetup'
import '@shared/styles/styles.css'
import { PageRouter } from './PageRouter'
import { Providers } from './providers'
import { RootLayout } from './RootLayout'

export function App() {
  return (
    <Providers>
      <RootLayout>
        <PageRouter />
      </RootLayout>
    </Providers>
  )
}
