import { PropsWithChildren } from 'react'
import { LocalizationProvider as KitLocalizationProvider } from '@nstu/e-services-kit'
import { DatePickersLocalizationAdapter } from '@nstu/e-services-kit/muiDatePickers'

export const LocalizationProvider = ({ children }: PropsWithChildren) => {
  return (
    <KitLocalizationProvider dictionaryLoader={dictionaryLoader}>
      <DatePickersLocalizationAdapter>{children}</DatePickersLocalizationAdapter>
    </KitLocalizationProvider>
  )
}

async function dictionaryLoader(lang: AppLanguage) {
  const isDev = process.env['NODE_ENV'] === 'development'
  if (isDev) {
    return (await import('../locale/appLocale.dict')).appLocaleDict[lang]
  }
  return {}
}
