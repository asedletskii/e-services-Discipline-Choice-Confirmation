import { useDccServiceAvailability } from '@features/disciplinesChoiceConfirmation/hooks'
import { ChecklistRtl } from '@mui/icons-material'
import { useTranslate } from '@shared/hooks'
import { useNavigate } from 'react-router'
import { ServiceCard } from './ServiceCard'

export const DisciplinesChoiceConfirmationServiceCard =
  function DisciplinesChoiceConfirmationServiceCard() {
    const translate = useTranslate('DccServiceCard')
    const navigate = useNavigate()

    const { isChecking, isAvailable } = useDccServiceAvailability()

    const handleClick = () => navigate('./dcc')

    return isAvailable || isChecking ? (
      <ServiceCard
        name={translate('title')}
        description={translate('description')}
        Icon={ChecklistRtl}
        onClick={handleClick}
        isLoading={isChecking}
      />
    ) : null
  }
