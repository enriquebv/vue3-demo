import { DEPENDENCY_KEYS } from '@/di'
import type ApiService from '@/infrastructure/api-service'
import { inject } from 'vue'

export default function useApiService(): ApiService {
  const service = inject<ApiService>(DEPENDENCY_KEYS.API_SERVICE)

  if (!service) {
    throw new Error('ApiService is not provided, check Vue dependency injection')
  }

  return service
}
