'use client';

import React, { useState } from 'react';
import { Scales, FileText, Users, CheckCircle, AlertCircle, PlusCircle } from 'lucide-react';

interface DisputeCase {
  id: number;
  claimant: string;
  respondent: string;
  status: 'Filed' | 'JurorVoting' | 'Resolved';
  votesForClaimant: number;
  votesForRespondent: number;
  juryPoolSize: number;
}

export default function DisputeResolutionPanel() {
  const [disputes, setDisputes] = useState<DisputeCase[]>([
    {
      id: 1,
      claimant: '0x71C7...8976F',
      respondent: '0x32A1...4192B',
      status: 'JurorVoting',
      votesForClaimant: 3,
      votesForRespondent: 1,
      juryPoolSize: 5,
    },
    {
      id: 2,
      claimant: '0x94E2...1043C',
      respondent: '0x18B4...5567A',
      status: 'Filed',
      votesForClaimant: 0,
      votesForRespondent: 0,
      juryPoolSize: 0,
    },
  ]);

  const [newRespondent, setNewRespondent] = useState('');
  const [newIpfsHash, setNewIpfsHash] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleFileDispute = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRespondent || !newIpfsHash) return;

    setSubmitting(true);
    setTimeout(() => {
      const newCase: DisputeCase = {
        id: disputes.length + 1,
        claimant: '0x3333...ux',
        respondent: newRespondent,
        status: 'Filed',
        votesForClaimant: 0,
        votesForRespondent: 0,
        juryPoolSize: 0,
      };
      setDisputes([newCase, ...disputes]);
      setNewRespondent('');
      setNewIpfsHash('');
      setSubmitting(false);
    }, 1000);
  };

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl backdrop-blur-md">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-indigo-500/10 p-2.5 text-indigo-400 border border-indigo-500/20">
            <Scales className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-100">Dispute Resolution & Arbitration</h3>
            <p className="text-xs text-slate-400 font-mono">Repository: beast-dispute-resolution</p>
          </div>
        </div>
        <div className="rounded-full bg-indigo-950 px-3 py-1 text-xs font-semibold text-indigo-400 border border-indigo-800">
          {disputes.length} Active Cases
        </div>
      </div>

      {/* File New Dispute Form */}
      <form onSubmit={handleFileDispute} className="mt-6 rounded-lg border border-slate-800 bg-slate-950/50 p-4">
        <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3 flex items-center gap-2">
          <PlusCircle className="h-4 w-4 text-cyan-400" />
          File New Civic Claim
        </h4>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <input
            type="text"
            placeholder="Respondent Address (0x...)"
            value={newRespondent}
            onChange={(e) => setNewRespondent(e.target.value)}
            className="rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-xs font-mono text-slate-200 focus:border-cyan-500 focus:outline-none"
          />
          <input
            type="text"
            placeholder="Evidence IPFS CID (Qm...)"
            value={newIpfsHash}
            onChange={(e) => setNewIpfsHash(e.target.value)}
            className="rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-xs font-mono text-slate-200 focus:border-cyan-500 focus:outline-none"
          />
        </div>
        <button
          type="submit"
          disabled={submitting}
          className="mt-3 w-full rounded-lg bg-indigo-600 hover:bg-indigo-500 py-2 text-xs font-bold text-white transition-all shadow-lg shadow-indigo-950"
        >
          {submitting ? 'Filing Claim on System Bus...' : 'Submit Dispute Claim'}
        </button>
      </form>

      {/* Disputes List */}
      <div className="mt-6 space-y-3">
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Arbitration Registry</h4>
        {disputes.map((dispute) => (
          <div key={dispute.id} className="rounded-lg border border-slate-800 bg-slate-950/30 p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-cyan-400 font-mono">Case #{dispute.id}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded font-semibold ${
                  dispute.status === 'JurorVoting' ? 'bg-amber-950 text-amber-400 border border-amber-800' : 'bg-slate-800 text-slate-300'
                }`}>
                  {dispute.status}
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono mt-1">
                Claimant: {dispute.claimant} → Respondent: {dispute.respondent}
              </p>
            </div>

            <div className="flex items-center gap-4 text-xs font-mono">
              <div className="text-right">
                <span className="text-emerald-400 font-bold">{dispute.votesForClaimant} For</span> / <span className="text-red-400 font-bold">{dispute.votesForRespondent} Against</span>
                <p className="text-[10px] text-slate-500">Jury Quorum: {dispute.votesForClaimant + dispute.votesForRespondent}/{dispute.juryPoolSize || 'Pending'}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
