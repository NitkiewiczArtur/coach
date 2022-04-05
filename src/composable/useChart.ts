import {isMobileScreen} from "@/utils/utils";
import {onMounted, ref} from "vue";

export function useChart() {
    const chartHeight = ref(0)
    const chartWidth = ref(0)

    const doChart = () => {
        if (isMobileScreen) {
            chartWidth.value = window.innerWidth * 0.9
            chartHeight.value = window.innerHeight * 0.4
        } else {
            chartWidth.value = window.innerWidth * 0.7
            chartHeight.value = window.innerHeight * 0.4
        }
    }
    window.onresize = doChart
    onMounted(()=>doChart())
    return {
        chartHeight,
        chartWidth
    }
}
