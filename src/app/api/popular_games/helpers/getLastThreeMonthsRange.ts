export function getLastThreeMonthsRange(): { startDate: string; endDate: string } {
    const now = new Date();
    const endDate = new Date(now);
    const startDate = new Date(now);

    startDate.setMonth(startDate.getMonth() - 3);

    const formatDate = (date: Date): string => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    return {
        startDate: formatDate(startDate),
        endDate: formatDate(endDate),
    };
}