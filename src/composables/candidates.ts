import useApiService from './api-service'
import type { PartialCandidate } from '@/domain/Candidate'

export default function useCandidates() {
  const apiService = useApiService()

  async function add(candidate: PartialCandidate) {
    await apiService.addCandidate(candidate)
  }

  return {
    add
  }
}
