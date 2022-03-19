<template>
  <div class="table-container">
    <table>
      <thead>
      <tr>
        <th>EXERCISE</th>
        <th>RESULT</th>
      </tr>
      </thead>
      <tbody ref="table">
      <tr v-for="exerciseResultData in exerciseResultDatas"
          :key="exerciseResultData.exerciseName"
          class="tbody-row">
        <td class="exercise-info-cell hide-for-mobile">
          <span>{{ exerciseResultData.exerciseName.toUpperCase() }}</span>
          <img
              class="exercise-result-image"
              :src="exerciseResultData.gifUrl"
              alt="exercise gif"
          />
        </td>
        <td class="show-in-mobile-row">
          <workout-result-chart v-if="chartHeight"
                                :exercise-result-data="exerciseResultData"
                                :height="chartHeight"
                                :width="chartWidth"/>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import {onMounted, PropType, ref} from "vue";
import {WorkoutResult} from "@/model/WorkoutResult";
import WorkoutResultChart from "@/components/ExerciseResultChart.vue";
import {ExerciseResultData} from "@/model/ExerciseResultData";
import {getExerciseResultData} from "@/services/exerciseResultDataService";

const props = defineProps({
  resultsToDisplay: {
    type: Array as PropType<WorkoutResult[]>,
    required: true,
  },
  error: {
    type: Error,
  },
})

const exerciseResultDatas = ref<ExerciseResultData[]>([])
const table = ref(null)
const workoutId = "24f81170-a767-11ec-8dc4-51488497cd98"
const chartHeight = ref(0)
const chartWidth = ref(0)
const exerciseIds = props.resultsToDisplay[0].exerciseResults.map(exerciseResult => exerciseResult.exercise_id)
const exerciseResultDataPromises: Promise<ExerciseResultData>[] = []
const isMobileScreen = window.innerWidth < 700


exerciseIds.forEach(exerciseId => {
    exerciseResultDataPromises.push(getExerciseResultData(exerciseId, props.resultsToDisplay))
})
exerciseResultDatas.value = await Promise.all(exerciseResultDataPromises)
if (isMobileScreen) {
  chartWidth.value = window.innerWidth * 0.9
  chartHeight.value = window.innerHeight * 0.4
}else{
  onMounted(() => {
    //TODO: const itemRefs = ref([]) and  <tr v-for="... ref="itemRefs" doesent work despite vue >= 3.25, works good in devtools but here I got empty array..
    const tableElement = table.value as unknown as HTMLTableSectionElement
    const tableRowElement = tableElement.getElementsByClassName('exercise-info-cell')[0]
    chartWidth.value = window.innerWidth * 0.7
    chartHeight.value = tableRowElement.clientHeight - 30
  })
}

</script>

<style lang="scss" scoped>
@use "../styles/components/table";
@use "../styles/components/button" as v;
@use "../styles/mixins";

.exercise-result-image {
  border-radius: 25px;
  width: 15vw;
  height: 28vh;
}

.exercise-info-cell {
  @include mixins.flex-column-center;
  justify-content: center;
  font-weight: bold;
  padding: 2rem 0 2rem 0;
  width: 20vw;
  height: 30vh;

  span {
    margin: 0.5rem 0 0.5rem 0;
  }
}

@media screen and (max-width: 700px) {
  .hide-for-mobile {
    display: none;
  }
  .tbody-row{
    height:unset;
  }
}
</style>
