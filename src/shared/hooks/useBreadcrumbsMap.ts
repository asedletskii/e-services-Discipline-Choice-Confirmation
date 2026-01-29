import { useTranslate } from './useTranslate'

export function useBreadCrumbsMap(pathname: string) {
  const lastRoute = pathname.slice().split('/').pop()

  const translate = useTranslate('BreadCrumb')

  if (lastRoute === 'services' || lastRoute === 'dcc') {
    return translate(lastRoute)
  }

  if (lastRoute === 'groupChoice' && pathname.includes('dcc/')) {
    return translate('groupChoice')
  }

  console.warn('No text was provided for breadcrumb on pathname', pathname)

  return null
}