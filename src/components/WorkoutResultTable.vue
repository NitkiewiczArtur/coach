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
      <tr v-for="exerciseResultData in exerciseResultDataList"
          :key="exerciseResultData.exerciseName"
          class="tbody-row">
        <td class="hide-for-mobile exercise-info-cell">
          <span>{{ exerciseResultData.exerciseName.toUpperCase() }}</span>
          <img
              class="exercise-result-image"
              :src="exerciseResultData.gifUrl"
              alt="exercise gif"
          />
        </td>
        <td>
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
import {PropType, ref} from "vue";
import {WorkoutResult} from "@/model/WorkoutResult";
import WorkoutResultChart from "@/components/ExerciseResultChart.vue";
import {ExerciseResultData} from "@/model/ExerciseResultData";
import {getExerciseResultData} from "@/services/exerciseResultDataService";
import {useChart} from "@/composable/useChart";

const props = defineProps({
  resultsToDisplay: {
    type: Array as PropType<WorkoutResult[]>,
    required: true,
  },
  error: {
    type: Error,
  },
})

const exerciseResultDataList = ref<Array<ExerciseResultData | undefined>>([])
const table = ref(null)
const chartHeight = ref(0)
const chartWidth = ref(0)
const exerciseIds = props.resultsToDisplay[0].exerciseResults.map(exerciseResult => exerciseResult.exercise_id)
const exerciseResultDataPromises: Promise<ExerciseResultData | undefined>[] = []
const {initializeChart} = useChart(table, chartWidth, chartHeight);

exerciseIds.forEach(exerciseId => {
  exerciseResultDataPromises.push(getExerciseResultData(exerciseId, props.resultsToDisplay))
})
exerciseResultDataList.value = await Promise.all(exerciseResultDataPromises)

initializeChart();

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
  .tbody-row{
    height:unset;
  }
  .hide-for-mobile{
    display:none;
  }
}
</style>
