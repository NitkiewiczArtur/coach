import {onMounted, Ref} from "vue";
import {isMobileScreen} from "@/utils/utils";

export function useChartInTable( chartWidth: Ref<number>, chartHeight: Ref<number>) {
    const initializeChart = () => {
        onMounted(() => {
        if (isMobileScreen) {
            chartWidth.value = window.innerWidth * 0.9
            chartHeight.value = window.innerHeight * 0.4
        } else {
                chartWidth.value = window.innerWidth * 0.75
                chartHeight.value = window.innerHeight * 0.4
        }
        })
    }
    return {initializeChart}
}
