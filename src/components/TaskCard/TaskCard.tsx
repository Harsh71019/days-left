import React, { useState } from 'react';
import CircleProgress from '../CircleProgress/CircleProgress';
import { Task } from '@/constants';

interface TaskCardProps {
  task: Task;
  isDark: boolean;
  onUpdate: (index: number, updatedTask: Task) => void;
  index: number;
}

const TaskCard: React.FC<TaskCardProps> = ({
  task,
  isDark,
  onUpdate,
  index,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className='relative h-[60px] perspective-1000'>
      <div
        className={`relative w-full h-full transition-all duration-500 transform-style-preserve-3d ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
      >
        {/* Front Side */}
        <div className='absolute w-full h-full backface-hidden'>
          <div className='flex items-center gap-3'>
            <input
              type='text'
              value={task.text}
              className={`flex-1 backdrop-blur-sm rounded-lg px-3 py-2 outline-none ${
                isDark
                  ? 'bg-white/10 focus:ring-white/30 text-white placeholder-white/50 border-white/10'
                  : 'bg-black/5 focus:ring-black/20 text-gray-800 placeholder-gray-500 border-black/10'
              } border focus:ring-2`}
              onChange={(e) =>
                onUpdate(index, { ...task, text: e.target.value })
              }
            />
            <div
              className={`w-8 h-8 backdrop-blur-sm rounded-full flex items-center justify-center text-sm ${
                isDark
                  ? 'bg-white/10 text-white/90 border-white/10'
                  : 'bg-black/5 text-gray-800/90 border-black/10'
              } border`}
            >
              {task.daysLeft}
            </div>
            <CircleProgress progress={task.progress} isDark={isDark} />
            <button
              onClick={() => setIsFlipped(true)}
              className={`p-2 rounded-full transition-colors ${
                isDark ? 'hover:bg-white/10' : 'hover:bg-black/10'
              }`}
            >
              <svg
                className={`w-4 h-4 ${
                  isDark ? 'text-white/90' : 'text-gray-800/90'
                }`}
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z'
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Back Side */}
        <div className='absolute w-full h-full backface-hidden rotate-y-180'>
          <div
            className={`flex items-center gap-3 backdrop-blur-sm rounded-lg p-3 ${
              isDark
                ? 'bg-white/10 border-white/10'
                : 'bg-black/5 border-black/10'
            } border`}
          >
            <div className='flex-1 space-y-2'>
              <div className='flex gap-2 items-center'>
                <span
                  className={`text-xs ${
                    isDark ? 'text-white/70' : 'text-gray-600'
                  }`}
                >
                  Start:
                </span>
                <input
                  type='date'
                  value={task.startDate}
                  className={`flex-1 rounded px-2 py-1 text-sm ${
                    isDark
                      ? 'bg-white/10 text-white border-white/10'
                      : 'bg-black/5 text-gray-800 border-black/10'
                  } border`}
                  onChange={(e) =>
                    onUpdate(index, { ...task, startDate: e.target.value })
                  }
                />
              </div>
              <div className='flex gap-2 items-center'>
                <span
                  className={`text-xs ${
                    isDark ? 'text-white/70' : 'text-gray-600'
                  }`}
                >
                  End:
                </span>
                <input
                  type='date'
                  value={task.endDate}
                  className={`flex-1 rounded px-2 py-1 text-sm ${
                    isDark
                      ? 'bg-white/10 text-white border-white/10'
                      : 'bg-black/5 text-gray-800 border-black/10'
                  } border`}
                  onChange={(e) =>
                    onUpdate(index, { ...task, endDate: e.target.value })
                  }
                />
              </div>
            </div>
            <button
              onClick={() => setIsFlipped(false)}
              className={`p-2 rounded-full transition-colors ${
                isDark ? 'hover:bg-white/20' : 'hover:bg-black/20'
              }`}
            >
              <svg
                className={`w-4 h-4 ${
                  isDark ? 'text-white/90' : 'text-gray-800/90'
                }`}
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M6 18L18 6M6 6l12 12'
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
