import React from 'react';

interface CircleProgressProps {
  progress: number;
  isDark: boolean;
}

const CircleProgress: React.FC<CircleProgressProps> = ({
  progress,
  isDark,
}) => {
  const radius: number = 15;
  const circumference: number = 2 * Math.PI * radius;
  const strokeDashoffset: number =
    circumference - (progress / 100) * circumference;

  return (
    <svg className='w-10 h-10' viewBox='0 0 40 40'>
      <circle
        className={isDark ? 'stroke-white/20' : 'stroke-black/10'}
        strokeWidth='4'
        fill='transparent'
        r={radius}
        cx='20'
        cy='20'
      />
      <circle
        className={`${
          isDark ? 'stroke-white/90' : 'stroke-gray-800/90'
        } transition-all duration-300 ease-in-out`}
        strokeWidth='4'
        fill='transparent'
        r={radius}
        cx='20'
        cy='20'
        style={{
          strokeDasharray: `${circumference} ${circumference}`,
          strokeDashoffset,
          transform: 'rotate(-90deg)',
          transformOrigin: '50% 50%',
        }}
      />
    </svg>
  );
};

export default CircleProgress;
