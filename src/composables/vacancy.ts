import { onMounted, ref } from 'vue'
import useApiService from './api-service'
import useErrorHandler from './error-handler'
import type Vacancy from '@/domain/Vacancy'

export default function useVacancy(id: string) {
  const apiService = useApiService()
  const { catchError } = useErrorHandler()

  const vacancy = ref<Vacancy | null>(null)
  const loading = ref(false)

  async function fetchVacancy() {
    loading.value = true

    try {
      vacancy.value = await apiService.fetchVacancy(id)
    } catch (error) {
      catchError(error)
    } finally {
      loading.value = false
    }
  }

  onMounted(fetchVacancy)

  return {
    vacancy,
    loading,
    refetch: fetchVacancy
  }
}
