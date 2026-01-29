import { api } from '@shared/api'

class DisciplinesChoiceConfirmation_api {
  baseUrl = ''

  /**
   * Проверка доступности сервиса
   * @returns IS_AVAILABLE: boolean
   * false - сервис недоступен
   * true - сервис доступен
   */
  async getServiceAvailability(): Promise<boolean> {
    const url = `${this.baseUrl}/enableDisciplineConfirmation`

    const response = await api.get(url)
    return response.data.IS_AVAILABLE
  }

  /**
   * Получить список учебных планов и сводную информацию о выборе дисциплин всеми группами
   * по указанному учебному плану
   * @returns Массив учебных планов сос сводными данными о выборе дисциплин
   */
  async getCurriculums(): Promise<{ DATA: Curriculum[] }> {
    const url = `${this.baseUrl}/get_plans/`

    const response = await api.get<{ DATA: Curriculum[] }>(url)

    return response.data
  }

  /**
   * Получить массив групп и их семестров для селектов страницы подтверждения выборов
   * @returns Массив групп
   */
  async getChoiceParams(): Promise<ChoiceRequestParams> {
    const url = `${this.baseUrl}/get_groups/`

    const response = await api.get<ChoiceRequestParams>(url)
    return response.data
  }

  /**
   * Получить подробный список студентов определенной группы с их выборами дисциплин
   * @param groupId - ID группы
   * @param semester - номер семестра
   * @returns
   * GROUP_CHOICE - Объект группы с массивом студентов внутри
   * FINISH_DATE - дата дедлайна для фиксации
   */
  async getStudentsChoices(
    GROUP_ID: number,
    SEMESTER: number,
  ): Promise<{ GROUP_CHOICE: GroupChoiceApiResponse; FINISH_DATE: FinishDate }> {
    const url = `${this.baseUrl}/get_group_studs/${GROUP_ID}/${SEMESTER}`

    const response = await api.get<{
      DATA: {
        GROUP_CHOICE: GroupChoiceApiResponse
        FINISH_DATE: FinishDate
      }
    }>(url)
    return response.data.DATA
  }

  /**
   * Получить учебный план для сводной таблицы
   * @param CURRICULUM_ID - ID группы
   * @returns Объект учебного плана
   */
  async getCurriculumById(CURRICULUM_ID: number): Promise<{ DATA: Curriculum }> {
    const url = `${this.baseUrl}/get_one_plan/${CURRICULUM_ID}`

    const response = await api.get<{ DATA: Curriculum }>(url)
    return response.data
  }

  /**
   * Подтвержает/отменяет подтверждение выбора дисциплин у студента, а также позволяет выбрать дисциплины за студента
   * @param groupId - ID группы
   * @param student - объект содержащий idCard студента, выборы тьютора, и статус подтверждения
   * @returns boolean
   * true - выборы успешно зафиксированы
   * false - не получилось обновить выборы
   */
  async confirmStudents({
    GROUP_ID,
    SEMESTER,
    STUDENTS_CHOICES,
  }: {
    GROUP_ID: number
    SEMESTER: number
    STUDENTS_CHOICES: {
      ID_CARD: number
      IS_CONFIRMED: 0 | 1
      TUTOR_CHOICES?: {
        BLOCK_ID: number
        DISCIPLINES_IDS: (number | null)[]
      }[]
    }[]
  }): Promise<boolean> {
    const url = `${this.baseUrl}/updateChoice/`

    const params = {
      GROUP_ID,
      SEMESTER,
      STUDENTS_CHOICES,
    }

    const response = await api.post(url, { params })
    return response.data
  }

  /**
   * Установка статуса фиксвции группы
   * @param GROUP_ID - ID группы
   * @param SEMESTER - номер семестра
   * @param IS_CONFIRMED - статус подтверждения 0 - снять фиксацию 1 - зафиксировать
   * @returns boolean
   * true - статус установлен
   * false - не получилось установить статус
   */
  async setGroupConfirmationStatus(
    GROUP_ID: number,
    SEMESTER: number,
    IS_CONFIRMED: 0 | 1,
  ): Promise<boolean> {
    const url = `${this.baseUrl}/setGroupStatus`

    const params = {
      GROUP_ID,
      SEMESTER,
      IS_CONFIRMED,
    }

    const response = await api.post(url, { params })
    return response.data
  }
}

export const disciplinesChoiceConfirmation_api = new DisciplinesChoiceConfirmation_api()
