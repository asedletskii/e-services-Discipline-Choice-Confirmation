import { Select } from '@nstu/e-services-kit'

type Props = {
  label: string
  options: { text: string; value: number }[]
  value: number | null
  disabled: boolean
  onChange: (value: number) => void
}

export function GroupSelect({ label, options, value, disabled, onChange }: Props) {
  return (
    <Select
      label={label}
      options={options}
      value={value}
      onChange={(v) => onChange(Number(v))}
      disabled={disabled}
      sx={{ maxWidth: '220px', minWidth: '180px' }}
    />
  )
}
