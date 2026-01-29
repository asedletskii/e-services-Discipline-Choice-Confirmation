export function getDccGroupInitialState(): DccGroupSliceState {
  return {
    group: {
      ID: 0,
      NAME: '',
      COURSE: 0,
      SEMESTER: 0,
      CURRICULUM_ID: -1,
      BLOCKS: [],
      CONFIRM_STATUS: 0,
      STUDENTS: [],
    },
    isLoading: true,
    isConfirmStatusUpdating: false,

    ChoiceParams: [],
    isChoiceParamsLoading: true,

    confirmLoadingIds: [],

    curriculum: {
      ID: -1,
      PROFILE_NAME: '',
      PROGRAM_CODE: '',
      PROGRAM_NAME: '',
      EDUCATION_LEVEL: 1,
      DISCIPLINES: [],
    },
    isCurriculumLoading: true,

    finishDate: null,
  }
}
