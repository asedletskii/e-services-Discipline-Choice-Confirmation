import { columnCoordinates } from '@features/disciplinesChoiceConfirmation/constants/groupTable'
import {
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import { getPersonFIO, UserAvatar } from '@nstu/e-services-kit'
import { useTranslate } from '@shared/hooks'
import { ChoiceCellContainer } from './ChoiceCellContainer'
import { ConfirmationCheckboxCell } from './ConfirmationCheckboxCell'

type Props = {
  groupChoice: GroupChoice
}

export function GroupTable({ groupChoice }: Props) {
  const translate = useTranslate('GroupTable')

  const tableHeader: string[] = [
    '№',
    translate('student'),
    translate('studentChoice'),
    translate('tutorChoice'),
  ]

  return (
    <TableContainer>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            {tableHeader.map((header, i) => (
              <TableCell
                key={i}
                sx={i < 3 ? { position: 'sticky', left: columnCoordinates[i], zIndex: 4 } : {}}
              >
                {header}
              </TableCell>
            ))}

            <ConfirmationCheckboxCell
              students={groupChoice.STUDENTS}
              curriculumId={groupChoice.CURRICULUM_ID}
              isMaster={true}
            />
          </TableRow>
        </TableHead>

        <TableBody>
          {groupChoice.STUDENTS.map((student, i) => (
            <TableRow key={student.ID_CARD}>
              <TableCell
                sx={{ width: '60px', position: 'sticky', left: columnCoordinates[0], zIndex: 3 }}
              >
                {i + 1}
              </TableCell>

              <TableCell
                sx={{
                  minWidth: '200px',
                  position: 'sticky',
                  left: columnCoordinates[1],
                  zIndex: 3,
                  whiteSpace: 'nowrap',
                }}
              >
                <Stack spacing={1} alignItems={'center'} direction="row">
                  <UserAvatar size={36} url={student.PHOTO} />

                  <Typography>{getPersonFIO(student)}</Typography>
                </Stack>
              </TableCell>

              <ChoiceCellContainer
                choice={student.CHOICE}
                studentIdCard={student.ID_CARD}
                isConfirmed={student.IS_CONFIRMED}
              />
              <ConfirmationCheckboxCell
                students={[student]}
                curriculumId={groupChoice.CURRICULUM_ID}
              />
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
