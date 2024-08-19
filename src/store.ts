import { defineStore } from 'pinia'

interface State {
  lastCapturedError: unknown | null
}

/**
 * App store that centralizes app state
 * Do not use this directly, use composables.
 */
export const useAppStore = defineStore('appStore', {
  state: (): State => ({
    lastCapturedError: null
  }),
  actions: {
    setLastCapturedError(error: unknown): void {
      this.lastCapturedError = error
    }
  }
})
