import type Vacancy from './Vacancy'
import type VacancyStatus from './VacancyStatus'

export type PartialCandidate = Omit<Candidate, 'id' | 'createdAt'>

export default class Candidate {
  constructor(
    readonly id: string,
    readonly firstName: string,
    readonly lastName: string,
    readonly vacancyId: Vacancy['id'],
    readonly statusId: VacancyStatus['id'],
    readonly createdAt: string
  ) {}

  setStatus(statusId: VacancyStatus['id']) {
    return new Candidate(
      this.id,
      this.firstName,
      this.lastName,
      this.vacancyId,
      statusId,
      this.createdAt
    )
  }
}
