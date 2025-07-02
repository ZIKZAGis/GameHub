export function getMonthsRange(direction: 'past' | 'future', monthsCount: number): { startDate: string; endDate: string } {
    const now = new Date();
    const startDate = new Date(now);
    const endDate = new Date(now);

    if (direction === 'past') {
        startDate.setMonth(startDate.getMonth() - monthsCount);
    } else {
        endDate.setMonth(endDate.getMonth() + monthsCount);
    }

    const formatDate = (date: Date): string => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    return {
        startDate: formatDate(direction === 'past' ? startDate : now),
        endDate: formatDate(direction === 'past' ? now : endDate),
    };
}