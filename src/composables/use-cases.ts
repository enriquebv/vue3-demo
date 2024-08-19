import useApiService from './api-service'

export default function useUseCases() {
  const apiService = useApiService()

  return {
    vacancyStatus: apiService.fetchVacancy,
    vacancyCandidates: apiService.vacancyCandidates,
    addCandidate: apiService.addCandidate,
    editCandidate: apiService.editCandidate
  }
}
