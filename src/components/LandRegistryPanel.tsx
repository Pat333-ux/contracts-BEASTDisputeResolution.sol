'use client';

import React, { useState } from 'react';
import { MapPin, Building, ShieldCheck, AlertTriangle, PlusCircle } from 'lucide-react';

interface Parcel {
  id: number;
  owner: string;
  geoHash: string;
  assessedValue: number;
  isDisputed: boolean;
}

export default function LandRegistryPanel() {
  const [parcels, setParcels] = useState<Parcel[]>([
    {
      id: 1,
      owner: '0x71C7...8976F',
      geoHash: 'QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG',
      assessedValue: 250000,
      isDisputed: false,
    },
    {
      id: 2,
      owner: '0x3333...ux',
      geoHash: 'QmZ4tW9vX8kL2mN5pQ7rS3tU1vW4xY6zA8bC9dE2fG3h',
      assessedValue: 475000,
      isDisputed: false,
    },
  ]);

  const [ownerInput, setOwnerInput] = useState('');
  const [geoHashInput, setGeoHashInput] = useState('');
  const [valueInput, setValueInput] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleRegisterParcel = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ownerInput || !geoHashInput || !valueInput) return;

    setSubmitting(true);
    setTimeout(() => {
      const newParcel: Parcel = {
        id: parcels.length + 1,
        owner: ownerInput,
        geoHash: geoHashInput,
        assessedValue: Number(valueInput),
        isDisputed: false,
      };
      setParcels([newParcel, ...parcels]);
      setOwnerInput('');
      setGeoHashInput('');
      setValueInput('');
      setSubmitting(false);
    }, 1000);
  };

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl backdrop-blur-md">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-emerald-500/10 p-2.5 text-emerald-400 border border-emerald-500/20">
            <MapPin className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-100">Sovereign Land Registry & GIS</h3>
            <p className="text-xs text-slate-400 font-mono">Repository: beast-land-registry</p>
          </div>
        </div>
        <div className="rounded-full bg-emerald-950 px-3 py-1 text-xs font-semibold text-emerald-400 border border-emerald-800">
          {parcels.length} Registered Parcels
        </div>
      </div>

      {/* Registration Form */}
      <form onSubmit={handleRegisterParcel} className="mt-6 rounded-lg border border-slate-800 bg-slate-950/50 p-4">
        <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3 flex items-center gap-2">
          <PlusCircle className="h-4 w-4 text-cyan-400" />
          Register New Land Parcel
        </h4>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <input
            type="text"
            placeholder="Owner Address (0x...)"
            value={ownerInput}
            onChange={(e) => setOwnerInput(e.target.value)}
            className="rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-xs font-mono text-slate-200 focus:border-cyan-500 focus:outline-none"
          />
          <input
            type="text"
            placeholder="GeoJSON IPFS CID (Qm...)"
            value={geoHashInput}
            onChange={(e) => setGeoHashInput(e.target.value)}
            className="rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-xs font-mono text-slate-200 focus:border-cyan-500 focus:outline-none"
          />
          <input
            type="number"
            placeholder="Assessed Value (LUCR)"
            value={valueInput}
            onChange={(e) => setValueInput(e.target.value)}
            className="rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-xs font-mono text-slate-200 focus:border-cyan-500 focus:outline-none"
          />
        </div>
        <button
          type="submit"
          disabled={submitting}
          className="mt-3 w-full rounded-lg bg-emerald-600 hover:bg-emerald-500 py-2 text-xs font-bold text-white transition-all shadow-lg shadow-emerald-950"
        >
          {submitting ? 'Registering Parcel on Chain...' : 'Register Parcel Deed'}
        </button>
      </form>

      {/* Parcels Registry List */}
      <div className="mt-6 space-y-3">
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Land Parcel Registry</h4>
        {parcels.map((parcel) => (
          <div key={parcel.id} className="rounded-lg border border-slate-800 bg-slate-950/30 p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-emerald-400 font-mono">Parcel #{parcel.id}</span>
                <span className="text-[10px] px-2 py-0.5 rounded font-semibold bg-slate-800 text-slate-300 font-mono">
                  {parcel.assessedValue.toLocaleString()} LUCR
                </span>
                {parcel.isDisputed && (
                  <span className="text-[10px] px-2 py-0.5 rounded font-semibold bg-red-950 text-red-400 border border-red-800">
                    DISPUTED
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400 font-mono mt-1">
                Owner: {parcel.owner} | GIS CID: {parcel.geoHash}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
