import type ApiService from '.'

import type Vacancy from '@/domain/Vacancy'
import type Candidate from '@/domain/Candidate'

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
    const json = await response.json()

    return json
  }

  async vacancyStatus(id: Vacancy['id']): Promise<unknown> {
    const endpoint = `/recruitment/v1/candidate-status/${id}`

    return this.fetch(endpoint)
  }

  vacancyCandidates(id: Vacancy['id']): Promise<unknown[]> {
    const endpoint = `/recruitment/v1/vacancies/${id}/candidates`

    return this.fetch(endpoint)
  }

  addCandidate(candidate: Candidate): Promise<unknown> {
    return Promise.resolve({})
  }

  editCandidate(candidate: Candidate): Promise<unknown> {
    return Promise.resolve({})
  }
}
