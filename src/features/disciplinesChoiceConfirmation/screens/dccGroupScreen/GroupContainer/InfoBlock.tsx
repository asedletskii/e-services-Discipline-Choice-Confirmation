import { useState } from 'react'
import { CheckBoxOutlineBlank, Close, InfoOutlined } from '@mui/icons-material'
import { Box } from '@mui/material'
import { ClickableIcon, ExtraInformation } from '@nstu/e-services-kit'
import { useTranslate } from '@shared/hooks'

export function InfoBlock() {
  const translate = useTranslate('InfoBlock')

  const [visibleInfo, setVisibleInfo] = useState(() => {
    return localStorage.getItem('dccInfoBlockHidden') !== 'true'
  })

  const handleClose = () => {
    setVisibleInfo(false)
    localStorage.setItem('dccInfoBlockHidden', 'true')
  }

  return (
    <div>
      {visibleInfo && (
        <Box sx={{ position: 'relative' }}>
          <ExtraInformation
            text={
              <>
                {translate('infoLeft')}

                <CheckBoxOutlineBlank sx={{ color: 'gray.main', mx: 1 }} fontSize="small" />

                {translate('infoRight')}

                <Box sx={{ position: 'absolute', top: 12, right: 12, mx: 2 }}>
                  <ClickableIcon Icon={Close} onClick={handleClose} tooltip={translate('hide')} />
                </Box>
              </>
            }
            type="info"
            Icon={InfoOutlined}
          />
        </Box>
      )}
    </div>
  )
}
