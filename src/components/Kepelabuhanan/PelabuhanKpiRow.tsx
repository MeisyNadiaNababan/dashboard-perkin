import React from 'react';
import {
  DollarSign,
  CreditCard,
  Smile,
  Users,
  Anchor,
  Ship,
  TrendingUp,
  ArrowUpRight,
  HelpCircle,
  CheckCircle2,
} from 'lucide-react';

interface PelabuhanKpiRowProps {
  realisasiPnbpMiliar: number;
  targetPnbpMiliar: number;
  realisasiBelanjaMiliar: number;
  paguBelanjaMiliar: number;
  nilaiIkm: number;
  totalPenumpangJuta: number;
  totalPenumpangDatangJuta: number;
  totalPenumpangBerangkatJuta: number;
  jumlahDermaga: number;
  borPersen: number;
  totalCallKapal: number;
  callBarang: number;
  callPenumpang: number;
  onExplainKpi?: (kpiId: string) => void;
}

export const PelabuhanKpiRow: React.FC<PelabuhanKpiRowProps> = ({
  realisasiPnbpMiliar = 428.5,
  targetPnbpMiliar = 480.0,
  realisasiBelanjaMiliar = 184.25,
  paguBelanjaMiliar = 215.0,
  nilaiIkm = 88.4,
  totalPenumpangJuta = 7.43,
  totalPenumpangDatangJuta = 3.68,
  totalPenumpangBerangkatJuta = 3.75,
  jumlahDermaga = 24,
  borPersen = 64.8,
  totalCallKapal = 48650,
  callBarang = 16240,
  callPenumpang = 32410,
  onExplainKpi,
}) => {
  const persenPnbp = Math.round((realisasiPnbpMiliar / targetPnbpMiliar) * 1000) / 10;
  const persenBelanja = Math.round((realisasiBelanjaMiliar / paguBelanjaMiliar) * 1000) / 10;

  return (
    <div id="pelabuhan-kpi-row" className="space-y-2">
      {/* Banner Visualisasi BANs (Req 9) */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider font-mono">
            Ringkasan Indikator Kinerja Utama (IKU / KPI) Kepelabuhanan
          </span>
          <span className="text-[10px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded border border-slate-200 font-mono">
            Buku Satu Data Hal. 14 - 17
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10.5px] font-bold px-2 py-0.5 rounded bg-purple-50 text-purple-900 border border-purple-200 font-mono">
            Visualisasi: Kartu Metrik KPI (BANs - Big Numbers)
          </span>
          <span className="text-[10.5px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded font-mono hidden sm:inline-block">
            Atribut: <strong>REALISASI</strong>, <strong>TARGET</strong>, <strong>PERSEN CAPAIAN</strong>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
      {/* KPI 1: REALISASI PNBP KEPELABUHANAN (Dataset #3) */}
      <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-2xs hover:shadow-sm transition-all relative flex flex-col justify-between group">
        <div>
          <div className="flex items-center justify-between gap-1 mb-1">
            <div className="flex items-center gap-1.5">
              <div className="w-6 h-6 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center">
                <DollarSign className="w-3.5 h-3.5" />
              </div>
              <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-slate-100 text-slate-700 border border-slate-200">
                DS-3
              </span>
            </div>
            <button
              onClick={() => onExplainKpi && onExplainKpi('pelabuhan_pnbp')}
              className="text-slate-400 hover:text-blue-600 transition-colors cursor-pointer p-0.5"
              title="Lihat Formula & Sumber Data Satu Data"
            >
              <HelpCircle className="w-3.5 h-3.5" />
            </button>
          </div>

          <span className="text-[11px] font-bold text-slate-600 line-clamp-1">
            Realisasi PNBP Pelabuhan
          </span>
          <div className="flex items-baseline gap-1 mt-0.5">
            <span className="text-base font-extrabold text-slate-900 tracking-tight">
              Rp {realisasiPnbpMiliar.toLocaleString('id-ID', { minimumFractionDigits: 1, maximumFractionDigits: 1 })}
            </span>
            <span className="text-[10.5px] font-bold text-slate-500">Miliar</span>
          </div>
        </div>

        <div className="mt-2 pt-1.5 border-t border-slate-100">
          <div className="flex items-center justify-between text-[9.5px] text-slate-500 mb-1">
            <span>Target Rp {targetPnbpMiliar} M</span>
            <span className="font-bold text-emerald-700">{persenPnbp}%</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-emerald-600 h-1.5 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(persenPnbp, 100)}%` }}
            />
          </div>
          <span className="text-[9px] text-emerald-700 font-semibold flex items-center gap-0.5 mt-1">
            <TrendingUp className="w-2.5 h-2.5" />
            <span>+12,4% YoY vs 2025</span>
          </span>
        </div>
      </div>

      {/* KPI 2: REALISASI BELANJA KEPELABUHANAN (Dataset #2) */}
      <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-2xs hover:shadow-sm transition-all relative flex flex-col justify-between group">
        <div>
          <div className="flex items-center justify-between gap-1 mb-1">
            <div className="flex items-center gap-1.5">
              <div className="w-6 h-6 rounded-md bg-blue-50 text-[#1F4E79] border border-blue-200 flex items-center justify-center">
                <CreditCard className="w-3.5 h-3.5" />
              </div>
              <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-slate-100 text-slate-700 border border-slate-200">
                DS-2
              </span>
            </div>
            <button
              onClick={() => onExplainKpi && onExplainKpi('pelabuhan_belanja')}
              className="text-slate-400 hover:text-blue-600 transition-colors cursor-pointer p-0.5"
              title="Lihat Formula & Sumber Data Satu Data"
            >
              <HelpCircle className="w-3.5 h-3.5" />
            </button>
          </div>

          <span className="text-[11px] font-bold text-slate-600 line-clamp-1">
            Realisasi Belanja Dit.
          </span>
          <div className="flex items-baseline gap-1 mt-0.5">
            <span className="text-base font-extrabold text-slate-900 tracking-tight">
              Rp {realisasiBelanjaMiliar.toLocaleString('id-ID', { minimumFractionDigits: 1, maximumFractionDigits: 1 })}
            </span>
            <span className="text-[10.5px] font-bold text-slate-500">Miliar</span>
          </div>
        </div>

        <div className="mt-2 pt-1.5 border-t border-slate-100">
          <div className="flex items-center justify-between text-[9.5px] text-slate-500 mb-1">
            <span>Pagu Rp {paguBelanjaMiliar} M</span>
            <span className="font-bold text-blue-700">{persenBelanja}%</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-[#1F4E79] h-1.5 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(persenBelanja, 100)}%` }}
            />
          </div>
          <span className="text-[9px] text-slate-500 font-medium block mt-1">
            Serapan Modal &amp; Pemeliharaan
          </span>
        </div>
      </div>

      {/* KPI 3: IKM LAYANAN KEPELABUHANAN (Dataset #21) */}
      <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-2xs hover:shadow-sm transition-all relative flex flex-col justify-between group">
        <div>
          <div className="flex items-center justify-between gap-1 mb-1">
            <div className="flex items-center gap-1.5">
              <div className="w-6 h-6 rounded-md bg-amber-50 text-amber-700 border border-amber-200 flex items-center justify-center">
                <Smile className="w-3.5 h-3.5" />
              </div>
              <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-slate-100 text-slate-700 border border-slate-200">
                DS-21
              </span>
            </div>
            <button
              onClick={() => onExplainKpi && onExplainKpi('pelabuhan_ikm')}
              className="text-slate-400 hover:text-blue-600 transition-colors cursor-pointer p-0.5"
              title="Lihat Formula & Sumber Data Satu Data"
            >
              <HelpCircle className="w-3.5 h-3.5" />
            </button>
          </div>

          <span className="text-[11px] font-bold text-slate-600 line-clamp-1">
            IKM Layanan Pelabuhan
          </span>
          <div className="flex items-baseline gap-1 mt-0.5">
            <span className="text-base font-extrabold text-slate-900 tracking-tight">
              {nilaiIkm}
            </span>
            <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800">
              A (Sangat Baik)
            </span>
          </div>
        </div>

        <div className="mt-2 pt-1.5 border-t border-slate-100">
          <div className="flex items-center justify-between text-[9.5px] text-slate-500 mb-1">
            <span>Standar PermenPAN ≥85.0</span>
            <span className="font-semibold text-emerald-700">9 Unsur</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-emerald-500 h-1.5 rounded-full transition-all duration-500"
              style={{ width: `${(nilaiIkm / 100) * 100}%` }}
            />
          </div>
          <span className="text-[9px] text-slate-600 flex items-center gap-1 mt-1">
            <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600" />
            <span>Respon pengguna prima</span>
          </span>
        </div>
      </div>

      {/* KPI 4: JUMLAH PENUMPANG DOMESTIK & INTERNASIONAL (Dataset #25) */}
      <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-2xs hover:shadow-sm transition-all relative flex flex-col justify-between group">
        <div>
          <div className="flex items-center justify-between gap-1 mb-1">
            <div className="flex items-center gap-1.5">
              <div className="w-6 h-6 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200 flex items-center justify-center">
                <Users className="w-3.5 h-3.5" />
              </div>
              <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-slate-100 text-slate-700 border border-slate-200">
                DS-25
              </span>
            </div>
            <button
              onClick={() => onExplainKpi && onExplainKpi('pelabuhan_penumpang')}
              className="text-slate-400 hover:text-blue-600 transition-colors cursor-pointer p-0.5"
              title="Lihat Formula & Sumber Data Satu Data"
            >
              <HelpCircle className="w-3.5 h-3.5" />
            </button>
          </div>

          <span className="text-[11px] font-bold text-slate-600 line-clamp-1">
            Total Penumpang Pelabuhan
          </span>
          <div className="flex items-baseline gap-1 mt-0.5">
            <span className="text-base font-extrabold text-slate-900 tracking-tight">
              {totalPenumpangJuta.toLocaleString('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
            <span className="text-[10.5px] font-bold text-slate-500">Juta Pax</span>
          </div>
        </div>

        <div className="mt-2 pt-1.5 border-t border-slate-100">
          <div className="flex items-center justify-between text-[9.5px] text-slate-600 mb-0.5">
            <span className="text-blue-700 font-medium">Datang: {totalPenumpangDatangJuta} M</span>
            <span className="text-indigo-700 font-medium">Pergi: {totalPenumpangBerangkatJuta} M</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-1.5 flex overflow-hidden">
            <div className="bg-blue-600 h-1.5" style={{ width: '49.5%' }} />
            <div className="bg-indigo-500 h-1.5" style={{ width: '50.5%' }} />
          </div>
          <span className="text-[9px] text-slate-500 font-medium block mt-1">
            65,3% Domestik • 34,7% Internasional
          </span>
        </div>
      </div>

      {/* KPI 5: TOTAL BARANG / PETI KEMAS & DWELL TIME (Dataset #23 & #5) */}
      <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-2xs hover:shadow-sm transition-all relative flex flex-col justify-between group">
        <div>
          <div className="flex items-center justify-between gap-1 mb-1">
            <div className="flex items-center gap-1.5">
              <div className="w-6 h-6 rounded-md bg-amber-50 text-amber-700 border border-amber-200 flex items-center justify-center">
                <Anchor className="w-3.5 h-3.5" />
              </div>
              <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-slate-100 text-slate-700 border border-slate-200">
                DS-23
              </span>
            </div>
            <button
              onClick={() => onExplainKpi && onExplainKpi('pelabuhan_petikemas_dwelltime')}
              className="text-slate-400 hover:text-blue-600 transition-colors cursor-pointer p-0.5"
              title="Lihat Formula Dwell Time & Arus Peti Kemas"
            >
              <HelpCircle className="w-3.5 h-3.5" />
            </button>
          </div>

          <span className="text-[11px] font-bold text-slate-600 line-clamp-1">
            Total Barang / Peti Kemas
          </span>
          <div className="flex items-baseline gap-1 mt-0.5">
            <span className="text-base font-extrabold text-slate-900 tracking-tight">
              624.850
            </span>
            <span className="text-[10.5px] font-bold text-slate-500">TEUs</span>
          </div>
        </div>

        <div className="mt-2 pt-1.5 border-t border-slate-100">
          <div className="flex items-center justify-between text-[9.5px] text-slate-500 mb-1">
            <span>Dwell Time:</span>
            <span className="font-bold text-emerald-700">2,8 Hari</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-emerald-600 h-1.5 rounded-full transition-all duration-500"
              style={{ width: '70%' }}
            />
          </div>
          <span className="text-[9px] text-slate-600 font-medium block mt-1">
            Target INSW ≤ 3,0 Hari • 5,82 Jt Ton
          </span>
        </div>
      </div>

      {/* KPI 6: KUNJUNGAN KAPAL BARANG & PENUMPANG (Dataset #5 & #7) */}
      <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-2xs hover:shadow-sm transition-all relative flex flex-col justify-between group">
        <div>
          <div className="flex items-center justify-between gap-1 mb-1">
            <div className="flex items-center gap-1.5">
              <div className="w-6 h-6 rounded-md bg-sky-50 text-sky-700 border border-sky-200 flex items-center justify-center">
                <Ship className="w-3.5 h-3.5" />
              </div>
              <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-slate-100 text-slate-700 border border-slate-200">
                DS-5 &amp; 7
              </span>
            </div>
            <button
              onClick={() => onExplainKpi && onExplainKpi('pelabuhan_kunjungan')}
              className="text-slate-400 hover:text-blue-600 transition-colors cursor-pointer p-0.5"
              title="Lihat Formula & Sumber Data Satu Data"
            >
              <HelpCircle className="w-3.5 h-3.5" />
            </button>
          </div>

          <span className="text-[11px] font-bold text-slate-600 line-clamp-1">
            Kunjungan Kapal (Call)
          </span>
          <div className="flex items-baseline gap-1 mt-0.5">
            <span className="text-base font-extrabold text-slate-900 tracking-tight">
              {totalCallKapal.toLocaleString('id-ID')}
            </span>
            <span className="text-[10.5px] font-bold text-slate-500">Call</span>
          </div>
        </div>

        <div className="mt-2 pt-1.5 border-t border-slate-100">
          <div className="flex items-center justify-between text-[9.5px] text-slate-600 mb-0.5">
            <span className="text-amber-700 font-medium">Barang: {callBarang.toLocaleString('id-ID')}</span>
            <span className="text-sky-700 font-medium">Penumpang: {callPenumpang.toLocaleString('id-ID')}</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-1.5 flex overflow-hidden">
            <div className="bg-amber-500 h-1.5" style={{ width: '33.4%' }} />
            <div className="bg-sky-500 h-1.5" style={{ width: '66.6%' }} />
          </div>
          <span className="text-[9px] text-slate-500 font-medium block mt-1">
            Total Tonase: 61,4 Juta GT
          </span>
        </div>
      </div>
    </div>
  </div>
  );
};
