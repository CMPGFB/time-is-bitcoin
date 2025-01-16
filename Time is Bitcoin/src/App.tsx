import React from 'react';
import { Bitcoin, Square, DollarSign, Zap } from 'lucide-react';
import TimeZonePanel from './components/TimeZonePanel';
import BitcoinPanel from './components/BitcoinPanel';
import BitcoinClock from './components/BitcoinClock';
import ThemeToggle from './components/ThemeToggle';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { TimeZoneProvider } from './context/TimeZoneContext';

function AppContent() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className={`min-h-screen ${isDark ? 'bg-[#0D0D0D] text-white' : 'bg-white text-[#0D0D0D]'}`}>
      <header className={`border-b ${isDark ? 'border-[#242424]' : 'border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex items-center gap-2">
          <Bitcoin className="w-8 h-8 text-[#F7931A]" />
          <h1 className="text-2xl font-bold">Time Is Bitcoin</h1>
          <div className="ml-auto">
            <ThemeToggle />
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center mb-12">
          <p className="text-center text-lg text-gray-400 mb-6">
            Use Bitcoin As Your Global Clock
          </p>
          <div className="mb-6">
            <BitcoinClock />
          </div>
          <p className="text-center text-md text-gray-400 mb-4">
            One Block At A Time
          </p>
          <div className="flex items-center gap-8">
            <a
              href="https://mempool.space/address/bc1qqgpph8havxz343ywc82fqy8gkdtpzeg0mpdnu8"
              target="_blank"
              rel="noopener noreferrer"
              className={`p-2 rounded-lg transition-all duration-200 group ${
                isDark ? 'hover:bg-[#1A1A1A]' : 'hover:bg-gray-100'
              }`}
            >
              <Square className="w-6 h-6 text-gray-400 transition-colors group-hover:text-[#F7931A]" />
            </a>
            <a
              href="https://cash.app/$CMPGFB"
              target="_blank"
              rel="noopener noreferrer"
              className={`p-2 rounded-lg transition-all duration-200 group ${
                isDark ? 'hover:bg-[#1A1A1A]' : 'hover:bg-gray-100'
              }`}
            >
              <DollarSign className="w-6 h-6 text-gray-400 transition-colors group-hover:text-green-500" />
            </a>
            <a
              href="https://getalby.com/p/cmpgfb"
              target="_blank"
              rel="noopener noreferrer"
              className={`p-2 rounded-lg transition-all duration-200 group ${
                isDark ? 'hover:bg-[#1A1A1A]' : 'hover:bg-gray-100'
              }`}
            >
              <Zap className="w-6 h-6 text-gray-400 transition-colors group-hover:text-yellow-400" />
            </a>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <TimeZonePanel />
          <BitcoinPanel />
        </div>
        <div className={`mt-12 p-6 rounded-lg border ${
          isDark ? 'bg-[#1A1A1A] border-[#242424]' : 'bg-gray-50 border-gray-200'
        }`}>
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Bitcoin className="w-5 h-5 text-[#F7931A]" />
            Why Bitcoin Is The Perfect Global Clock
          </h2>
          <div className="space-y-4 text-sm">
            <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
              Bitcoin creates a new block approximately every 10 minutes, forming an immutable chain of time-stamped records. 
              Unlike traditional timekeeping systems that rely on centralized authorities, Bitcoin's temporal chain is:
            </p>
            <ul className={`list-disc pl-5 space-y-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              <li>
                <span className="font-medium text-[#F7931A]">Decentralized:</span> No single entity controls or can manipulate the timestamps
              </li>
              <li>
                <span className="font-medium text-[#F7931A]">Immutable:</span> Once recorded, block times cannot be altered
              </li>
              <li>
                <span className="font-medium text-[#F7931A]">Global:</span> The same block height and time are visible to everyone worldwide
              </li>
              <li>
                <span className="font-medium text-[#F7931A]">Precise:</span> Each block serves as a verifiable timestamp in Bitcoin's chronology
              </li>
            </ul>
            <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
              This makes Bitcoin not just a currency, but humanity's first truly decentralized and tamper-proof time-stamping system.
            </p>
          </div>
        </div>
      </main>
      <footer className={`border-t ${isDark ? 'border-[#242424]' : 'border-gray-200'} mt-12`}>
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className={`flex flex-col items-center space-y-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            <a
              href="https://x.com/CMPGFB"
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg hover:text-[#F7931A] transition-colors"
            >
              Built By @CMPGFB
            </a>
            <a
              href="https://twentyonesociety.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#F7931A] transition-colors"
            >
              Powered By TwentyOneSociety
            </a>
            <a
              href="https://cmpgfb.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#F7931A] transition-colors"
            >
              2025 © CMPGFB LLC.
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <TimeZoneProvider>
        <AppContent />
      </TimeZoneProvider>
    </ThemeProvider>
  );
}

export default App;
