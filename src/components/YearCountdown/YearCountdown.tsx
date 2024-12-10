import { useState, useEffect } from 'react';

interface YearCountdownProps {
  isDark: boolean;
  displayUnit: 'days' | 'hours' | 'minutes' | 'seconds';
}

const YearCountdown: React.FC<YearCountdownProps> = ({
  isDark,
  displayUnit,
}) => {
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const endOfYear = new Date(now.getFullYear(), 11, 31, 23, 59, 59);
      const difference = endOfYear.getTime() - now.getTime();

      // Calculate progress
      const startOfYear = new Date(now.getFullYear(), 0, 1);
      const totalYearTime = endOfYear.getTime() - startOfYear.getTime();
      const elapsed = now.getTime() - startOfYear.getTime();
      setProgress((elapsed / totalYearTime) * 100);

      switch (displayUnit) {
        case 'days':
          return Math.ceil(difference / (1000 * 60 * 60 * 24));
        case 'hours':
          return Math.ceil(difference / (1000 * 60 * 60));
        case 'minutes':
          return Math.ceil(difference / (1000 * 60));
        case 'seconds':
          return Math.ceil(difference / 1000);
      }
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(
      () => {
        setTimeLeft(calculateTimeLeft());
      },
      displayUnit === 'seconds' ? 1000 : 60000
    );

    return () => clearInterval(timer);
  }, [displayUnit]);

  return (
    <div
      className={`p-6 rounded-2xl ${
        isDark ? 'bg-white/10' : 'bg-black/5'
      } backdrop-blur-lg`}
    >
      <h2
        className={`text-xl font-bold mb-4 ${
          isDark ? 'text-white/90' : 'text-gray-800/90'
        }`}
      >
        Year {new Date().getFullYear()}
      </h2>
      <div className='text-center'>
        <span
          className={`text-4xl font-bold ${
            isDark ? 'text-white' : 'text-gray-800'
          }`}
        >
          {timeLeft}
        </span>
        <span
          className={`ml-2 text-sm ${
            isDark ? 'text-white/70' : 'text-gray-600'
          }`}
        >
          {displayUnit}
        </span>
      </div>

      {/* Progress bar */}
      <div
        className={`w-full h-2 mt-4 rounded-full ${
          isDark ? 'bg-white/10' : 'bg-black/5'
        }`}
      >
        <div
          className='h-full rounded-full bg-blue-500/50 transition-all duration-300'
          style={{ width: `${progress}%` }}
        />
      </div>

      <div
        className={`text-sm mt-2 text-center ${
          isDark ? 'text-white/50' : 'text-gray-500'
        }`}
      >
        {Math.round(progress)}% of year complete
      </div>
    </div>
  );
};

export default YearCountdown;
