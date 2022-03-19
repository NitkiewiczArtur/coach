<template>
  <apexchart :height="height" :width="width" :options="options" :series="series"/>
</template>

<script lang="ts">
import {ExerciseResultData} from "@/model/ExerciseResultData";
import {defineComponent, PropType} from "vue";

export default defineComponent({
  name: 'ExerciseResultChart',
  props: {
    exerciseResultData: {
      type: Object as PropType<ExerciseResultData>,
      required: true,
    },
    width:{
      type: Number
    },
    height:{
      type:Number
    }
  },
  data() {
    return {
      options: {
        chart: {
          id: 'vuechart-example'
        },
        xaxis: {
          categories: [...this.exerciseResultData.maxPerDay.keys()],
          convertedCatToNumeric: false,
        },
        colors: ['#8c44ff', '#0098fd'],
        yaxis: [
          {
            labels: {
              style: {
                colors: '#8c44ff'
              }
            },
          },
          {
            opposite: true,
            labels: {
              style: {
                colors: '#0098fd'
              }
            },
          }
        ],
      },
      series: [{
        name: 'MAX SERIES',
        type:'line',
        data: [...this.exerciseResultData.maxPerDay.values()],
      },
        {
          name: 'VOLUME',
          type:'line',
          data: [...this.exerciseResultData.volumePerDay.values()],
        },],

    }
  }
})
</script>

<style scoped>
.vue-apexcharts{
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
