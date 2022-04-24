export const isMobileScreen = window.innerWidth < 700
export const getCurrentDateString = () => {
    const currentDate = new Date(Date.now())
    return `${currentDate.getFullYear()}-${getMonthString(currentDate)}-${getDayString(currentDate)}`
}
const getMonthString = (date: Date) => {
    const month = date.getMonth() + 1
    if (month.toString().length > 1) {
        return month
    }
    return `0${month}`
}
const getDayString = (date: Date) => {
    const day = date.getDate()
    if (day.toString().length > 1) {
        return day
    }
    return `0${day}`
}
