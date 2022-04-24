import {ref} from "vue";

export default function useScreen() {
    const isMobileScreen = () => window.innerWidth < 700
    const isTabletScreen = () => window.innerWidth >= 700 && window.innerWidth < 1400

    const isMobileScreenRef = ref(isMobileScreen())
    const isTabletScreenRef = ref(isTabletScreen())

    const resetIsMobileScreen = () => isMobileScreenRef.value = isMobileScreen()
    const resetIsTabletScreen = () => isTabletScreenRef.value = isTabletScreen()

    window.onresize = () => {
        resetIsMobileScreen()
        resetIsTabletScreen()
    }
    return {
        isMobileScreen: isMobileScreenRef,
        isTabletScreen: isTabletScreenRef,
        isMobileScreenCondition: isMobileScreen,
        isTabletScreenCondition: isTabletScreen
    }
}
