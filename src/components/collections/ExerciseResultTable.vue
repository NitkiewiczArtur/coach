<template>
  <div class="table-container">
    <table>
      <thead>
      <tr>
        <th>EXERCISE</th>
        <th>RESULT</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(exerciseResultData, index) in resultsDataListToDisplay"
          :key="index"
          class="tbody-row">
        <td class="hide-for-mobile" align=Center>
          <div class="exercise-info-cell">
            <span>{{ exerciseResultData.exerciseName.toUpperCase() }}</span>
            <img
                class="exercise-result-image"
                :src="exerciseResultData.gifUrl"
                alt="exercise gif"
            />
          </div>
        </td>
        <td>
          <div class="hide-for-desktop">
            <span>{{ exerciseResultData.exerciseName }}</span>
          </div>
          <div v-if="chartHeight">
            <workout-result-chart v-if="chartHeight"
                                  :exercise-result-data="exerciseResultData"
                                  :height="chartHeight"
                                  :width="chartWidth"/>

          </div>
          </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import {PropType} from "vue";
import WorkoutResultChart from "@/components/common/ExerciseResultChart.vue";
import ExerciseResultData from "@/model/ExerciseResultData";
import {useChart} from "@/composable/useChart";

const props = defineProps({
  resultsDataListToDisplay: {
    type: Array as PropType<ExerciseResultData[]>,
    required: true,
  },
  error: {
    type: Error,
  },
})
const {chartHeight, chartWidth} = useChart()

</script>

<style lang="scss" scoped>
@use "../../styles/components/table";
@use "../../styles/components/button" as v;
@use "../../styles/mixins";

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
  .tbody-row {
    height: unset;
  }
  span{
    padding-top:1rem;
    display: inline-block;
    width: 85vw;
  }
  td{
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
  }
}
</style>
