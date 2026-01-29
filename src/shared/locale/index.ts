import { mergeLocaleDicts } from '@shared/utils/localization'
import { extraDict } from './extra.dict'
import { servicesDict } from './services.dict'

export const sharedDicts = mergeLocaleDicts(extraDict, servicesDict)
