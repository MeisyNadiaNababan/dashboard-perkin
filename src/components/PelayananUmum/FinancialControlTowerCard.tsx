import React, { useState } from 'react';
import {
  CreditCard,
  TrendingUp,
  CheckCircle2,
  Stethoscope,
  Shield,
  Droplets,
  ArrowUpRight,
  Info,
  Building2,
  BadgePercent,
  Wallet,
} from 'lucide-react';
import {
  FINANCIAL_CONTROL_TOWER_DATA,
  FINANCIAL_TOWER_CONSOLIDATED,
} from './pelayananUmumData';

interface FinancialControlTowerCardProps {
  onSelectUnit?: (unitId: string) => void;
}

export const FinancialControlTowerCard: React.FC<FinancialControlTowerCardProps> = ({
  onSelectUnit,
}) => {
  const [filterMode, setFilterMode] = useState<'all' | 'bu_only'>('all');

  const displayedRows =
    filterMode === 'bu_only'
      ? FINANCIAL_CONTROL_TOWER_DATA.filter((r) => r.jenisUnit === 'Badan Usaha (BLU)')
      : FINANCIAL_CONTROL_TOWER_DATA;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200/90 p-4 sm:p-5">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center font-bold border border-blue-100">
            <CreditCard className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-800">
                FINANCIAL CONTROL TOWER
              </h2>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                TA 2025 / 2026
              </span>
            </div>
            <p className="text-[11px] text-slate-500">
              Monitoring Realisasi Anggaran Belanja, Penerimaan PNBP Fungsional, dan Analisis Surplus/Defisit
            </p>
          </div>
        </div>

        {/* Action / Badges */}
        <div className="flex items-center gap-2">
          {/* Quick View Toggle */}
          <div className="flex items-center bg-slate-100 p-0.5 rounded-lg text-[11px] font-semibold">
            <button
              onClick={() => setFilterMode('all')}
              className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                filterMode === 'all'
                  ? 'bg-white text-slate-900 shadow-2xs font-bold'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Semua Unit (3 Unit)
            </button>
            <button
              onClick={() => setFilterMode('bu_only')}
              className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                filterMode === 'bu_only'
                  ? 'bg-white text-blue-700 shadow-2xs font-bold'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Hanya Badan Usaha (2 BU)
            </button>
          </div>

          <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>FISCAL HEALTH: MANDIRI & SURPLUS</span>
          </span>
        </div>
      </div>

      {/* Table Headings */}
      <div className="mt-4 hidden lg:grid grid-cols-12 gap-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2 pb-2">
        <div className="col-span-4">ORGANIZATIONAL UNIT & PERAN ENTITAS</div>
        <div className="col-span-3">REALISASI ANGGARAN BELANJA</div>
        <div className="col-span-3 text-right">REALISASI PENDAPATAN (PNBP)</div>
        <div className="col-span-2 text-right">SURPLUS / DEFISIT</div>
      </div>

      {/* Rows */}
      <div className="divide-y divide-slate-100">
        {displayedRows.map((row) => {
          const isRs = row.unitId === 'bu-rumah-sakit';
          const isPam = row.unitId === 'dit-pam-aset';
          const isSurplus = row.surplusDefisitMiliar >= 0;

          return (
            <div
              key={row.unitId}
              onClick={() => onSelectUnit && onSelectUnit(row.unitId)}
              className="py-3 px-2 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer group"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-center">
                {/* 1. Unit Info */}
                <div className="lg:col-span-4 flex items-start gap-3">
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 border mt-0.5 ${
                      isRs
                        ? 'bg-rose-50 text-rose-600 border-rose-200'
                        : isPam
                        ? 'bg-amber-50 text-amber-600 border-amber-200'
                        : 'bg-cyan-50 text-cyan-600 border-cyan-200'
                    }`}
                  >
                    {isRs ? (
                      <Stethoscope className="w-4 h-4" />
                    ) : isPam ? (
                      <Shield className="w-4 h-4" />
                    ) : (
                      <Droplets className="w-4 h-4" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <h4 className="text-xs sm:text-sm font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                        {row.namaUnit}
                      </h4>
                      <span
                        className={`text-[10px] font-semibold px-1.5 py-0.2 rounded border ${
                          row.jenisUnit === 'Badan Usaha (BLU)'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : 'bg-slate-100 text-slate-700 border-slate-200'
                        }`}
                      >
                        {row.jenisUnit}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                      {row.kategori}
                    </p>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {row.budgetCapClass}
                    </span>
                  </div>
                </div>

                {/* 2. Budget Absorption / Belanja */}
                <div className="lg:col-span-3 space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[11px] text-slate-500 font-medium">
                      Serapan: <strong className="text-slate-900 font-mono font-extrabold">{row.serapanPersen.toFixed(1)}%</strong>
                    </span>
                    <span className="text-[11px] text-slate-500 font-mono">
                      Pagu: Rp {row.paguBelanjaMiliar.toFixed(1)}M
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        row.serapanPersen >= 90
                          ? 'bg-emerald-500'
                          : row.serapanPersen >= 80
                          ? 'bg-blue-600'
                          : 'bg-amber-500'
                      }`}
                      style={{ width: `${Math.min(row.serapanPersen, 100)}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                    <span>Realisasi: <strong className="text-slate-800">Rp {row.realisasiBelanjaMiliar.toFixed(1)}M</strong></span>
                    <span>Sisa: Rp {row.sisaBelanjaMiliar.toFixed(1)}M</span>
                  </div>
                </div>

                {/* 3. Revenue / PNBP */}
                <div className="lg:col-span-3 text-left lg:text-right space-y-0.5">
                  <div className="flex items-center justify-between lg:justify-end gap-2 text-xs">
                    <span className="lg:hidden text-[11px] text-slate-400 uppercase font-bold">
                      Realisasi PNBP:
                    </span>
                    <span className="text-sm font-black text-emerald-600 font-mono">
                      Rp {row.realisasiPnbpMiliar.toFixed(1)}M
                    </span>
                  </div>
                  <div className="flex items-center justify-between lg:justify-end gap-2 text-[10px] text-slate-500 font-mono">
                    <span className="text-slate-400">Target: Rp {row.targetPnbpMiliar.toFixed(1)}M</span>
                    <span className="inline-flex items-center gap-0.5 font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                      {row.capaianPnbpPersen.toFixed(1)}% Capaian
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400 font-mono">
                    {row.jenisUnit === 'Badan Usaha (BLU)'
                      ? 'Fungsional Pelayanan Publik'
                      : 'Pemanfaatan Aset Terbatas'}
                  </p>
                </div>

                {/* 4. Surplus / Defisit Analysis */}
                <div className="lg:col-span-2 text-left lg:text-right space-y-0.5">
                  <span className="lg:hidden text-[10px] text-slate-400 uppercase font-bold block">
                    Surplus / Defisit:
                  </span>
                  <div className="flex items-center lg:justify-end">
                    <span
                      className={`inline-block text-xs font-black font-mono px-2.5 py-1 rounded-md border shadow-2xs ${
                        isSurplus
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                          : 'bg-amber-50 text-amber-800 border-amber-300'
                      }`}
                    >
                      {isSurplus
                        ? `+Rp ${row.surplusDefisitMiliar.toFixed(1)}M`
                        : `-Rp ${Math.abs(row.surplusDefisitMiliar).toFixed(1)}M`}
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-500 font-mono mt-1">
                    <span className="font-semibold">CRR: {row.costRecoveryRate.toFixed(1)}%</span>
                    <span className="block text-[9px] text-slate-400">
                      {isSurplus ? 'Mandiri Operasional' : 'Dibiayai DIPA Operasional'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Catatan Fiskal Singkat */}
              {row.catatanFiskal && (
                <div className="mt-1.5 ml-12 text-[10px] text-slate-400 italic">
                  {row.catatanFiskal}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Consolidated Footer */}
      <div className="mt-4 pt-3 border-t border-slate-200/90 bg-slate-50/90 -mx-4 -mb-4 sm:-mx-5 sm:-mb-5 p-4 rounded-b-xl flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex flex-wrap items-center gap-4 sm:gap-6">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
              TOTAL PAGU BELANJA (3 SATKER)
            </span>
            <span className="font-extrabold text-slate-900 font-mono">
              Rp {FINANCIAL_TOWER_CONSOLIDATED.totalPaguBelanjaMiliar.toFixed(1)}M
            </span>
          </div>

          <div className="h-6 w-px bg-slate-200 hidden sm:block" />

          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
              REALISASI BELANJA
            </span>
            <span className="font-extrabold text-slate-900 font-mono">
              Rp {FINANCIAL_TOWER_CONSOLIDATED.totalRealisasiBelanjaMiliar.toFixed(1)}M{' '}
              <span className="text-slate-500 font-normal">({FINANCIAL_TOWER_CONSOLIDATED.serapanKonsolidasiPersen.toFixed(1)}%)</span>
            </span>
          </div>

          <div className="h-6 w-px bg-slate-200 hidden sm:block" />

          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
              TOTAL PENERIMAAN PNBP
            </span>
            <span className="font-extrabold text-emerald-600 font-mono">
              Rp {FINANCIAL_TOWER_CONSOLIDATED.totalRealisasiPnbpMiliar.toFixed(1)}M{' '}
              <span className="text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded text-[10px] border border-emerald-200">
                {FINANCIAL_TOWER_CONSOLIDATED.capaianPnbpKonsolidasiPersen.toFixed(1)}%
              </span>
            </span>
          </div>
        </div>

        {/* Strategic Surplus Summary */}
        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
              SURPLUS 2 BADAN USAHA (RSBP + SPAM)
            </span>
            <span className="font-black text-emerald-800 bg-emerald-100/80 px-2.5 py-1 rounded text-xs font-mono border border-emerald-200 inline-block">
              Net Surplus: +Rp {FINANCIAL_TOWER_CONSOLIDATED.buNetSurplusMiliar.toFixed(1)}M (CRR {FINANCIAL_TOWER_CONSOLIDATED.buCostRecoveryRate.toFixed(1)}%)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

