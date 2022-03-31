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
      <tr v-for="exerciseResultData in resultsDataListToDisplay"
          :key="resultsDataListToDisplay.indexOf(exerciseResultData)"
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
              :lastExerciseResult="exerciseResultData.lastExerciseResult"
              class="hide-for-desktop"/>

        </td>
        <td class="hide-for-mobile" align=Center>
          <exercise-result-creation-fragment :lastExerciseResult="exerciseResultData.lastExerciseResult"/>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import {PropType, ref} from "vue";
import WorkoutResultChart from "@/components/ExerciseResultChart.vue";
import {ExerciseResultData} from "@/model/ExerciseResultData";
import {useChartInTable} from "@/composable/useChartInTable";
import ExerciseResultCreationFragment from "@/components/ExerciseResultCreationFragment.vue";

const props = defineProps({
  resultsDataListToDisplay: {
    type: Array as PropType<ExerciseResultData[]>,
    required: true,
  },
  error: {
    type: Error,
  },
})

const chartHeight = ref(0)
const chartWidth = ref(0)
const {initializeChart} = useChartInTable(chartWidth, chartHeight);

initializeChart();

</script>

<style lang="scss" scoped>
@use "../styles/components/table";
@use "../styles/components/button";
@use "../styles/mixins";
@use "../styles/components/input";
@use "../styles/variables" as v;

.exercise-result-image {
  border-radius: 25px;
  width: 15vw;
  height: 28vh;
}

.exercise-result-panel {
  width: v.$content-width;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
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
  span{
    padding-top:1rem;
    display: inline-block;
    width: 85vw;
  }
}

</style>
