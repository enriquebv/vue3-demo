import { ref } from 'vue'

export default function useBoard() {
  const activeTabId = ref('vacancies')

  const setActiveTab = (tabId: string) => (activeTabId.value = tabId)

  return {
    activeTabId,
    setActiveTab
  }
}
