import React from 'react'
import { DoneAllOutlined, DoneOutlined } from '@mui/icons-material'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from '@mui/material'
import { useTranslate } from '@shared/hooks'
import { createSearchParams, Link } from 'react-router'

type Props = {
  data: FlatCurriculum['DISCIPLINES']
  isLinks: boolean
}

export function CurriculumTable({ data, isLinks }: Props) {
  const translate = useTranslate('CurriculumTable')

  const tableHeaders: { id?: string; label: string }[] = [
    { label: '№' },
    { label: translate('discipline') },
    { label: translate('semester') },
    { label: translate('department') },
    { label: translate('credits') },
    { label: translate('examType') },
    ...data[0].CHOICE_STATS.flatMap(({ COURSE, GROUPS }) => [
      ...GROUPS.map((g) => ({ id: `group-${g.ID}`, label: g.NAME })),
      { id: `course-${COURSE}`, label: translate('course', { course: COURSE }) },
    ]),
  ]

  const ConfirmStatus = ({ status }: { status: ChoiceConfirmStatus }) => {
    if (status === 0) return null

    const title = status === 1 ? translate('tutorConfirm') : translate('deanConfirm')
    const Icon = status === 1 ? DoneOutlined : DoneAllOutlined

    return (
      <Tooltip title={title}>
        <Icon fontSize="small" color="primary" />
      </Tooltip>
    )
  }

  const linkCellStyle: React.CSSProperties = {
    cursor: isLinks ? 'pointer' : 'default',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    textDecoration: 'none',
    padding: '16px',
    margin: 0,
    color: 'inherit',
    alignItems: 'center',
    justifyContent: 'center',
    boxSizing: 'border-box',
  }

  const Container: any = isLinks ? Link : 'div'

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow sx={{ whiteSpace: 'nowrap' }}>
            {tableHeaders.map((header, i) => (
              <TableCell key={header.id ?? i} id={header.id ?? undefined}>
                {header.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {data.map((discipline, i) => (
            <TableRow
              key={i}
              sx={{
                whiteSpace: 'pre-wrap',
                '& > td': { textAlign: 'center', verticalAlign: 'middle' },
              }}
            >
              <TableCell>
                {discipline.INDEX_PER_BLOCK === 0 && discipline.BLOCK_INDEX + 1}
              </TableCell>

              <TableCell sx={{ minWidth: '350px', textAlign: 'left !important' }}>
                {discipline.NAME}
              </TableCell>

              <TableCell>{discipline.SEMESTER}</TableCell>

              <TableCell>{discipline.DEPARTMENT}</TableCell>

              <TableCell>{discipline.CREDITS}</TableCell>

              <TableCell>{translate(discipline.EXAM_TYPE)}</TableCell>

              {discipline.CHOICE_STATS.map((course) => (
                <React.Fragment key={course.COURSE}>
                  {course.GROUPS.map((group) => (
                    <TableCell
                      key={group.ID}
                      sx={(theme) => ({
                        p: 0,
                        '&:hover': {
                          backgroundColor: `${theme.palette.surface.dark} !important`,
                        },
                      })}
                    >
                      <Container
                        {...(isLinks && {
                          to: {
                            pathname: `/services/dcc/groupChoice`,
                            search: `?${createSearchParams({
                              group: String(group.ID),
                              semester: String(discipline.SEMESTER),
                            }).toString()}`,
                          },
                        })}
                        style={linkCellStyle}
                      >
                        {`${group.CHOSE_COUNT}/${group.STUDENT_TOTAL}`}

                        <br />

                        <ConfirmStatus status={group.CONFIRM_STATUS} />
                      </Container>
                    </TableCell>
                  ))}

                  <TableCell align="center">
                    {course.STUDENT_TOTAL && `${course.CHOSE_COUNT}/${course.STUDENT_TOTAL}`}
                  </TableCell>
                </React.Fragment>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
