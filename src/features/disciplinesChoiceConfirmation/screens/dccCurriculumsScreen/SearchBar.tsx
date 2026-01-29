import { useState } from 'react'
import { selectCurriculumsGroups } from '@features/disciplinesChoiceConfirmation/store/disciplinesChoiceConfirmationCurriculums'
import { Search } from '@mui/icons-material'
import { Autocomplete, createFilterOptions, InputAdornment, TextField } from '@mui/material'
import { ContentBlock } from '@nstu/e-services-kit'
import { useTranslate } from '@shared/hooks'
import { useSelector } from 'react-redux'

type GroupOption = { id: number; label: string }

type Props = {
  onResetFilters: () => void
}

const filter = createFilterOptions<GroupOption>({
  stringify: (option) => option.label,
  matchFrom: 'any',
  ignoreCase: true,
  trim: true,
})

export function SearchBar({ onResetFilters }: Props) {
  const translate = useTranslate('SearchBar')

  const groupMap = useSelector(selectCurriculumsGroups)

  const groupOptions: GroupOption[] = Array.from(groupMap, ([id, label]) => ({ id, label }))

  const [value, setValue] = useState<GroupOption | string | null>(null)

  const scrollToGroup = (groupId: number) => {
    const el = document.getElementById(`group-${groupId}`)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' })
      el.classList.remove('highlightAnimation')
      el.classList.add('highlightAnimation')
    }
  }

  const handleChange = (_: any, newValue: GroupOption | string | null) => {
    setValue(newValue)
    onResetFilters()

    if (typeof newValue === 'string') {
      const group = groupOptions.find((g) => g.label.toLowerCase().includes(newValue.toLowerCase()))
      if (group) {
        setTimeout(() => {
          scrollToGroup(group.id)
        }, 0)
      }
    } else if (newValue) {
      setTimeout(() => {
        scrollToGroup(newValue.id)
      }, 0)
    }
  }

  function getOptionLabel(option: GroupOption | string | null): string {
    return typeof option === 'string' ? option : (option?.label ?? '')
  }

  return (
    <ContentBlock>
      <Autocomplete
        value={value}
        onChange={handleChange}
        freeSolo
        options={groupOptions}
        filterOptions={filter}
        getOptionLabel={getOptionLabel}
        popupIcon={false}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder={translate('search')}
            hiddenLabel
            slotProps={{
              input: {
                ...params.InputProps,
                startAdornment: (
                  <InputAdornment position="start">
                    <Search sx={{ color: 'gray.main' }} />
                  </InputAdornment>
                ),
              },
            }}
          />
        )}
      />
    </ContentBlock>
  )
}
