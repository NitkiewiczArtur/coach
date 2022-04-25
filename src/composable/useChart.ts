import {onMounted, ref} from "vue";
import useScreen from "@/composable/useScreen";

export default function useChart() {
    const {isMobileScreenCondition, isTabletScreenCondition} = useScreen()
    const chartHeight = ref(0)
    const chartWidth = ref(0)

    const doChart = () => {
        if (isMobileScreenCondition()) {
            chartWidth.value = window.innerWidth * 0.9
            chartHeight.value = window.innerHeight * 0.4
        } else if (isTabletScreenCondition()) {
            chartWidth.value = window.innerWidth * 0.4
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
