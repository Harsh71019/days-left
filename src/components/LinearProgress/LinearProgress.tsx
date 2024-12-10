interface LinearProgressProps {
  startDate: string;
  endDate: string;
  isDark: boolean;
}

const LinearProgress: React.FC<LinearProgressProps> = ({
  startDate,
  endDate,
  isDark,
}) => {
  const calculateTimeDetails = () => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const today = new Date();

    const totalDays = (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);
    const daysElapsed =
      (today.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);
    const daysRemaining = totalDays - daysElapsed;

    const progress = (daysElapsed / totalDays) * 100;
    const boundedProgress = Math.min(Math.max(progress, 0), 100);

    return {
      progress: boundedProgress,
      daysRemaining: Math.max(Math.round(daysRemaining), 0),
      isOverdue: today > end,
      isNotStarted: today < start,
      totalDays: Math.round(totalDays),
    };
  };

  const timeDetails = calculateTimeDetails();

  const getProgressColor = () => {
    if (timeDetails.isOverdue) return 'bg-red-500/50';
    if (timeDetails.progress > 75) return 'bg-red-400/50';
    if (timeDetails.progress > 50) return 'bg-yellow-400/50';
    return 'bg-green-500/50';
  };

  return (
    <div className='relative group'>
      <div
        className={`w-full h-3 mt-5 rounded-full ${
          isDark ? 'bg-white/10' : 'bg-black/5'
        } relative overflow-hidden`}
      >
        <div
          className={`h-full rounded-full transition-all duration-700 ease-in-out ${getProgressColor()}`}
          style={{ width: `${100 - timeDetails.progress}%` }}
        />

        {/* Progress markers */}
        <div className='absolute top-0 left-0 w-full h-full flex justify-between px-1'>
          {[25, 50, 75].map((marker) => (
            <div
              key={marker}
              className={`h-full w-px ${
                isDark ? 'bg-white/20' : 'bg-black/10'
              }`}
              style={{ left: `${marker}%` }}
            />
          ))}
        </div>
      </div>

      {/* Tooltip */}
      <div
        className={`absolute top-5 left-1/2 transform -translate-x-1/2 
                      opacity-0 group-hover:opacity-100 transition-opacity
                      text-xs px-2 py-1 rounded ${
                        isDark
                          ? 'bg-white/10 text-white'
                          : 'bg-black/5 text-gray-800'
                      } whitespace-nowrap`}
      >
        {timeDetails.isOverdue ? (
          <span className='text-red-400'>Overdue</span>
        ) : timeDetails.isNotStarted ? (
          <span>Not started yet</span>
        ) : (
          <span>
            {timeDetails.daysRemaining} days remaining of{' '}
            {timeDetails.totalDays} days ({Math.round(timeDetails.progress)}%
            complete)
          </span>
        )}
      </div>

      {/* Time indicators */}
      <div
        className={`flex justify-between text-xs mt-1 ${
          isDark ? 'text-white/50' : 'text-gray-500'
        }`}
      >
        <span>{new Date(startDate).toLocaleDateString()}</span>
        <span>{new Date(endDate).toLocaleDateString()}</span>
      </div>
    </div>
  );
};

export default LinearProgress;
