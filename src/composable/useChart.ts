import {isMobileScreen} from "@/utils/utils";

export function useChart() {
    let chartHeight
    let chartWidth

    if (isMobileScreen) {
        chartWidth = window.innerWidth * 0.9
        chartHeight = window.innerHeight * 0.4
    } else {
        chartWidth = window.innerWidth * 0.7
        chartHeight = window.innerHeight * 0.4
    }

    return {
        chartHeight,
        chartWidth
    }
}
