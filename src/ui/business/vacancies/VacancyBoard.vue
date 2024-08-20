<script setup lang="ts">
import { ref } from 'vue'

import type Vacancy from '@/domain/Vacancy'

import InputText from '@/ui/InputText.vue'
import UIButton from '@/ui/UIButton.vue'
import EnvelopeIcon from '@/ui/icons/EnvelopeIcon.vue'
import UIBoard from '@/ui/ui-board/UIBoard.vue'

import AddCandidateDialog from './AddCandidateDialog.vue'
import SkeletonFallback from './VacancyBoardSkeleton.vue'
import useVacancyBoard from './vacancy-board'

interface Props {
  vacancyId: Vacancy['id']
}

const props = defineProps<Props>()

const { loading, vacancy, columns, refetchVacancy } = useVacancyBoard(props.vacancyId)

const showAddCandidateDialog = ref(false)

function onCandidateCreated() {
  refetchVacancy()
  showAddCandidateDialog.value = false
}
</script>

<template>
  <div class="py-4 flex justify-between">
    <InputText value="" placeholder="Buscar">
      <template #pre-icon>
        <EnvelopeIcon />
      </template>
    </InputText>
    <UIButton @click="() => (showAddCandidateDialog = true)"> Añadir candidato </UIButton>
  </div>

  <SkeletonFallback v-if="loading && !vacancy" />
  <UIBoard v-else :columns="columns" class="flex-1" />

  <AddCandidateDialog
    v-if="vacancy"
    :vacancy-id="vacancyId"
    :stage-on-creation-id="vacancy.stages[0].id"
    :open="showAddCandidateDialog"
    @created="onCandidateCreated"
    @close="() => (showAddCandidateDialog = false)"
  />
</template>
