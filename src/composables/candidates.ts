import type Candidate from '@/domain/Candidate'
import useApiService from './api-service'
import type { PartialCandidate } from '@/domain/Candidate'
import type VacancyStatus from '@/domain/VacancyStatus'

export default function useCandidates() {
  const apiService = useApiService()

  async function add(candidate: PartialCandidate) {
    await apiService.addCandidate(candidate)
  }

  async function changeStatus(candidate: Candidate, nextStageId: VacancyStatus['id']) {
    const mutatedCandidate = candidate.setStatus(nextStageId)

    await apiService.persistCandidate(mutatedCandidate)
  }

  return {
    add,
    changeStatus
  }
}
