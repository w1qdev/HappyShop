

const wordDeclenision = (count) => {
    const stringCount = count.toString()
    const lastCountNum = parseInt(stringCount[stringCount.length - 1])

    if (lastCountNum === 1) return "штука"
    if (lastCountNum === 0) return 'штук'
    if (lastCountNum >= 2 && lastCountNum <= 4) return "штуки"
    if (lastCountNum >= 5 && lastCountNum <= 9) return "штук"
}   

export default wordDeclenision;