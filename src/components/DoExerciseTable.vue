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
      <tr v-for="(exerciseResultData, index) in resultsDataListToDisplay"
          :key="index"
          class="tbody-row">
        <td align=Center>
          <div class="hide-for-desktop">
            <span>{{ exerciseResultData.exerciseName.toUpperCase() }}</span>
          </div>
          <workout-result-chart v-if="chartHeight"
                                :exercise-result-data="exerciseResultData"
                                :height="chartHeight"
                                :width="chartWidth"/>
          <exercise-result-creation-fragment
              :exerciseId="exerciseResultData.exerciseId"
              class="hide-for-desktop"/>
        </td>
        <td class="hide-for-mobile" align=Center>
          <exercise-result-creation-fragment :exerciseId="exerciseResultData.exerciseId"/>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import {PropType} from "vue";
import WorkoutResultChart from "@/components/ExerciseResultChart.vue";
import ExerciseResultData from "@/model/ExerciseResultData";
import ExerciseResultCreationFragment from "@/components/ExerciseResultCreationFragment.vue";
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
@use "../styles/components/table";
@use "../styles/components/button";
@use "../styles/mixins";
@use "../styles/components/input";
@use "../styles/variables" as v;

@media screen and (max-width: 700px) {
  .tbody-row{
    height:unset;

  }
  span{
    padding-top:1rem;
    display: inline-block;
    width: 85vw;
  }
}
@media screen and (min-width: 700px) {
  td {
    padding-right: 1rem;
  }
}
</style>
