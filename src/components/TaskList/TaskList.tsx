import React, { useEffect, useState } from 'react';
import { Task } from '../../constants/index';
import { useTheme } from '../../context/ThemeContext';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import EditTask from '@/screens/Edit/Edit.js';
import { calculateDaysAndProgress } from '@/helpers/dateCalculations.js';
import LinearProgress from '../LinearProgress/LinearProgress.js';

const TaskList: React.FC = () => {
  const { isDark } = useTheme();
  const [isFlipped, setIsFlipped] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks
      ? JSON.parse(savedTasks)
      : [
          {
            id: 1,
            text: 'Read 12 books across different genres (one per month)',
            daysLeft: 23,
            progress: 0,
            startDate: '12/05/24',
            endDate: '01/4/25',
          },
          {
            id: 2,
            text: 'Learn a new language or improve proficiency in one you know',
            daysLeft: 23,
            progress: 0,
            startDate: new Date().toISOString().split('T')[0],
            endDate: new Date().toISOString().split('T')[0],
          },
          {
            id: 3,
            text: 'Take a course or certification related to your interests or career',
            daysLeft: 23,
            progress: 0,
            startDate: new Date().toISOString().split('T')[0],
            endDate: new Date().toISOString().split('T')[0],
          },
          {
            id: 4,
            text: 'Establish a consistent fitness routine (e.g., exercise 4 times a week).',
            daysLeft: 23,
            progress: 0,
            startDate: new Date().toISOString().split('T')[0],
            endDate: new Date().toISOString().split('T')[0],
          },
          {
            id: 5,
            text: 'Practice mindfulness or meditation for at least 10 minutes daily',
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

  const formatTimeLeft = (task: Task) => {
    const { wholeDays, remainingHours } = calculateDaysAndProgress(
      task.startDate,
      task.endDate
    );
    return `${wholeDays}D ${remainingHours}H`;
  };

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
              ? 'bg-black' // Updated dark theme gradient
              : 'bg-white'
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
                  isDark ? 'text-white/90' : 'text-black/90'
                }`}
              >
                Tasks
              </h1>
              <ThemeToggle />
            </div>

            <div
              className={`h-[350px] overflow-y-auto pr-2 space-y-3
                        scrollbar-thin scrollbar-track-transparent
                         ${
                           isDark
                             ? 'hover:scrollbar-thumb-white/30 scrollbar-thumb-white/20'
                             : 'hover:scrollbar-thumb-black scrollbar-thumb-black/20'
                         }`}
            >
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className={`rounded-lg border  p-3 ${
                    isDark ? 'border-violet-50' : 'border-gray-300'
                  }`}
                  onClick={() => handleEditClick(task)}
                >
                  <div
                    key={task.id}
                    className='flex justify-between items-center gap-3'
                  >
                    <div
                      className={`text-2xl font-semibold text-white truncate overflow-hidden max-w-[180px] ${
                        isDark ? 'text-white/90' : 'text-black/90'
                      }`}
                    >
                      {task.text}
                    </div>
                    <div
                      className={`w-[100px] flex items-center justify-center text-2xl rounded-lg ${
                        isDark
                          ? 'bg-white/10 text-white/90 border-white/10'
                          : 'bg-black/5 text-gray-800/90 border-black/10'
                      } border`}
                    >
                      {formatTimeLeft(task)}
                    </div>
                  </div>
                  <div>
                    <LinearProgress
                      startDate={task.startDate}
                      endDate={task.endDate}
                      isDark={isDark}
                    />
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
              ? 'bg-black' // Updated dark theme gradient
              : 'bg-white'
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
