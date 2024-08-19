import { useToast as baseUseToast } from 'vue-toastification'

// Note: This is a custom composable that wraps the toastification library
// to avoid coupling the toastification library with the rest of the application.

export default function useToast() {
  const toast = baseUseToast()

  function show(type: 'success' | 'info', message: string) {
    toast.clear()

    if (type === 'success') {
      toast.success(message)
      return
    }

    toast(message)
  }

  return {
    show
  }
}
