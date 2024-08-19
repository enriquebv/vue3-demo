<script setup lang="ts">
import UIBoard from '../UIBoard/UIBoard.vue'
import { useRoute } from 'vue-router'
import useVacancy from '@/composables/vacancy'
import { computed, ref } from 'vue'
import SkeletonFallback from '@/ui/SkeletonFallback.vue'
import AppTabs from '../AppTabs.vue'
import InputText from '../InputText.vue'
import EnvelopeIcon from '../icons/EnvelopeIcon.vue'
import UIButton from '../UIButton.vue'
import InboxIcon from '../icons/InboxIcon.vue'
import UserIcon from '../icons/UserIcon.vue'
import ConfettiIcon from '../icons/ConfettiIcon.vue'
import StopIcon from '../icons/StopIcon.vue'
import AddCandidateDialog from '../vacancies/AddCandidateDialog.vue'
import useCandidates from '@/composables/candidates'
import useToast from '@/composables/toast'
import useErrorHandler from '@/composables/error-handler'

const route = useRoute()

const { loading, vacancy, refetch: refetchVacancy } = useVacancy(route.params.id as string)
const candidates = useCandidates()
const toast = useToast()
const errorHandler = useErrorHandler()

const activeTabId = ref('vacancies')
const searchTerm = ref('')
const showAddCandidateDialog = ref(false)
const creatingCandidate = ref(false)

const TABS = [
  { id: 'vacancies', label: 'Vacantes' },
  { id: 'candidates', label: 'Candidatos' }
]

const onTabChange = (tabId: string) => {
  activeTabId.value = tabId
}

type ColumnProps = InstanceType<typeof UIBoard>['$props']['columns'][number]

// Note: Currently the API does not return the type of the stage, so we are using the index to apply visual configurations
const COLUMN_CONFIG_BY_STAGE_INDEX: Record<number, Pick<ColumnProps, 'color' | 'titleIcon'>> = {
  0: {
    color: 'blue',
    titleIcon: InboxIcon
  },
  1: {
    color: 'blue',
    titleIcon: InboxIcon
  },
  2: {
    color: 'turquoise',
    titleIcon: UserIcon
  },
  3: {
    color: 'green',
    titleIcon: ConfettiIcon
  },
  4: {
    color: 'red',
    titleIcon: StopIcon
  }
} as const

const boardColumns = computed(() => {
  if (!vacancy.value) return []

  const columns: InstanceType<typeof UIBoard>['$props']['columns'] = vacancy.value?.stages.map(
    (stage, index) => {
      return {
        id: stage.id,
        title: stage.name,
        color: COLUMN_CONFIG_BY_STAGE_INDEX[index].color,
        titleIcon: COLUMN_CONFIG_BY_STAGE_INDEX[index].titleIcon
      }
    }
  )

  return columns
})

async function onAddCandidate(partial: { firstName: string; lastName: string }) {
  if (!vacancy.value) {
    throw new Error('Vacancy is missing')
  }

  creatingCandidate.value = true

  try {
    await candidates.add({
      ...partial,
      vacancyId: vacancy.value.id,
      stageId: vacancy.value.stages[0].id
    })
    toast.show('success', '¡Candidato añadido!')
    await refetchVacancy()
    showAddCandidateDialog.value = false
  } catch (error) {
    errorHandler.catchError(error)
  } finally {
    creatingCandidate.value = false
  }
}
</script>

<template>
  <SkeletonFallback v-if="loading" />
  <template v-else>
    <div class="flex flex-col h-full">
      <AppTabs :tabs="TABS" :active-tab-id="activeTabId" @change="onTabChange" />
      <div class="py-4 flex justify-between">
        <InputText :value="searchTerm" placeholder="Buscar">
          <template #pre-icon>
            <EnvelopeIcon />
          </template>
        </InputText>
        <UIButton @click="() => (showAddCandidateDialog = true)"> Añadir candidato </UIButton>
      </div>

      <UIBoard :columns="boardColumns" class="flex-1" />
    </div>
  </template>

  <AddCandidateDialog
    @close="() => (showAddCandidateDialog = false)"
    @save="onAddCandidate"
    :open="showAddCandidateDialog"
    :disable-submit="creatingCandidate"
  />
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
