import React, { useId } from 'react';

interface TelemetryWaveformProps {
  type?: 'ecg' | 'spo2' | 'resp' | 'trend';
  color?: string;
  height?: number;
  animated?: boolean;
  className?: string;
}

export const TelemetryWaveform: React.FC<TelemetryWaveformProps> = ({
  type = 'ecg',
  color = '#0d9488', // teal-600
  height = 42,
  animated = true,
  className = '',
}) => {
  const filterId = useId();

  // Distinct clinical waveforms
  const getPath = () => {
    switch (type) {
      case 'ecg':
        // P-Q-R-S-T wave pattern
        return 'M 0 22 L 20 22 L 25 18 L 30 22 L 38 22 L 42 34 L 46 2 L 52 38 L 56 22 L 68 22 L 75 14 L 84 22 L 100 22 L 120 22 L 125 18 L 130 22 L 138 22 L 142 34 L 146 2 L 152 38 L 156 22 L 168 22 L 175 14 L 184 22 L 200 22 L 220 22 L 225 18 L 230 22 L 238 22 L 242 34 L 246 2 L 252 38 L 256 22 L 268 22 L 275 14 L 284 22 L 300 22';
      case 'spo2':
        // Dicrotic notch photoplethysmogram
        return 'M 0 28 Q 15 28 25 6 Q 30 8 35 14 Q 38 12 45 28 L 50 28 Q 65 28 75 6 Q 80 8 85 14 Q 88 12 95 28 L 100 28 Q 115 28 125 6 Q 130 8 135 14 Q 138 12 145 28 L 150 28 Q 165 28 175 6 Q 180 8 185 14 Q 188 12 195 28 L 200 28 Q 215 28 225 6 Q 230 8 235 14 Q 238 12 245 28 L 250 28 Q 265 28 275 6 Q 280 8 285 14 Q 288 12 295 28 L 300 28';
      case 'resp':
        // Smooth sine-like thoracic impedance
        return 'M 0 22 Q 25 4 50 22 Q 75 40 100 22 Q 125 4 150 22 Q 175 40 200 22 Q 225 4 250 22 Q 275 40 300 22';
      case 'trend':
      default:
        return 'M 0 28 L 30 26 L 60 29 L 90 22 L 120 24 L 150 18 L 180 20 L 210 14 L 240 16 L 270 12 L 300 10';
    }
  };

  return (
    <div className={`relative overflow-hidden w-full ${className}`} style={{ height }}>
      {/* Background medical grid */}
      <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 300 44">
        <defs>
          <pattern id={`grid-${filterId}`} width="15" height="11" patternUnits="userSpaceOnUse">
            <path d="M 15 0 L 0 0 0 11" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-slate-200/60 dark:text-slate-700/30" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#grid-${filterId})`} />

        {/* Waveform line */}
        <path
          d={getPath()}
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={animated ? 'animate-pulse' : ''}
          opacity="0.9"
        />
      </svg>
    </div>
  );
};
