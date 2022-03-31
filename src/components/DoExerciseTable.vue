<template>
  <div class="table-container">
    <table>
      <thead>
      <tr>
        <th>HISTORY</th>
        <th>WORKOUT RESULT</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="exerciseResultData in exerciseResultDataList"
          :key="exerciseResultData.exerciseName"
          class="tbody-row">
        <td>
          <span class="hide-for-desktop">{{exerciseResultData.exerciseName}}</span>
          <workout-result-chart v-if="chartHeight"
                                :exercise-result-data="exerciseResultData"
                                :height="chartHeight"
                                :width="chartWidth"/>
          <exercise-result-input :lastExerciseResult="exerciseResultData.lastExerciseResult"/>
        </td>
        <td class="hide-for-mobile"><exercise-result-input :lastExerciseResult="exerciseResultData.lastExerciseResult"/></td>
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
import {useChartInTable} from "@/composable/useChartInTable";
import ExerciseResultInput from "@/components/ExerciseResultInput.vue";
import {Workout} from "@/model/Workout";

const props = defineProps({
  resultsToDisplay: {
    type: Array as PropType<WorkoutResult[]>,
    required: true,
  },
  workout:{
    type: Object as PropType<Workout>,
    required: true,
  },
  error: {
    type: Error,
  },
})

const chartHeight = ref(0)
const chartWidth = ref(0)
const {initializeChart} = useChartInTable(chartWidth, chartHeight);
const exerciseIds = ref(props.workout.exercises)
const exerciseResultDataPromises: Promise<ExerciseResultData | undefined>[] = []

exerciseIds.value.forEach(exerciseId => {
  exerciseResultDataPromises.push(getExerciseResultData(exerciseId, props.resultsToDisplay))
})
const exerciseResultDataList = await Promise.all(exerciseResultDataPromises)

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
.hide-for-desktop{
  display:none;
}

@media screen and (max-width: 700px) {
  .tbody-row{
    height:unset;
  }
  .hide-for-mobile{
    display:none;
  }
  .hide-for-desktop{
    display:unset;
  }
}
</style>
