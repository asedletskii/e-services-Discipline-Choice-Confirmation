import { CardGrid, ScreenContent } from '@nstu/e-services-kit'
import { useTranslate } from '@shared/hooks/useTranslate'
import { useWebPageTitle } from '@shared/hooks/useWebPageTitle'
import { DisciplinesChoiceConfirmationServiceCard } from './DisciplinesChoiceConfirmationServiceCard'

export const ServicesScreen = function ServicesScreen() {
  const translate = useTranslate('ServicesScreen')

  useWebPageTitle(translate('screenTitle'))

  return (
    <ScreenContent title={translate('screenTitle')} noBreadCrumbs>
      <CardGrid>
        <DisciplinesChoiceConfirmationServiceCard />
      </CardGrid>
    </ScreenContent>
  )
}
