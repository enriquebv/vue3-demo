import { computed } from 'vue'

import type Candidate from '@/domain/Candidate'
import type Vacancy from '@/domain/Vacancy'

import ConfettiIcon from '@/ui/icons/ConfettiIcon.vue'
import InboxIcon from '@/ui/icons/InboxIcon.vue'
import StopIcon from '@/ui/icons/StopIcon.vue'
import UserIcon from '@/ui/icons/UserIcon.vue'
import type UIBoard from '@/ui/ui-board/UIBoard.vue'

import useVacancy from '@/composables/vacancy'
import useCandidates from '@/composables/candidates'
import type VacancyStatus from '@/domain/VacancyStatus'

type BoardColumn = InstanceType<typeof UIBoard>['$props']['columns'][number]

// Demo: Currently the API does not return the type of the stage, so we are using the index to apply visual configurations
const COLUMN_CONFIG_BY_STAGE_INDEX: Record<number, Pick<BoardColumn, 'color' | 'titleIcon'>> = {
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

export default function useVacancyBoard(vacancyId: Vacancy['id']) {
  const { loading, vacancy, refetch: refetchVacancy } = useVacancy(vacancyId)
  const candidates = useCandidates()

  async function onCandidateStatusChange(candidate: Candidate, stageId: VacancyStatus['id']) {
    await candidates.changeStatus(candidate, stageId)
    await refetchVacancy()
  }

  function createBoardColumns(vacancy: Vacancy): BoardColumn[] {
    return vacancy.stages.map((vacancyStatus, index) => {
      return {
        id: vacancyStatus.id,
        title: vacancyStatus.name,
        color: COLUMN_CONFIG_BY_STAGE_INDEX[index].color,
        titleIcon: COLUMN_CONFIG_BY_STAGE_INDEX[index].titleIcon,
        cards: vacancyStatus.candidates.map((candidate) => ({
          id: candidate.id,
          title: `${candidate.firstName} ${candidate.lastName}`,
          content: 'Añadido por ATS',
          date: candidate.createdAt,
          actions: [
            {
              label: 'Cambiar estado a ',
              subactions: vacancy.stages
                .filter(({ id }) => vacancyStatus.id !== id) // We don't want to change the status to the same one
                .map((vacancyStatus) => ({
                  label: vacancyStatus.name,
                  onClick: () => onCandidateStatusChange(candidate, vacancyStatus.id)
                }))
            }
          ]
        }))
      }
    })
  }

  const columns = computed(() => {
    if (!vacancy.value) return []

    return createBoardColumns(vacancy.value)
  })

  return {
    loading,
    vacancy,
    refetchVacancy,
    columns
  }
}
