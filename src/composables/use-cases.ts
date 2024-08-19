import useApiService from './api-service'

export default function useUseCases() {
  const apiService = useApiService()

  return {
    vacancyStatus: apiService.vacancyStatus,
    vacancyCandidates: apiService.vacancyCandidates,
    addCandidate: apiService.addCandidate,
    editCandidate: apiService.editCandidate
  }
}
