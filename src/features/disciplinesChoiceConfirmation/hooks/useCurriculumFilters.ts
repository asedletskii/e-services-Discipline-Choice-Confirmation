import { useCallback, useMemo, useState } from 'react'

export function useCurriculumFilters({
  data,
  initFilters,
}: {
  data: FlatCurriculum['DISCIPLINES']
  initFilters: CurriculumFilter[]
}) {
  const [filters, setFilters] = useState<CurriculumFilter[]>(initFilters)

  const toggleFilter = useCallback((type: CurriculumFilter['type'], value: number) => {
    setFilters((prev) =>
      prev.map((f) =>
        f.type === type && f.value === value ? { ...f, isChecked: !f.isChecked } : f,
      ),
    )
  }, [])

  const filteredData: FlatCurriculum['DISCIPLINES'] = useMemo(() => {
    const activeFilters = filters.reduce<Partial<Record<CurriculumFilter['type'], number[]>>>(
      (acc, curr) => {
        if (!curr.isChecked) return acc

        if (acc[curr.type]) {
          acc[curr.type]?.push(curr.value)
        } else {
          acc[curr.type] = [curr.value]
        }

        return acc
      },
      {},
    )

    return data
      .filter((discipline) => activeFilters.semester?.includes(discipline.SEMESTER) ?? true)
      .map((d) => ({
        ...d,
        CHOICE_STATS: d.CHOICE_STATS.filter((c) => activeFilters.course?.includes(c.COURSE) ?? true)
          .map((c) => ({
            ...c,
            GROUPS: c.GROUPS.filter((g) => activeFilters.group?.includes(g.ID) ?? true),
          }))
          .filter((c) => c.GROUPS.length > 0),
      }))
  }, [data, filters])

  return { filters, toggleFilter, filteredData }
}
