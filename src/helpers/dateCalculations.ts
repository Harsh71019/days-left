export const calculateDaysAndProgress = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const now = new Date();

    const totalMilliseconds = end.getTime() - start.getTime();
    const remainingMilliseconds = end.getTime() - now.getTime();

    // Calculate days and hours
    const daysLeft = remainingMilliseconds / (1000 * 60 * 60 * 24);
    const wholeDays = Math.floor(daysLeft);
    const remainingHours = Math.floor((daysLeft - wholeDays) * 24);

    const progress = ((totalMilliseconds - remainingMilliseconds) / totalMilliseconds) * 100;

    return {
        daysLeft: wholeDays + (remainingHours / 24), // Keep fractional days for internal calculations
        wholeDays,
        remainingHours,
        progress: progress > 0 ? (progress > 100 ? 100 : progress) : 0
    };
};