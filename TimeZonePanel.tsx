import React, { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';
import DigitalClock from './DigitalClock';
import { useTheme } from '../context/ThemeContext';
import { useTimeZone } from '../context/TimeZoneContext';

const TIMEZONES = {
  'UTC/GMT': ['UTC'],
  Africa: [
    'Africa/Cairo',
    'Africa/Casablanca',
    'Africa/Johannesburg',
    'Africa/Lagos',
    'Africa/Nairobi'
  ],
  Americas: [
    'America/New_York',
    'America/Chicago',
    'America/Denver',
    'America/Los_Angeles',
    'America/Toronto',
    'America/Vancouver',
    'America/Mexico_City',
    'America/Sao_Paulo',
    'America/Buenos_Aires'
  ],
  Asia: [
    'Asia/Dubai',
    'Asia/Shanghai',
    'Asia/Tokyo',
    'Asia/Singapore',
    'Asia/Seoul',
    'Asia/Kolkata',
    'Asia/Bangkok',
    'Asia/Jakarta',
    'Asia/Hong_Kong'
  ],
  'Australia/Pacific': [
    'Australia/Sydney',
    'Australia/Melbourne',
    'Australia/Perth',
    'Pacific/Auckland',
    'Pacific/Honolulu'
  ],
  'Europe/Russia': [
    'Europe/London',
    'Europe/Paris',
    'Europe/Berlin',
    'Europe/Moscow',
    'Europe/Rome',
    'Europe/Madrid',
    'Europe/Amsterdam',
    'Europe/Stockholm',
    'Europe/Istanbul'
  ]
};

export default function TimeZonePanel() {
  const { selectedZone, setSelectedZone } = useTimeZone();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedContinent, setSelectedContinent] = useState('UTC/GMT');
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    // Set initial timezone to UTC if UTC/GMT is selected
    if (selectedContinent === 'UTC/GMT') {
      setSelectedZone('UTC');
    }
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formattedTime = new Intl.DateTimeFormat('en-US', {
    timeZone: selectedZone,
    dateStyle: 'full',
    timeStyle: 'long'
  }).format(currentTime);

  return (
    <div className={`rounded-lg border p-6 ${
      isDark ? 'bg-[#1A1A1A] border-[#242424]' : 'bg-gray-50 border-gray-200'
    }`}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-[#F7931A]" />
          <h2 className="text-lg font-semibold">World Clock</h2>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="continent" className="block text-sm font-medium text-gray-400 mb-2">
            Select Region
          </label>
          <select
            id="continent"
            className={`block w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F7931A] transition-colors ${
              isDark ? 'bg-[#242424] border-[#333333] text-white' : 'bg-white border-gray-300 text-gray-900'
            }`}
            value={selectedContinent}
            onChange={(e) => {
              setSelectedContinent(e.target.value);
              setSelectedZone(TIMEZONES[e.target.value][0]);
            }}
          >
            {Object.keys(TIMEZONES).map((continent) => (
              <option key={continent} value={continent}>
                {continent}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="timezone" className="block text-sm font-medium text-gray-400 mb-2">
            {selectedContinent === 'UTC/GMT' ? 'Select Offset' : 'Select City'}
          </label>
          <select
            id="city"
            className={`block w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F7931A] transition-colors ${
              isDark ? 'bg-[#242424] border-[#333333] text-white' : 'bg-white border-gray-300 text-gray-900'
            }`}
            value={selectedZone}
            onChange={(e) => setSelectedZone(e.target.value)}
          >
            {TIMEZONES[selectedContinent].map((zone) => (
              <option key={zone} value={zone}>
                {zone.split('/').pop().replace('_', ' ')}
              </option>
            ))}
          </select>
        </div>

        <div className={`rounded-lg p-6 flex items-center justify-center ${
          isDark ? 'bg-[#242424]' : 'bg-gray-100'
        }`}>
          <div className="flex flex-col items-center">
            <DigitalClock time={currentTime} timeZone={selectedZone} />
            <p className={`text-sm mt-4 h-6 ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}>{formattedTime}</p>
          </div>
        </div>
      </div>
    </div>
  );
}