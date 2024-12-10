interface MetricCardProps {
  label: string;
  value: string;
  isDark: boolean;
  className?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  isDark,
  className = '',
}) => (
  <div
    className={`${className} p-3 rounded-lg ${
      isDark ? 'bg-white/5' : 'bg-black/5'
    } backdrop-blur-sm`}
  >
    <div className={`text-xs ${isDark ? 'text-white/50' : 'text-gray-600'}`}>
      {label}
    </div>
    <div
      className={`text-lg font-semibold mt-1 ${
        isDark ? 'text-white' : 'text-gray-800'
      }`}
    >
      {value}
    </div>
  </div>
);

export default MetricCard;
