import React, { useState, useEffect, useContext } from 'react';
import { Bitcoin } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { TimeZoneContext } from '../context/TimeZoneContext';

interface BlockInfo {
  height: number;
  timestamp: number;
  lastBlockTime: number;
  medianBlockTime: number;
}

export default function BitcoinPanel() {
  const [blockInfo, setBlockInfo] = useState<BlockInfo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();
  const { selectedZone } = useContext(TimeZoneContext);
  const isDark = theme === 'dark';

  const RETRY_DELAYS = [2000, 5000, 10000]; // Retry after 2s, 5s, then 10s
  const [retryCount, setRetryCount] = useState(0);

  const fetchBlockInfo = async () => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

      // Get the current block height
      const heightResponse = await fetch('https://mempool.space/api/blocks/tip/height', {
        signal: controller.signal
      });
      
      if (!heightResponse.ok) {
        throw new Error('Failed to fetch block height');
      }
      
      const height = await heightResponse.text();

      // Get the block hash for this height
      const hashResponse = await fetch(`https://mempool.space/api/block-height/${height}`, {
        signal: controller.signal
      });
      
      if (!hashResponse.ok) {
        throw new Error('Failed to fetch block hash');
      }
      
      const hash = await hashResponse.text();

      // Get the block details
      const blockResponse = await fetch(`https://mempool.space/api/block/${hash}`, {
        signal: controller.signal
      });
      
      if (!blockResponse.ok) {
        throw new Error('Failed to fetch block details');
      }
      
      const block = await blockResponse.json();
      
      // Get the previous block for timing
      const prevBlockResponse = await fetch(`https://mempool.space/api/block-height/${parseInt(height) - 1}`, {
        signal: controller.signal
      });
      const prevBlockHash = await prevBlockResponse.text();
      const prevBlock = await (await fetch(`https://mempool.space/api/block/${prevBlockHash}`, {
        signal: controller.signal
      })).json();

      setBlockInfo({
        height: parseInt(height),
        timestamp: block.timestamp,
        lastBlockTime: block.timestamp - prevBlock.timestamp,
        medianBlockTime: 600 // Default to 10 minutes
      });
      setError(null);
      setRetryCount(0); // Reset retry count on success
      clearTimeout(timeoutId);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch block information';
      setError('Unable to connect to mempool.space. Retrying...');
      console.error('Error fetching block info:', errorMessage);
      
      // Schedule retry if we haven't exceeded max retries
      if (retryCount < RETRY_DELAYS.length) {
        setTimeout(() => {
          setRetryCount(prev => prev + 1);
          fetchBlockInfo();
        }, RETRY_DELAYS[retryCount]);
      } else {
        setError('Unable to connect to mempool.space. Please check your connection and refresh the page.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlockInfo();
        
    const interval = setInterval(fetchBlockInfo, 60000); // Regular updates every minute
    return () => {
      clearInterval(interval);
    };
  }, []);

  const formatTimestamp = (timestamp: number) => {
    return new Intl.DateTimeFormat('en-US', {
      timeZone: selectedZone,
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    }).format(timestamp * 1000);
  };

  return (
    <div className={`rounded-lg border p-6 ${
      isDark ? 'bg-[#1A1A1A] border-[#242424]' : 'bg-gray-50 border-gray-200'
    }`}>
      <div className="flex items-center gap-2 mb-6">
        <Bitcoin className="w-5 h-5 text-[#F7931A]" />
        <h2 className="text-lg font-semibold">Latest Bitcoin Block</h2>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#F7931A]"></div>
        </div>
      ) : error ? (
        <div className="bg-[#2D1A1A] rounded-lg p-4">
          <p className="text-red-400">{error}</p>
        </div>
      ) : blockInfo && (
        <div className="space-y-4">
          <div className={`rounded-lg p-4 ${isDark ? 'bg-[#242424]' : 'bg-gray-100'}`}>
            <div className="flex justify-between items-center">
              <div>
                <p className={`text-sm mb-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Current Block</p>
                <p className="text-2xl font-bold text-[#F7931A]">{blockInfo.height.toLocaleString()}</p>
              </div>
              <div className="text-right">
                <p className={`text-sm mb-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Time Since Last Block</p>
                <p className="text-lg font-medium">{Math.floor(blockInfo.lastBlockTime / 60)} minutes</p>
              </div>
            </div>
          </div>

          <div className={`rounded-lg p-4 ${isDark ? 'bg-[#242424]' : 'bg-gray-100'}`}>
            <p className={`text-sm mb-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Block Time ({selectedZone})</p>
            <p className="text-lg font-medium">{formatTimestamp(blockInfo.timestamp)}</p>
            <div className="mt-2 text-sm text-gray-400">
              Block Interval: ~{blockInfo.medianBlockTime / 60} minutes
            </div>
          </div>
          
          <a
            href="https://global.transak.com/?apiKey=722fb908-3edc-4792-9a98-1d8e2d5e4a24&cryptoCurrencyList=BTC&defaultCryptoCurrency=BTC"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full"
          >
            <button
              className="w-full flex items-center justify-center gap-2 bg-[#F7931A] hover:bg-[#E68308] text-white py-3 px-6 rounded-lg transition-colors duration-200"
            >
              <Bitcoin className="w-5 h-5" />
              <span className="font-medium">Buy Bitcoin</span>
            </button>
          </a>
        </div>
      )}
    </div>
  );
}