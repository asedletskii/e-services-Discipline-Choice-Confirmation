import { combineSlices } from '@reduxjs/toolkit'

export interface AppLazySlices extends Record<string, object> {}

export const rootReducer = combineSlices().withLazyLoadedSlices<AppLazySlices>()
