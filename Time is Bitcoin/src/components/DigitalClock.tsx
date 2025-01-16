import React from 'react';

interface DigitalClockProps {
  time: Date;
  timeZone: string;
}

export default function DigitalClock({ time, timeZone }: DigitalClockProps) {
  const formattedTime = new Intl.DateTimeFormat('en-US', {
    timeZone,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).format(time);

  return (
    <div className="font-mono text-4xl tracking-wider text-[#F7931A]">
      {formattedTime}
    </div>
  );
}