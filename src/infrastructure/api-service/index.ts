import type Candidate from '@/domain/Candidate'
import type Vacancy from '@/domain/Vacancy'

export default interface ApiService {
  vacancyStatus(id: Vacancy['id']): Promise<unknown>
  vacancyCandidates(id: Vacancy['id']): Promise<unknown[]>
  addCandidate(candidate: Candidate): Promise<unknown>
  editCandidate(candidate: Candidate): Promise<unknown>
}
