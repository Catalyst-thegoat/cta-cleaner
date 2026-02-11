import { motion } from 'framer-motion';

interface ScoreRingProps {
  score: number;
  grade: string;
  size?: number;
  strokeWidth?: number;
}

const gradeColors: Record<string, string> = {
  'A+': '#22c55e',
  'A': '#4ade80',
  'B': '#eab308',
  'C': '#f59e0b',
  'D': '#f97316',
  'F': '#ef4444',
};

const gradeVerdicts: Record<string, string> = {
  'A+': 'Excellent! 🎉',
  'A': 'Great!',
  'B': 'Pretty good',
  'C': 'Room for improvement',
  'D': 'Needs work',
  'F': 'Critical fixes needed',
};

export default function ScoreRing({ score, grade, size = 200, strokeWidth = 8 }: ScoreRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (score / 100) * circumference;
  const color = gradeColors[grade] || '#8b5cf6';
  const verdict = gradeVerdicts[grade] || 'Analyzing...';

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        {/* Background ring */}
        <svg className="transform -rotate-90" width={size} height={size}>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth={strokeWidth}
          />
          {/* Animated score ring */}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            style={{ filter: `drop-shadow(0 0 10px ${color})` }}
          />
        </svg>

        {/* Inner content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
          >
            <span
              className="text-5xl font-bold"
              style={{ color }}
            >
              {grade}
            </span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-sm text-gray-400 mt-1"
          >
            {score}/100
          </motion.div>
        </div>

        {/* Glow effect */}
        <div
          className="absolute inset-0 rounded-full opacity-30"
          style={{
            background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
            filter: 'blur(20px)',
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="mt-6 text-center"
      >
        <h3
          className="text-2xl font-bold"
          style={{ color }}
        >
          {verdict}
        </h3>
      </motion.div>
    </div>
  );
}
