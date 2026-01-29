import {
  selectConfirmStatus,
  selectFinishDate,
  selectGroupIsLoading,
  selectIsAllStudentsConfirmed,
  selectIsGroupStatusUpdating,
  setGroupConfirmStatus,
} from '@features/disciplinesChoiceConfirmation/store/disciplinesChoiceConfirmationGroup'
import { InfoOutlined } from '@mui/icons-material'
import { Button, Stack, Typography } from '@mui/material'
import { ExtraInformation } from '@nstu/e-services-kit'
import { useTranslate } from '@shared/hooks'
import dayjs from 'dayjs'
import { useDispatch, useSelector } from 'react-redux'
import { InfoBlock } from './InfoBlock'

export function ConfirmGroupBlock() {
  const translate = useTranslate('ConfirmGroupBlock')
  const dispatch = useDispatch<AppDispatch>()

  const confirmStatus = useSelector(selectConfirmStatus)
  const isGroupStatusLoading = useSelector(selectIsGroupStatusUpdating)
  const isGroupLoading = useSelector(selectGroupIsLoading)
  const isAllStudentsConfirmed = useSelector(selectIsAllStudentsConfirmed)

  const rawFinishDate = useSelector(selectFinishDate)

  const handleConfirm = () => {
    if (confirmStatus === 2) return

    dispatch(setGroupConfirmStatus({ IS_CONFIRMED: confirmStatus ? 0 : 1 }))
  }

  const buttonColor = !confirmStatus ? 'primary' : 'secondary'
  const finishDate = rawFinishDate && dayjs(rawFinishDate).format('DD.MM.YYYY')

  return (
    <div>
      {confirmStatus !== 2 && (
        <Stack spacing={2}>
          <Typography variant="h4">
            {(finishDate && translate('finishDate', { date: finishDate })) ||
              translate('noFinishDate')}
          </Typography>

          <Stack
            sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}
            direction={'row'}
            spacing={2}
          >
            <Button
              loading={isGroupStatusLoading}
              disabled={!isAllStudentsConfirmed || isGroupLoading}
              onClick={handleConfirm}
              color={buttonColor}
            >
              {(!confirmStatus && translate('confirm')) || translate('cancel')}
            </Button>

            {!isAllStudentsConfirmed && !confirmStatus && (
              <Stack textAlign={'left'}>
                <Typography variant="caption">{translate('confirmInfoTop')}</Typography>

                <Typography variant="caption">{translate('confirmInfoBottom')}</Typography>
              </Stack>
            )}

            {!!confirmStatus && (
              <Typography variant="caption" sx={{ maxWidth: '400px', textAlign: 'left' }}>
                {translate('cancelInfo')}
              </Typography>
            )}
          </Stack>

          <InfoBlock />
        </Stack>
      )}

      {confirmStatus === 2 && (
        <ExtraInformation text={translate('deanConfirmedInfo')} type="info" Icon={InfoOutlined} />
      )}
    </div>
  )
}
