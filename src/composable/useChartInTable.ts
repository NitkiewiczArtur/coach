import {onMounted, Ref} from "vue";
import {isMobileScreen} from "@/utils/utils";

export function useChartInTable( chartWidth: Ref<number>, chartHeight: Ref<number>) {
    const initializeChart = () => {
        onMounted(() => {
      // const tableElement = table.value as unknown as HTMLTableSectionElement
        if (isMobileScreen) {
            chartWidth.value = window.innerWidth * 0.9
            chartHeight.value = window.innerHeight * 0.4
        } else {
                //TODO: const itemRefs = ref([]) and  <tr v-for="... ref="itemRefs" doesent work despite vue >= 3.25,
                // works good in devtools but here I got empty array..
                //const tableElement = table.value as unknown as HTMLTableSectionElement

                //  const tableRowElement = tableElement.getElementsByClassName('exercise-info-cell')[0]
                chartWidth.value = window.innerWidth * 0.75
                chartHeight.value = window.innerHeight * 0.4
        }
        })
    }
    const getTableHeaderColumns = (table: HTMLTableSectionElement) => {
        return table.getElementsByTagName('thead')[0].getElementsByTagName('th')
    }
    const getTableBodyRow = (table: HTMLTableSectionElement) => {
        return table.getElementsByTagName('tbody')[0].getElementsByTagName('th')
    }
    return {initializeChart}
}
