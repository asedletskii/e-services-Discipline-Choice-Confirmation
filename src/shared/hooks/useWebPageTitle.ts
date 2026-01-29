import { useEffect } from 'react'

const isDev = process.env['NODE_ENV'] === 'development'

export function useWebPageTitle(title: string, withPostfix = true) {
  const prevTitle = document.title

  useEffect(() => {
    /** Приписка в dev-режиме бывает полезна, когда еще запущена prod-версия в другой вкладке */
    document.title = (isDev ? 'ⓓ ' : '') + title + (withPostfix ? ' – E-Services' : '')

    return () => {
      document.title = prevTitle
    }
  }, [title, prevTitle, withPostfix])
}
