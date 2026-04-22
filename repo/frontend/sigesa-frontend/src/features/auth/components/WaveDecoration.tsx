interface WaveDecorationProps {
  side: 'left' | 'right';
}

export default function WaveDecoration({ side }: WaveDecorationProps) {
  if (side === 'left') {
    return (
      <div className="absolute bottom-0 left-0 right-0 h-28 overflow-hidden pointer-events-none">
        <svg viewBox="0 0 700 120" preserveAspectRatio="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 80 Q100 40 200 70 Q300 100 400 60 Q500 20 700 50 L700 120 L0 120Z" fill="#6B2D0E" opacity="0.85" />
          <path d="M0 90 Q120 50 240 80 Q360 110 480 70 Q580 40 700 65 L700 120 L0 120Z" fill="#D4A017" opacity="0.8" />
          <path d="M0 100 Q150 65 300 90 Q450 115 600 80 Q650 70 700 78 L700 120 L0 120Z" fill="#2E7D32" opacity="0.85" />
        </svg>
      </div>
    );
  }

  return (
    <div className="absolute bottom-0 left-0 right-0 h-28 overflow-hidden pointer-events-none">
      <svg viewBox="0 0 600 120" preserveAspectRatio="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 85 Q100 50 200 75 Q300 100 400 65 Q500 30 600 55 L600 120 L0 120Z" fill="#5A1E08" opacity="0.6" />
        <path d="M0 95 Q120 60 240 85 Q360 110 480 75 Q540 55 600 70 L600 120 L0 120Z" fill="#D4A017" opacity="0.5" />
        <path d="M0 105 Q150 75 300 95 Q450 115 600 90 L600 120 L0 120Z" fill="#2E7D32" opacity="0.6" />
      </svg>
    </div>
  );
}
