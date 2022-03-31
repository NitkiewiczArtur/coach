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
      type: Number,
      required: true,
    },
    height:{
      type:Number,
      required: true,
    },
  },
  data() {
    return {
      options: {
        chart: {
          id: 'vuechart-example',
          height: this.height+2110,
        },
        xaxis: {
          categories: [...this.exerciseResultData.maxRepPerDay.keys()],
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
            min:this.exerciseResultData.smallestMax - 5
          },
          {
            opposite: true,
            labels: {
              style: {
                colors: '#0098fd'
              }
            },
            min:this.exerciseResultData.smallestVolume - 5
          }
        ],
      },
      series: [{
        name: 'MAX SERIES',
        type:'line',
        data: [...this.exerciseResultData.maxRepPerDay.values()],
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
