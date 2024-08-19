import type Vacancy from './Vacancy'
import type VacancyStage from './VacancyStage'

export default class Candidate {
  constructor(
    readonly id: string,
    readonly firstName: string,
    readonly lastName: string,
    readonly vacancyId: Vacancy['id'],
    readonly stageId: VacancyStage['id']
  ) {}
}
