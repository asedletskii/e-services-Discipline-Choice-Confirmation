type AppLanguage = 'ru' | 'en'

type LocaleDictionary = Record<AppLanguage, Record<LocaleBlockName, LocaleBlock>>

type LocaleBlock = Record<LocaleKey, LocaleValue>
type LocaleBlockName = string

type LocaleKey = string
type LocaleValue = string

/**
 * Интерфейс словаря для любого из языков
 * @interface LanguageDictionary
 */
type AppLocaleDictionary = (typeof import('src/app/locale').appLocaleDict)['ru']

/**
 * Интерфейс ключей словаря для любого из языков
 * @interface LanguageDictionaryBlock
 */
type AppLocaleDictionaryBlock = keyof AppLocaleDictionary

/**
 * Интерфейс значений словаря для конкретного ключа
 * @interface LanguageDictionaryBlockKey
 */
type AppLocaleDictionaryBlockKey<T extends AppLocaleDictionaryBlock> = keyof AppLocaleDictionary[T]
