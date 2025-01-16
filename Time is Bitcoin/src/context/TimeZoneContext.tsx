import React, { createContext, useState, useContext } from 'react';

interface TimeZoneContextType {
  selectedZone: string;
  setSelectedZone: (zone: string) => void;
}

export const TimeZoneContext = createContext<TimeZoneContextType>({
  selectedZone: 'UTC',
  setSelectedZone: () => {}
});

export function TimeZoneProvider({ children }: { children: React.ReactNode }) {
  const [selectedZone, setSelectedZone] = useState('UTC');

  return (
    <TimeZoneContext.Provider value={{ selectedZone, setSelectedZone }}>
      {children}
    </TimeZoneContext.Provider>
  );
}

export function useTimeZone() {
  const context = useContext(TimeZoneContext);
  if (context === undefined) {
    throw new Error('useTimeZone must be used within a TimeZoneProvider');
  }
  return context;
}