import { useRef } from 'react'
import {
  getCurriculumById,
  getGroupStudents,
  selectGroupIsLoading,
} from '@features/disciplinesChoiceConfirmation/store/disciplinesChoiceConfirmationGroup'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router'

export function useChoiceSelectors(selectBlock: ChoiceRequestParams) {
  const dispatch = useDispatch<AppDispatch>()
  const [searchParams, setSearchParams] = useSearchParams()

  const requestRef = useRef<any>(null)
  const requestCountRef = useRef(0)

  const prevGroupIdRef = useRef<number | null>(null)
  const prevSemesterRef = useRef<number | null>(null)

  const isGroupLoading = useSelector(selectGroupIsLoading)

  const groupId = Number(searchParams.get('group')) || null
  const semester = Number(searchParams.get('semester')) || null

  const currentGroup = selectBlock.find((g) => g.ID === groupId) ?? null

  const rememberPrev = () => {
    prevGroupIdRef.current = groupId
    prevSemesterRef.current = semester
  }

  const updateParams = (params: Record<string, string | number | null>) => {
    const cleaned: Record<string, string> = {}
    Object.entries(params).forEach(([k, v]) => {
      if (v !== null && v !== undefined) cleaned[k] = String(v)
    })
    setSearchParams(cleaned)
  }

  const runRequest = (thunk: any) => {
    requestRef.current = dispatch(thunk)
    requestCountRef.current++
    return requestRef.current.unwrap?.()
  }

  const handleGroupChange = async (newGroupId: number) => {
    rememberPrev()
    const newGroup = selectBlock.find((g) => g.ID === newGroupId)
    if (!newGroup) return

    const newSemester =
      semester && newGroup.SEMESTERS.includes(semester) ? semester : null

    if (newSemester) {
      await runRequest(getGroupStudents({ GROUP_ID: newGroupId, SEMESTER: newSemester }))
    }

    if (currentGroup?.CURRICULUM_ID !== newGroup.CURRICULUM_ID) {
      await runRequest(getCurriculumById({ CURRICULUM_ID: newGroup.CURRICULUM_ID }))
    }

    updateParams({ group: newGroupId, semester: newSemester })
  }

  const handleSemesterChange = (newSemester: number) => {
    rememberPrev()
    if (!currentGroup) return

    updateParams({ group: currentGroup.ID, semester: newSemester })
    runRequest(getGroupStudents({ GROUP_ID: currentGroup.ID, SEMESTER: newSemester }))
  }

  const cancelRequest = () => {
    requestRef.current?.abort()
    requestRef.current = null

    updateParams({
      group: prevGroupIdRef.current,
      semester: prevSemesterRef.current,
    })
  }

  return {
    groupId,
    semester,
    currentGroup,
    isGroupLoading,
    requestCountRef,
    handleGroupChange,
    handleSemesterChange,
    cancelRequest,
  }
}
