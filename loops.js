const MONTHS = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
]

const getDaysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()

// Only edit below 


/**
 * Function that creates an array of a particular length and returns it.
 * @param {*} length 
 * 
 */
const createArray = (length) => {
    const result = []

    for (let i = 0; i < length; i++) {
        result.push(i)
    }

    return result
}

/**
 * Function that creates an array showing days and weeks in the month and returns it.
 * 
 */
const createData = () => {
    const current = new Date()

    const startDay = current.getDay()
    const daysInMonth = getDaysInMonth(current)

    const weeks = createArray(5)
    const days = createArray(7)

    for (let weekIndex = 0; weekIndex < weeks.length; weekIndex++) {
        const value = {
            week: weekIndex + 1,
            days: []
        }

        for (const dayIndex of days) {
            const day = (dayIndex - startDay) + (weekIndex * 7)  + 1
            const isValid = day > 0 && day <= daysInMonth 

            value.days.push({
                dayOfWeek: dayIndex + 1,
                value: isValid ? day : '',
            })
        }
        weeks[weekIndex] = value
    }

    return weeks
}

/**
 * Function that 
 * @param {*} existing 
 * @param {*} classString 
 * @param {*} value 
 * @returns 
 */
const addCell = (existing, classString, value) => {
    const result = /* html */ `
        <td class="${classString}">
            &nbsp;${existing}&nbsp;
        </td>
    `

    return result
}

/**
 * Function that creates the html 
 * @param {*} data 
 * @returns 
 */
const createHtml = (data) => {
    let result = ''

    for (const week of data) {
        let inner = ""
        inner = addCell(`Week ${week.week}`, 'table__cell table__cell_sidebar', inner)
    
         for (const day of week.days) {

            const isToday = new Date().toDateString() === new Date(current.getFullYear(), current.getMonth(), day.value).toDateString()
            const isWeekend = day.dayOfWeek === 1 || day.dayOfWeek === 7
            const isAlternate = (week.week % 2) === 0
            
		    let classString = 'table__cell'

            if (isToday) classString += ` table__cell_today`
            if (isWeekend) classString += ` table__cell_weekend`
            if (isAlternate) classString += ` table__cell_alternate`

            inner += addCell(day.value, classString)
        }

        result = `
            ${result}
            <tr class="table__row">${inner}</tr>
        `
    }
    
    return result
}

// Only edit above

const current = new Date()
document.querySelector('[data-title]').innerText = `${MONTHS[current.getMonth()]} ${current.getFullYear()}`

const data = createData()
document.querySelector('[data-content]').innerHTML = createHtml(data)