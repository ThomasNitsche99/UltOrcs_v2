
export const currentTimeDate = () => {
    const timeDate = new Date(Date.now()).toISOString().split("T")
    const date = timeDate[0]
    const time = timeDate[1].split('.')[0]
    return `${date} ${time}`
}

export const currentTimeString = () => {
    const timeDate = new Date(Date.now()).toISOString().split("T")
    const time = timeDate[1].split('.')[0]
    return `${time}`
}
