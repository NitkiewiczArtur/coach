import {onMounted, Ref} from "vue";
import {isMobileScreen} from "@/utils/utils";

export function useChart(table: Ref<null>, chartWidth: Ref<number>, chartHeight: Ref<number>) {
    const initializeChart = () => {
        if (isMobileScreen) {
            chartWidth.value = window.innerWidth * 0.9
            chartHeight.value = window.innerHeight * 0.4
        } else {
            onMounted(() => {
                //TODO: const itemRefs = ref([]) and  <tr v-for="... ref="itemRefs" doesent work despite vue >= 3.25, works good in devtools but here I got empty array..
                const tableElement = table.value as unknown as HTMLTableSectionElement
                const tableRowElement = tableElement.getElementsByClassName('exercise-info-cell')[0]
                chartWidth.value = window.innerWidth * 0.7
                chartHeight.value = tableRowElement.clientHeight - 30
            })
        }
    }
    return {initializeChart}
}
