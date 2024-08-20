import type Candidate from './Candidate'

export default class VacancyStatus {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly companyId: string,
    readonly createdAt: string,
    readonly candidates: Candidate[]
  ) {}
}
