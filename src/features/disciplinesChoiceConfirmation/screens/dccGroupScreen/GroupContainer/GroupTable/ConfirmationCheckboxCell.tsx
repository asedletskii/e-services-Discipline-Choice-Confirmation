import {
  confirmStudentsChoice,
  getCurriculumById,
  selectIsCheckboxDisabled,
  selectIsCheckboxLoading,
} from '@features/disciplinesChoiceConfirmation/store/disciplinesChoiceConfirmationGroup'
import { canConfirmStudent } from '@features/disciplinesChoiceConfirmation/utils'
import { Checkbox, CircularProgress, TableCell } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'

type Props = {
  students: StudentChoice[]
  curriculumId: number
  isMaster?: boolean
}

export function ConfirmationCheckboxCell({ students, curriculumId, isMaster = false }: Props) {
  const dispatch = useDispatch<AppDispatch>()

  const isDisabled = useSelector(selectIsCheckboxDisabled(students))
  const isLoading = useSelector(selectIsCheckboxLoading(students))

  const allConfirmed = students.every((s) => s.IS_CONFIRMED === 1)

  const handleMasterChange = async (_: any, checked: boolean) => {
    const updatableStudents: { ID_CARD: number; IS_CONFIRMED: 0 | 1 }[] = students
      .filter((s) => canConfirmStudent(s) && s.IS_CONFIRMED !== (checked ? 1 : 0))
      .map((student) => {
        return {
          ID_CARD: student.ID_CARD,
          IS_CONFIRMED: student.IS_CONFIRMED ? 0 : 1,
        }
      })

    if (updatableStudents.length === 0) return

    await dispatch(confirmStudentsChoice({ STUDENTS: updatableStudents }))

    if (updatableStudents.length > 0) {
      dispatch(getCurriculumById({ CURRICULUM_ID: curriculumId }))
    }
  }

  const handleChange = async (_: any, checked: boolean) => {
    await dispatch(
      confirmStudentsChoice({
        STUDENTS: [
          {
            ID_CARD: students[0].ID_CARD,
            IS_CONFIRMED: checked ? 1 : 0,
          },
        ],
      }),
    )
    dispatch(getCurriculumById({ CURRICULUM_ID: curriculumId }))
  }

  const isChecked = students[0]?.IS_CONFIRMED ? true : false

  return (
    <TableCell sx={{ maxWidth: '64px', p: 0, verticalAlign: 'middle', textAlign: 'center' }}>
      {isLoading ? (
        <CircularProgress size={20} />
      ) : (
        <Checkbox
          checked={isMaster ? allConfirmed : isChecked}
          onChange={isMaster ? handleMasterChange : handleChange}
          disabled={isDisabled}
        />
      )}
    </TableCell>
  )
}
