import { disciplinesChoiceConfirmationServiceDict } from '@features/disciplinesChoiceConfirmation/locale'
import { sharedDicts } from '@shared/locale'
import { mergeLocaleDicts } from '@shared/utils/localization'

export const appLocaleDict = mergeLocaleDicts(sharedDicts, disciplinesChoiceConfirmationServiceDict)
