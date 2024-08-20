import type { App } from 'vue'
import type ApiService from './infrastructure/api-service'
import RestApiService from './infrastructure/api-service/rest-api-service'

// Demo: This file will inject dependencies into the Vue app.
// This is useful to mock dependencies in tests.

export const DEPENDENCY_KEYS = {
  API_SERVICE: Symbol('api-service')
} as const

export default function injectDependencies(app: App) {
  app.provide<ApiService>(
    DEPENDENCY_KEYS.API_SERVICE,
    new RestApiService({
      domain: import.meta.env.VITE_API_DOMAIN as `https://${string}`,
      token: import.meta.env.VITE_API_TOKEN as string
    })
  )
}
