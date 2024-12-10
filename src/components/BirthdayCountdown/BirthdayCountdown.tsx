import { useState, useEffect } from 'react';
import MetricCard from './MetricCard/MetricCard';

interface BirthdayCountdownProps {
  birthDate: string;
  isDark: boolean;
  displayUnit: 'days' | 'hours' | 'minutes' | 'seconds';
}

const BirthdayCountdown: React.FC<BirthdayCountdownProps> = ({
  birthDate,
  isDark,
  displayUnit,
}) => {
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [nextBirthday, setNextBirthday] = useState<Date>(new Date());
  const [metrics, setMetrics] = useState({
    daysLived: 0,
    age: 0,
    minutesLived: 0,
    hoursLived: 0,
    weeksLived: 0,
  });

  useEffect(() => {
    const calculateNextBirthday = () => {
      const today = new Date();
      const birth = new Date(birthDate);
      let nextBday = new Date(
        today.getFullYear(),
        birth.getMonth(),
        birth.getDate()
      );

      if (today > nextBday) {
        nextBday = new Date(
          today.getFullYear() + 1,
          birth.getMonth(),
          birth.getDate()
        );
      }

      return nextBday;
    };

    const calculateTimeLeft = (nextBday: Date) => {
      const now = new Date();
      const difference = nextBday.getTime() - now.getTime();

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

    const nextBday = calculateNextBirthday();
    setNextBirthday(nextBday);
    setTimeLeft(calculateTimeLeft(nextBday));

    const timer = setInterval(
      () => {
        setTimeLeft(calculateTimeLeft(nextBday));
      },
      displayUnit === 'seconds' ? 1000 : 60000
    );

    return () => clearInterval(timer);
  }, [birthDate, displayUnit]);
  useEffect(() => {
    const calculateMetrics = () => {
      const birth = new Date(birthDate);
      const now = new Date();
      const difference = now.getTime() - birth.getTime();

      const days = difference / (1000 * 60 * 60 * 24);
      const minutes = difference / (1000 * 60);
      const hours = difference / (1000 * 60 * 60);
      const weeks = days / 7;
      const age = now.getFullYear() - birth.getFullYear();

      setMetrics({
        daysLived: Math.floor(days),
        minutesLived: Math.floor(minutes),
        hoursLived: Math.floor(hours),
        weeksLived: Math.floor(weeks),
        age,
      });
    };

    calculateMetrics();
    const metricTimer = setInterval(calculateMetrics, 60000);
    return () => clearInterval(metricTimer);
  }, [birthDate]);

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
        Life Metrics
      </h2>

      {/* Birthday Countdown */}
      <div className='mb-6'>
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
            {displayUnit} until next birthday
          </span>
        </div>
        <div
          className={`text-sm mt-2 text-center ${
            isDark ? 'text-white/50' : 'text-gray-500'
          }`}
        >
          {nextBirthday.toLocaleDateString()}
        </div>
      </div>

      {/* Life Metrics Grid */}
      <div className='grid grid-cols-2 gap-4'>
        <MetricCard
          label='Age'
          value={`${metrics.age} years`}
          isDark={isDark}
        />
        <MetricCard
          label='Weeks Lived'
          value={metrics.weeksLived.toLocaleString()}
          isDark={isDark}
        />
        <MetricCard
          label='Days Lived'
          value={metrics.daysLived.toLocaleString()}
          isDark={isDark}
        />
        <MetricCard
          label='Hours Lived'
          value={metrics.hoursLived.toLocaleString()}
          isDark={isDark}
        />
        <MetricCard
          label='Minutes Lived'
          value={metrics.minutesLived.toLocaleString()}
          isDark={isDark}
          className='col-span-2'
        />
      </div>
    </div>
  );
};

export default BirthdayCountdown;
