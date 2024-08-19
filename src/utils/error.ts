/**
 * Function that centralizes error handling logic
 * @param error
 */
export function handleError(error: unknown): void {
  console.error('Handled error:', error)
  // TODO: Add sentry or other error tracking service
}
