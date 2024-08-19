import type Candidate from '@/domain/Candidate'
import useApiService from './api-service'

export default function useCandidates() {
  const apiService = useApiService()

  async function add(candidate: Omit<Candidate, 'id'>) {
    await apiService.addCandidate(candidate)
  }

  return {
    add
  }
}
