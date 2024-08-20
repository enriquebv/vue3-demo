import { useAppStore } from '@/store'
import { watch } from 'vue'

/**
 * This function is used to catch async errors and send it to
 * app error handler.
 * @example
 * const { catchError } = useErrorHandler()
 * this.asyncOperation().catch(catchError)
 */
export default function useErrorHandler(onError?: (error: unknown) => void) {
  const appStore = useAppStore()

  function catchError(error: unknown): void {
    appStore.setLastCapturedError(error)
  }

  // Demo: If any error is catched, and composable owner wants to
  // handle it, it can pass a callback
  watch(
    () => appStore.lastCapturedError,
    (error) => {
      if (error && onError) {
        onError(error)
      }
    }
  )

  return {
    catchError,
    lastCapturedError: appStore.lastCapturedError
  }
}
