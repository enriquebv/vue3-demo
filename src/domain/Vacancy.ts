import type VacancyStage from './VacancyStage'

export default class Vacancy {
  constructor(
    readonly id: string,
    readonly stages: VacancyStage[]
  ) {}
}
