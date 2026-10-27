'use client';

import React from 'react';
import DisputeResolutionPanel from '@/components/DisputeResolutionPanel';
import { Scales, ArrowLeft, Shield, Terminal } from 'lucide-react';
import Link from 'next/link';

export default function DisputeResolutionPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-10">
      {/* Navigation Header */}
      <div className="mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Digital Constitution Engine Dashboard
        </Link>
      </div>

      {/* Header Banner */}
      <header className="mb-8 border-b border-slate-800 pb-6">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-white flex items-center gap-3">
              <Scales className="h-8 w-8 text-indigo-400" />
              beast-dispute-resolution
            </h1>
            <p className="text-sm text-slate-400 mt-1 font-mono">
              Autonomous Decoupled Arbitrator & Civic Judiciary Subsystem (Repository #1,201)
            </p>
          </div>
          <div className="flex items-center gap-3 mt-4 md:mt-0">
            <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs font-mono text-slate-300">
              <span className="h-2 w-2 rounded-full bg-indigo-400 animate-pulse" />
              <span>System Bus: Synced</span>
            </div>
            <div className="bg-indigo-950 border border-indigo-800 text-indigo-300 rounded-lg px-3 py-1.5 text-xs font-mono font-semibold">
              Module: Arbitration
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        <div className="lg:col-span-12">
          <DisputeResolutionPanel />
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-12 border-t border-slate-900 pt-6 text-center text-xs text-slate-500 font-mono">
        <p>BEAST System 3.0 • Repository `beast-dispute-resolution` • Connected to `pat333-ux` Event Bus</p>
      </footer>
    </main>
  );
}
