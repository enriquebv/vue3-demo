import type ApiService from '.'

import Vacancy from '@/domain/Vacancy'
import type Candidate from '@/domain/Candidate'
import { NotFoundError, VacancyNotFoundError } from './exceptions'
import VacancyStage from '@/domain/VacancyStage'

interface RestApiServiceOptions {
  domain: `https://${string}`
  token: string
}

export default class RestApiService implements ApiService {
  private readonly domain: `https://${string}`
  private readonly token: string

  constructor(options: RestApiServiceOptions) {
    if (!options.domain) {
      throw new Error('Domain is required')
    }

    if (!options.domain.startsWith('https://')) {
      throw new Error('Domain must start with https://')
    }

    if (!options.token) {
      throw new Error('Token is required')
    }

    this.domain = options.domain
    this.token = options.token
  }

  private async fetch(endpoint: string): Promise<any> {
    if (!endpoint.startsWith('/')) {
      throw new Error('Endpoint must start with /')
    }

    const uri = `${this.domain}${endpoint}`

    const response = await fetch(uri, {
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    })

    if (!response.ok) {
      if (response.status === 404) {
        throw new NotFoundError()
      }
    }

    const json = await response.json()

    return json
  }

  async fetchVacancy(id: Vacancy['id']): Promise<Vacancy> {
    try {
      const endpoint = `/recruitment/v1/candidate-status/${id}`
      const { data } = await this.fetch(endpoint)

      const stages = [...data]
        .sort((stage) => stage.order)
        .map(
          (stage: any) => new VacancyStage(stage.id, stage.name, stage.companyId, stage.createdAt)
        )

      return new Vacancy(id, stages)
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw new VacancyNotFoundError(id)
      }

      throw error
    }
  }

  async addCandidate(candidate: Candidate): Promise<void> {}

  async editCandidate(candidate: Candidate): Promise<void> {}
}
