import type { PartialCandidate } from '@/domain/Candidate'
import type Candidate from '@/domain/Candidate'
import type Vacancy from '@/domain/Vacancy'

export default interface ApiService {
  fetchVacancy(id: Vacancy['id']): Promise<Vacancy>
  addCandidate(candidate: PartialCandidate): Promise<void>
  editCandidate(candidate: Candidate): Promise<void>
}
