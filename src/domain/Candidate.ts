import type Vacancy from './Vacancy'
import type VacancyStage from './VacancyStage'

export type PartialCandidate = Omit<Candidate, 'id' | 'createdAt'>

export default class Candidate {
  constructor(
    readonly id: string,
    readonly firstName: string,
    readonly lastName: string,
    readonly vacancyId: Vacancy['id'],
    readonly stageId: VacancyStage['id'],
    readonly createdAt: string
  ) {}
}
