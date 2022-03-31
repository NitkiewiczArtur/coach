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
      <tr v-for="exerciseResultData in resultsDatasToDisplay"
          :key="exerciseResultData.exerciseName"
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
          <span class="hide-for-desktop">{{ exerciseResultData.exerciseName }}</span>
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
import WorkoutResultChart from "@/components/ExerciseResultChart.vue";
import {ExerciseResultData} from "@/model/ExerciseResultData";
import {useChartInTable} from "@/composable/useChartInTable";

const props = defineProps({
  resultsDatasToDisplay: {
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
@use "../styles/components/button" as v;
@use "../styles/mixins";

td{
}
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

.hide-for-desktop {
  display: none;
}

@media screen and (max-width: 700px) {
  .tbody-row {
    height: unset;
  }
  .hide-for-mobile {
    display: none;
  }
  .hide-for-desktop {
    display: unset;
  }
}
</style>
