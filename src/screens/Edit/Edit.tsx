import { Task } from '@/constants';
import { calculateDaysAndProgress } from '@/helpers/dateCalculations';
import { useEffect, useState } from 'react';

interface EditTaskProps {
  task: Task;
  isDark: boolean;
  onClose: () => void;
  onUpdate: (updatedTask: Task) => void;
  onDelete: (taskId: number) => void;
}

const EditTask: React.FC<EditTaskProps> = ({
  task,
  isDark,
  onClose,
  onUpdate,
  onDelete,
}) => {
  const [editedTask, setEditedTask] = useState<Task>(task);

  useEffect(() => {
    setEditedTask(task);
  }, [task]);

  useEffect(() => {
    if (editedTask.startDate && editedTask.endDate) {
      const { daysLeft, progress } = calculateDaysAndProgress(
        editedTask.startDate,
        editedTask.endDate
      );
      setEditedTask((prev) => ({
        ...prev,
        daysLeft,
        progress,
      }));
    }
  }, [editedTask.startDate, editedTask.endDate]);

  const handleSave = () => {
    const { daysLeft, progress } = calculateDaysAndProgress(
      editedTask.startDate,
      editedTask.endDate
    );
    onUpdate({
      ...editedTask,
      daysLeft,
      progress,
    });
    onClose();
  };

  const handleDateChange = (field: 'startDate' | 'endDate', value: string) => {
    setEditedTask((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div
      className={`h-[470px] backdrop-blur-lg ${
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
          Edit Task
        </h1>
        <button
          onClick={onClose}
          className={`p-2 rounded-full transition-colors ${
            isDark ? 'hover:bg-white/10' : 'hover:bg-black/10'
          }`}
        >
          <svg
            className={`w-6 h-6 ${
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

      <div className='space-y-4'>
        <div className='space-y-2'>
          <label
            className={`block text-sm ${
              isDark ? 'text-white/70' : 'text-gray-600'
            }`}
          >
            Task Title
          </label>
          <input
            type='text'
            value={editedTask.text}
            onChange={(e) =>
              setEditedTask({
                ...editedTask,
                text: e.target.value,
              })
            }
            className={`w-full backdrop-blur-sm rounded-lg px-3 py-2 outline-none ${
              isDark
                ? 'bg-white/10 focus:ring-white/30 text-white border-white/10'
                : 'bg-black/5 focus:ring-black/20 text-gray-800 border-black/10'
            } border focus:ring-2`}
          />
        </div>

        <div className='space-y-2'>
          <label
            className={`block text-sm ${
              isDark ? 'text-white/70' : 'text-gray-600'
            }`}
          >
            Start Date
          </label>
          <input
            type='date'
            value={editedTask.startDate}
            onChange={(e) => handleDateChange('startDate', e.target.value)}
            className={`w-full backdrop-blur-sm rounded-lg px-3 py-2 outline-none ${
              isDark
                ? 'bg-white/10 focus:ring-white/30 text-white border-white/10'
                : 'bg-black/5 focus:ring-black/20 text-gray-800 border-black/10'
            } border focus:ring-2`}
          />
        </div>

        <div className='space-y-2'>
          <label
            className={`block text-sm ${
              isDark ? 'text-white/70' : 'text-gray-600'
            }`}
          >
            End Date
          </label>
          <input
            type='date'
            value={editedTask.endDate}
            onChange={(e) => handleDateChange('endDate', e.target.value)}
            className={`w-full backdrop-blur-sm rounded-lg px-3 py-2 outline-none ${
              isDark
                ? 'bg-white/10 focus:ring-white/30 text-white border-white/10'
                : 'bg-black/5 focus:ring-black/20 text-gray-800 border-black/10'
            } border focus:ring-2`}
          />
        </div>

        <div></div>
        <button
          onClick={handleSave}
          className={`w-full py-2 rounded-lg transition-colors ${
            isDark
              ? 'bg-white/10 hover:bg-white/20 text-white'
              : 'bg-black/5 hover:bg-black/10 text-gray-800'
          }`}
        >
          Save Changes
        </button>

        <button
          onClick={() => onDelete(task.id)}
          className={`w-full py-2 rounded-lg transition-colors ${
            isDark
              ? 'bg-red-500/20 hover:bg-red-500/30 text-red-300'
              : 'bg-red-500/10 hover:bg-red-500/20 text-red-600'
          }`}
        >
          Delete Task
        </button>
      </div>
    </div>
  );
};

export default EditTask;
