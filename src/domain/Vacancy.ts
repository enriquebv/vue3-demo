import type VacancyStatus from './VacancyStatus'

export default class Vacancy {
  constructor(
    readonly id: string,
    readonly stages: VacancyStatus[]
  ) {}
}
