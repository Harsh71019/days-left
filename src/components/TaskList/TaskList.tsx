import React, { useEffect, useState } from 'react';
import CircleProgress from '../CircleProgress/CircleProgress.js';
import { Task } from '../../constants/index';
import { useTheme } from '../../context/ThemeContext';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import EditTask from '@/screens/Edit/Edit.js';
import { calculateDaysAndProgress } from '@/helpers/dateCalculations.js';

const TaskList: React.FC = () => {
  const { isDark } = useTheme();
  const [isFlipped, setIsFlipped] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [hoveredTaskId, setHoveredTaskId] = useState<number | null>(null);
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks
      ? JSON.parse(savedTasks)
      : [
          {
            id: 1,
            text: 'Do something',
            daysLeft: 23,
            progress: 0,
            startDate: new Date().toISOString().split('T')[0],
            endDate: new Date().toISOString().split('T')[0],
          },
          {
            id: 2,
            text: 'Do something',
            daysLeft: 23,
            progress: 0,
            startDate: new Date().toISOString().split('T')[0],
            endDate: new Date().toISOString().split('T')[0],
          },
          {
            id: 3,
            text: 'Do something',
            daysLeft: 23,
            progress: 0,
            startDate: new Date().toISOString().split('T')[0],
            endDate: new Date().toISOString().split('T')[0],
          },
          {
            id: 4,
            text: 'Do something',
            daysLeft: 23,
            progress: 0,
            startDate: new Date().toISOString().split('T')[0],
            endDate: new Date().toISOString().split('T')[0],
          },
          {
            id: 5,
            text: 'Do something',
            daysLeft: 23,
            progress: 0,
            startDate: new Date().toISOString().split('T')[0],
            endDate: new Date().toISOString().split('T')[0],
          },
          {
            id: 4455,
            text: 'Do something',
            daysLeft: 23,
            progress: 0,
            startDate: new Date().toISOString().split('T')[0],
            endDate: new Date().toISOString().split('T')[0],
          },
          {
            id: 34,
            text: 'Do something',
            daysLeft: 23,
            progress: 0,
            startDate: new Date().toISOString().split('T')[0],
            endDate: new Date().toISOString().split('T')[0],
          },
          {
            id: 6,
            text: 'Do something',
            daysLeft: 23,
            progress: 0,
            startDate: new Date().toISOString().split('T')[0],
            endDate: new Date().toISOString().split('T')[0],
          },
          {
            id: 7,
            text: 'Do something',
            daysLeft: 23,
            progress: 0,
            startDate: new Date().toISOString().split('T')[0],
            endDate: new Date().toISOString().split('T')[0],
          },
        ];
  });

  const handleEditClick = (task: Task) => {
    setSelectedTask(task);
    setIsFlipped(true);
  };

  const handleUpdate = (updatedTask: Task) => {
    const { daysLeft, progress } = calculateDaysAndProgress(
      updatedTask.startDate,
      updatedTask.endDate
    );

    const newTask = {
      ...updatedTask,
      daysLeft,
      progress,
    };

    const newTasks = tasks.map((task) =>
      task.id === newTask.id ? newTask : task
    );
    setTasks(newTasks);
  };

  const handleDelete = (taskId: number) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
    setIsFlipped(false);
  };

  useEffect(() => {
    const updateDaysRemaining = () => {
      const updatedTasks = tasks.map((task) => {
        const { daysLeft, progress } = calculateDaysAndProgress(
          task.startDate,
          task.endDate
        );
        return { ...task, daysLeft, progress };
      });
      setTasks(updatedTasks);
    };

    updateDaysRemaining();

    const interval = setInterval(updateDaysRemaining, 24 * 60 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className='relative w-[400px] h-[470px] perspective-1000'>
      <div
        className={`absolute inset-0 transition-all duration-500 transform-style-preserve-3d ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
      >
        {/* Front Side */}
        <div
          className={`absolute inset-0 backface-hidden ${
            isDark
              ? 'bg-gradient-to-br from-purple-900 via-pink-900 to-red-900'
              : 'bg-gradient-to-br from-purple-200 via-pink-200 to-red-200'
          }`}
        >
          <div
            className={`h-full backdrop-blur-lg ${
              isDark ? 'bg-white/10' : 'bg-black/5'
            }  p-6 shadow-xl border ${
              isDark ? 'border-white/20' : 'border-black/10'
            }`}
          >
            <div className='flex justify-between items-center mb-6'>
              <h1
                className={`text-2xl font-bold ${
                  isDark ? 'text-white/90' : 'text-gray-800/90'
                }`}
              >
                Days Left
              </h1>
              <ThemeToggle />
            </div>

            <div
              className='h-[350px] overflow-y-auto pr-2 space-y-3
                        scrollbar-thin scrollbar-track-transparent
                        scrollbar-thumb-white/20 hover:scrollbar-thumb-white/30'
            >
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className='flex items-center gap-3'
                  onMouseEnter={() => setHoveredTaskId(task.id)}
                  onMouseLeave={() => setHoveredTaskId(null)}
                >
                  <input
                    type='text'
                    value={task.text}
                    className={`flex-1 backdrop-blur-sm rounded-lg px-3 py-2 outline-none ${
                      isDark
                        ? 'bg-white/10 focus:ring-white/30 text-white placeholder-white/50 border-white/10'
                        : 'bg-black/5 focus:ring-black/20 text-gray-800 placeholder-gray-500 border-black/10'
                    } border focus:ring-2`}
                    onChange={(e) =>
                      handleUpdate({ ...task, text: e.target.value })
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
                  <div className='relative w-10 h-10'>
                    {hoveredTaskId === task.id ? (
                      <button
                        onClick={() => handleEditClick(task)}
                        className={`absolute inset-0 flex items-center justify-center rounded-full transition-colors ${
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
                    ) : (
                      <CircleProgress
                        progress={task.progress}
                        isDark={isDark}
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Back Side - Edit Screen */}
        <div
          className={`absolute inset-0 backface-hidden rotate-y-180  ${
            isDark
              ? 'bg-gradient-to-br from-purple-900 via-pink-900 to-red-900'
              : 'bg-gradient-to-br from-purple-200 via-pink-200 to-red-200'
          }`}
        >
          {selectedTask && (
            <div>
              <EditTask
                task={selectedTask}
                isDark={isDark}
                onClose={() => setIsFlipped(false)}
                onUpdate={handleUpdate}
                onDelete={handleDelete}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskList;
