/**
 * Интерфейс корневого состояния приложения
 * @interface RootState
 */
type RootState = ReturnType<typeof import('@shared/store/store').store.getState>

/**
 * Интерфейс dispatch для ассинхронных действий
 * @interface AppDispatch
 */
type AppDispatch = typeof import('@shared/store/store').store.dispatch

type LoadingStatus = 'idle' | 'loading' | 'fulfilled' | 'error'
