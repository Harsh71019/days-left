export const calculateDaysAndProgress = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const today = new Date();

    const totalDays = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    const daysRemaining = Math.ceil((end.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    const daysElapsed = totalDays - daysRemaining;
    const progress = Math.round((daysElapsed / totalDays) * 100);

    return {
        daysLeft: daysRemaining > 0 ? daysRemaining : 0,
        progress: progress > 0 ? (progress > 100 ? 100 : progress) : 0
    };
};