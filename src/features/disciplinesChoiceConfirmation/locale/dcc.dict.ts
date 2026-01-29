export const disciplinesChoiceConfirmationServiceDict = {
  ru: {
    CurriculumScreen: {
      screenTitle: 'Подтверждение выбора дисциплин',
      ignoredCourse: '{{course}} курс',
    },

    SearchBar: {
      search: 'Найти группу',
    },

    CurriculumSearch: {
      label: 'Найти группу',
    },

    CurriculumHeader: {
      1: 'бакалавриат',
      2: 'магистратура',
      3: 'СПО',
      4: 'аспирантура',
    },

    CurriculumContainer: {
      show: 'Показывать',
    },

    CurriculumTable: {
      discipline: 'Дисциплина',
      semester: 'Семестр',
      department: 'Кафедра',
      credits: 'Кредитов',
      examType: 'зач/экз',
      course: '{{course}} курс',
      1: 'экз',
      0: 'зач',
      tutorConfirm: 'Выбор зафиксирован тьютором',
      deanConfirm: 'Выбор зафиксирован деканатом',
    },

    GroupScreen: {
      screenTitle: 'Выбор студентов',
      group: 'Только {{group}}',
      course: 'Только {{course}} курс',
      semester: 'Только {{semester}} семестр',
    },

    ConfirmGroupBlock: {
      confirm: 'Зафиксировать',
      cancel: 'Отменить фиксацию',
      confirmInfoTop: 'Чтобы зафиксировать выбор группы,',
      confirmInfoBottom: 'отметьте выбор всех студентов как "провереный"',
      cancelInfo: 'Если Вам нужно отредактировать выбор студентов, отмените фиксацию',
      finishDate: 'Фиксация выбора (до {{date}})',
      noFinishDate: 'Фиксация выбора',
      deanConfirmedInfo: 'Данные зафиксированы деканатом, редактирование недоступно',
    },

    GroupContainer: {
      studentsList: 'Выбор студентов',
      group: 'Группа',
      semester: 'Семестр',
      semesterValue: '{{value}} cеместр',
      cancel: 'Отменить запрос',
    },

    InfoBlock: {
      infoLeft: `Чтобы отметить, что Вы проверили выбор студента, нажмите на`,
      infoRight: 'в последнем столбце',
      hide: 'Скрыть',
    },

    GroupTable: {
      student: 'Студент',
      studentChoice: 'Выбор студента',
      tutorChoice: 'Выбор тьютора',
      optional: 'Факультативы',
    },
  },

  en: {},
} satisfies LocaleDictionary
