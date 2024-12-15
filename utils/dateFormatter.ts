import { months } from "@/constants/Date";
export const formatDate = (date: string) => {
    const tDates = date.split(' ');
    return `${tDates[0]}, ${tDates[1]} ${tDates[2]}`

}

export const getUTCDate = (input: string) => {
    const [day, month, year] = input.split("/").map(Number);
    const date = new Date(Date.UTC(year, month - 1, day, 0, 0, 0)).toISOString();
    return date;
}

export const getWholeWeekDates = (isoString: string) => {
    const weekdays = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
    const date = new Date(isoString);
    const dayOfWeek = date.getUTCDay();

    const startOfWeek = new Date(date);
    const diffToMonday = (dayOfWeek === 0 ? -6 : 1) - dayOfWeek;
    startOfWeek.setUTCDate(date.getUTCDate() + diffToMonday);

    // Generate an array of the dates for the week
    const weekDates = [];
    for (let i = 0; i < 7; i++) {
        const weekDate = new Date(startOfWeek);
        weekDate.setUTCDate(startOfWeek.getUTCDate() + i);
        const dateObj = {
            day: weekdays[i],
            date: weekDate.toISOString().split('T')[0].split('-').reverse().join('-')
        }
        weekDates.push(dateObj);
    }
    const obj = {
        month: months[date.getMonth()],
        weekDates: weekDates
    }

    return obj;
}
