'use client';

import React, { useState } from 'react';
import { Award, ShieldCheck, Lock, PlusCircle, CheckCircle2 } from 'lucide-react';

interface CredentialItem {
  id: number;
  recipient: string;
  type: string;
  hash: string;
  isLocked: boolean;
}

export default function CredentialEnginePanel() {
  const [credentials, setCredentials] = useState<CredentialItem[]>([
    {
      id: 1,
      recipient: '0x71C7...8976F',
      type: 'FAMILY_PRESERVATION',
      hash: 'QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG',
      isLocked: true,
    },
    {
      id: 2,
      recipient: '0x3333...ux',
      type: 'CIVIC_GOVERNANCE_AUDITOR',
      hash: 'QmZ4tW9vX8kL2mN5pQ7rS3tU1vW4xY6zA8bC9dE2fG3h',
      isLocked: true,
    },
  ]);

  const [recipientInput, setRecipientInput] = useState('');
  const [typeInput, setTypeInput] = useState('FAMILY_PRESERVATION');
  const [hashInput, setHashInput] = useState('');
  const [issuing, setIssuing] = useState(false);

  const handleIssueCredential = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipientInput || !hashInput) return;

    setIssuing(true);
    setTimeout(() => {
      const newCred: CredentialItem = {
        id: credentials.length + 1,
        recipient: recipientInput,
        type: typeInput,
        hash: hashInput,
        isLocked: true,
      };
      setCredentials([newCred, ...credentials]);
      setRecipientInput('');
      setHashInput('');
      setIssuing(false);
    }, 1000);
  };

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl backdrop-blur-md">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-amber-500/10 p-2.5 text-amber-400 border border-amber-500/20">
            <Award className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-100">Soulbound Credential Engine</h3>
            <p className="text-xs text-slate-400 font-mono">Repository: beast-credential-engine (ERC-5192)</p>
          </div>
        </div>
        <div className="rounded-full bg-amber-950 px-3 py-1 text-xs font-semibold text-amber-400 border border-amber-800">
          {credentials.length} Active SBTs
        </div>
      </div>

      {/* Issuance Form */}
      <form onSubmit={handleIssueCredential} className="mt-6 rounded-lg border border-slate-800 bg-slate-950/50 p-4">
        <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3 flex items-center gap-2">
          <PlusCircle className="h-4 w-4 text-cyan-400" />
          Issue New Verifiable SBT Credential
        </h4>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <input
            type="text"
            placeholder="Recipient Address (0x...)"
            value={recipientInput}
            onChange={(e) => setRecipientInput(e.target.value)}
            className="rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-xs font-mono text-slate-200 focus:border-cyan-500 focus:outline-none"
          />
          <select
            value={typeInput}
            onChange={(e) => setTypeInput(e.target.value)}
            className="rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-xs font-mono text-slate-200 focus:border-cyan-500 focus:outline-none"
          >
            <option value="FAMILY_PRESERVATION">FAMILY_PRESERVATION</option>
            <option value="CIVIC_GOVERNANCE_AUDITOR">CIVIC_GOVERNANCE_AUDITOR</option>
            <option value="SOVEREIGN_MEMBER">SOVEREIGN_MEMBER</option>
          </select>
          <input
            type="text"
            placeholder="Metadata IPFS CID (Qm...)"
            value={hashInput}
            onChange={(e) => setHashInput(e.target.value)}
            className="rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-xs font-mono text-slate-200 focus:border-cyan-500 focus:outline-none"
          />
        </div>
        <button
          type="submit"
          disabled={issuing}
          className="mt-3 w-full rounded-lg bg-amber-600 hover:bg-amber-500 py-2 text-xs font-bold text-white transition-all shadow-lg shadow-amber-950"
        >
          {issuing ? 'Minting Soulbound Token...' : 'Issue Soulbound Credential'}
        </button>
      </form>

      {/* Credential Registry List */}
      <div className="mt-6 space-y-3">
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Soulbound Badge Registry</h4>
        {credentials.map((cred) => (
          <div key={cred.id} className="rounded-lg border border-slate-800 bg-slate-950/30 p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-amber-400 font-mono">Badge #{cred.id}</span>
                <span className="text-[10px] px-2 py-0.5 rounded font-semibold bg-amber-950 text-amber-300 border border-amber-800 font-mono">
                  {cred.type}
                </span>
                <span className="flex items-center gap-1 text-[10px] px-2 py-0.5 rounded font-semibold bg-emerald-950 text-emerald-400 border border-emerald-800 font-mono">
                  <Lock className="h-3 w-3" /> ERC-5192 LOCKED
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono mt-1">
                Recipient: {cred.recipient} | IPFS CID: {cred.hash}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
