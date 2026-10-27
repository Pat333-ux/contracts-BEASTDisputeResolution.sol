'use client';

import React, { useState } from 'react';
import { ArrowLeftRight, Coins, TrendingUp, ShieldCheck, PlusCircle } from 'lucide-react';

export default function TradeExchangePanel() {
  const [lucrAmount, setLucrAmount] = useState('');
  const [creditsOut, setCreditsOut] = useState('0.00');
  const [swapping, setSwapping] = useState(false);

  // Pool stats
  const lucrReserve = 50000;
  const creditReserve = 200000;

  const handleLucrChange = (val: string) => {
    setLucrAmount(val);
    const num = Number(val);
    if (num > 0) {
      const fee = num * 0.003;
      const net = num - fee;
      const out = (creditReserve * net) / (lucrReserve + net);
      setCreditsOut(out.toFixed(2));
    } else {
      setCreditsOut('0.00');
    }
  };

  const handleExecuteSwap = (e: React.FormEvent) => {
    e.preventDefault();
    if (!lucrAmount || Number(lucrAmount) <= 0) return;

    setSwapping(true);
    setTimeout(() => {
      setLucrAmount('');
      setCreditsOut('0.00');
      setSwapping(false);
    }, 1200);
  };

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl backdrop-blur-md">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-cyan-500/10 p-2.5 text-cyan-400 border border-cyan-500/20">
            <Coins className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-100">Decentralized Trade & Resource Exchange</h3>
            <p className="text-xs text-slate-400 font-mono">Repository: beast-trade-exchange</p>
          </div>
        </div>
        <div className="rounded-full bg-cyan-950 px-3 py-1 text-xs font-semibold text-cyan-400 border border-cyan-800">
          AMM Pool: Active
        </div>
      </div>

      {/* Pool Metrics Grid */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-lg border border-slate-800 bg-slate-950/50 p-4">
          <p className="text-xs font-semibold text-slate-400">LUCR Reserve</p>
          <p className="mt-2 text-lg font-bold text-white font-mono">{lucrReserve.toLocaleString()} LUCR</p>
        </div>
        <div className="rounded-lg border border-slate-800 bg-slate-950/50 p-4">
          <p className="text-xs font-semibold text-slate-400">Resource Credit Reserve</p>
          <p className="mt-2 text-lg font-bold text-cyan-400 font-mono">{creditReserve.toLocaleString()} CREDITS</p>
        </div>
        <div className="rounded-lg border border-slate-800 bg-slate-950/50 p-4">
          <p className="text-xs font-semibold text-slate-400">Exchange Rate</p>
          <p className="mt-2 text-lg font-bold text-emerald-400 font-mono">1 LUCR = 4.00 CREDITS</p>
        </div>
      </div>

      {/* Swap Form */}
      <form onSubmit={handleExecuteSwap} className="mt-6 rounded-lg border border-slate-800 bg-slate-950/50 p-5">
        <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-4 flex items-center gap-2">
          <ArrowLeftRight className="h-4 w-4 text-cyan-400" />
          Swap LUCR for Resource Credits
        </h4>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1">You Pay (LUCR)</label>
            <input
              type="number"
              placeholder="0.00"
              value={lucrAmount}
              onChange={(e) => handleLucrChange(e.target.value)}
              className="w-full rounded-lg border border-slate-800 bg-slate-900 px-4 py-3 text-sm font-mono text-slate-100 focus:border-cyan-500 focus:outline-none"
            />
          </div>

          <div className="flex justify-center">
            <div className="rounded-full bg-slate-800 p-2 text-cyan-400">
              <ArrowLeftRight className="h-4 w-4 rotate-90" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1">You Receive (Estimated Credits)</label>
            <div className="w-full rounded-lg border border-slate-800 bg-slate-900 px-4 py-3 text-sm font-mono text-cyan-400 font-bold">
              {creditsOut} CREDITS
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={swapping}
          className="mt-5 w-full rounded-lg bg-cyan-600 hover:bg-cyan-500 py-3 text-xs font-bold text-white transition-all shadow-lg shadow-cyan-950"
        >
          {swapping ? 'Executing AMM Swap on System Bus...' : 'Execute Resource Swap'}
        </button>
      </form>
    </div>
  );
}
