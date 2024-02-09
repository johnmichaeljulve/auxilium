export const daysLeft = (deadline) => {
    const difference = new Date(deadline).getTime() - Date.now()
    const remainingDays = difference / (1000 * 3600 * 24)

    return remainingDays.toFixed(0)
}

export const calculateBarPercentage = (target, raisedAmount) => {
    const percentage = Math.round((raisedAmount * 100) / target)
    
    return percentage
}

export const checkIfImage = (url, callback) => {
    const img = new Image()
    img.onload = () => callback(true)
    img.onerror = () => callback(false)
    img.src = url

    if(img.complete) callback(true)

}