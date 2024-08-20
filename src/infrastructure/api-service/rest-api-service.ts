import type ApiService from '.'

import Vacancy from '@/domain/Vacancy'
import Candidate from '@/domain/Candidate'
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

  private async fetch(
    endpoint: string,
    options: { method?: string; payload?: any } = {}
  ): Promise<any> {
    if (!endpoint.startsWith('/')) {
      throw new Error('Endpoint must start with /')
    }

    const uri = `${this.domain}${endpoint}`

    const response = await fetch(uri, {
      headers: {
        Authorization: `Bearer ${this.token}`
      },
      method: options.method || 'GET',
      body: options.payload ? JSON.stringify(options.payload) : undefined
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

      const candidates = await this.fetchVacancyCandidates(id)

      const stages = [...data]
        .sort((stage) => stage.order)
        .map(
          (stage: any) =>
            new VacancyStage(
              stage.id,
              stage.name,
              stage.companyId,
              stage.createdAt,
              candidates.filter((candidate) => candidate.stageId === stage.id)
            )
        )

      return new Vacancy(id, stages)
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw new VacancyNotFoundError(id)
      }

      throw error
    }
  }

  private async fetchVacancyCandidates(id: Vacancy['id']): Promise<Candidate[]> {
    const endpoint = `/recruitment/v1/vacancies/${id}/candidates`
    const { data } = await this.fetch(endpoint)

    return data.map(
      (candidate: any) =>
        new Candidate(
          candidate.id,
          candidate.firstName,
          candidate.lastName,
          id,
          candidate.statusId,
          candidate.createdAt
        )
    )
  }

  async addCandidate(candidate: Omit<Candidate, 'id'>): Promise<void> {
    const endpoint = '/recruitment/v1/candidates'

    await this.fetch(endpoint, {
      method: 'POST',
      payload: candidate
    })
  }

  async editCandidate(candidate: Candidate): Promise<void> {}
}
