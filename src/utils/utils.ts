export const isMobileScreen = window.innerWidth < 700;
export const getCurrentDateString = () =>{
    const currentDate = new Date(Date.now())
    return `${currentDate.getFullYear()}/${currentDate.getMonth() + 1}/${currentDate.getDate()}`
}
