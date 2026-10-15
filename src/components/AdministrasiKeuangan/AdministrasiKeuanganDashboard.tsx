import React, { useState } from 'react';
import {
  Calendar,
  Download,
  FileCode2,
} from 'lucide-react';
import { PERKIN_A1_INFO, PERKIN_A1_IKP_LIST } from './administrasiKeuanganData';
import { AdministrasiKeuanganKpiRow } from './AdministrasiKeuanganKpiRow';
import { AdministrasiKeuanganVisualCharts } from './AdministrasiKeuanganVisualCharts';
import { AdministrasiKeuanganDeepDiveCenter } from './AdministrasiKeuanganDeepDiveCenter';
import { AdministrasiKeuanganFormulaModal } from './AdministrasiKeuanganFormulaModal';
import { AdministrasiKeuanganNarasiAi } from './AdministrasiKeuanganNarasiAi';

interface AdministrasiKeuanganDashboardProps {
  activeSheet?: string;
  activeSubTab?: string;
  onSelectSheet?: (sheet: string) => void;
  onOpenFormulaModal?: (kpiId: string) => void;
  onOpenExportModal?: () => void;
  onSwitchUnit?: (unitId: string) => void;
}

export const AdministrasiKeuanganDashboard: React.FC<
  AdministrasiKeuanganDashboardProps
> = ({
  onOpenFormulaModal,
  onOpenExportModal,
  onSwitchUnit,
}) => {
  // Filter State - Persis Model Filter Kepala BP Batam
  const [selectedYear, setSelectedYear] = useState<string>('2026');
  const [selectedBiro, setSelectedBiro] = useState<'biro-keuangan' | 'biro-sdm' | 'biro-organisasi'>('biro-keuangan');

  // Modal State
  const [isFormulaModalOpen, setIsFormulaModalOpen] = useState(false);
  const [modalKpiId, setModalKpiId] = useState<string | null>('ikp-1-rb');

  const handleOpenFormula = (kpiId: string) => {
    if (onOpenFormulaModal) {
      onOpenFormulaModal(kpiId);
    } else {
      setModalKpiId(kpiId);
      setIsFormulaModalOpen(true);
    }
  };

  const handleSelectBiro = (biroId: string) => {
    if (biroId === 'biro-keuangan' || biroId === 'biro-sdm' || biroId === 'biro-organisasi') {
      setSelectedBiro(biroId);
    }
    setTimeout(() => {
      const el = document.getElementById('a1-deep-dive-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 60);
  };

  const handleExportConsolidatedCsv = () => {
    const headers = ['Kategori', 'Indikator / Program', 'Target / Pagu', 'Realisasi Aktual', 'Capaian (%)', 'Status'];
    const rows: (string | number)[][] = [];

    // Add 4 IKP rows
    PERKIN_A1_IKP_LIST.forEach((ikp) => {
      rows.push([
        'IKP Utama DEP-A1',
        `"${ikp.namaLengkap}"`,
        `"${ikp.targetTeks}"`,
        `"${ikp.nilaiUtama}"`,
        ikp.capaianPersen.toFixed(1),
        `"${ikp.predikat}"`,
      ]);
    });

    // Add Operational KPIs
    rows.push(
      ['Monitoring Operasional', '"Realisasi Pendapatan (PNBP BP Batam)"', 'Rp 2.447,8 M', 'Rp 1.892,4 M', '77.3', 'On Track'],
      ['Monitoring Operasional', '"Realisasi Belanja (Serapan Anggaran)"', 'Rp 2.267,5 M', 'Rp 1.937,9 M', '85.5', 'Baik'],
      ['Monitoring Operasional', '"Saldo Kas & Bank BLU"', 'Likuid', 'Rp 1.428,5 M', '242.8', 'Aman (5 Bank)'],
      ['Monitoring Operasional', '"Indeks Kinerja Pelaksanaan Anggaran (IKPA)"', '95,00', '96,25', '101.3', 'Sangat Baik'],
      ['Monitoring Operasional', '"Indeks Profesionalitas ASN (IP ASN)"', '80,00', '84,60', '105.8', 'Kategori Tinggi'],
      ['Monitoring Operasional', '"Kepatuhan LHKPN & Audit BPK"', '100% LHKPN', '100% / 93,9% BPK', '98.5', 'Tuntas WTP']
    );

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute(
      'download',
      `Konsolidasi_Perkin_DEP_A1_${selectedYear}_${new Date().toISOString().split('T')[0]}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div
      className="space-y-3.5 font-sans text-slate-800 pb-12 max-w-[1880px] mx-auto origin-top"
      style={{ zoom: '80%' }}
    >
      {/* ==================================================================== */}
      {/* 1. FILTER BAR RINGKAS (PERSIS MODEL FILTER DASHBOARD KEPALA BP BATAM)*/}
      {/* ==================================================================== */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs px-3.5 py-2 transition-all">
        <div className="flex items-center justify-between gap-3">
          {/* Left Side: Filter Tahun */}
          <div className="flex items-center gap-2.5 text-xs">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#0A2540] text-amber-300 font-bold shrink-0 shadow-2xs">
              <Calendar className="w-3.5 h-3.5 text-amber-300" />
              <span className="tracking-wide">FILTER TAHUN:</span>
            </div>

            <div className="relative">
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                aria-label="Filter Tahun Anggaran DEP-A1"
                className="bg-slate-50 hover:bg-slate-100 border border-slate-200 font-bold text-[#0A2540] rounded-lg px-3 py-1 text-xs outline-none cursor-pointer pr-8 transition-colors focus:border-[#0A2540]"
              >
                <option value="2026">Tahun Anggaran 2026 (Berjalan)</option>
                <option value="2025">Tahun Anggaran 2025</option>
                <option value="2024">Tahun Anggaran 2024</option>
              </select>
            </div>
            <span className="text-[11px] text-slate-600 italic hidden sm:inline">
              Menampilkan data penetapan Perkin Deputi A1 &amp; capaian multi-indikator
            </span>
          </div>

          {/* Right Side: Manual 4 IKP & Ekspor Data */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => handleOpenFormula('ikp-1-rb')}
              className="px-2.5 py-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
              title="Buka Dokumen Manual 4 IKP"
            >
              <FileCode2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Manual 4 IKP</span>
            </button>

            <button
              onClick={onOpenExportModal || handleExportConsolidatedCsv}
              className="px-3 py-1.5 rounded-lg bg-[#0A2540] text-white hover:bg-slate-800 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-2xs"
            >
              <Download className="w-3.5 h-3.5 text-amber-300" />
              <span>Ekspor Data</span>
            </button>
          </div>
        </div>
      </div>

      {/* ==================================================================== */}
      {/* 2. BARIS KPI: 4 IKP UTAMA + 6 KPI MONITORING OPERASIONAL             */}
      {/* Realisasi Pendapatan, Belanja, Kas & Bank, IKPA, IP ASN, Audit/KPK   */}
      {/* ==================================================================== */}
      <AdministrasiKeuanganKpiRow
        onOpenFormulaModal={handleOpenFormula}
        onSelectUnit={handleSelectBiro}
      />

      {/* ==================================================================== */}
      {/* 3. CAPAIAN EVALUASI 4 IKP (RADAR + TAB GRAFIK PERSIS KEPALA BP BATAM)*/}
      {/* ==================================================================== */}
      <div id="a1-visual-charts-section">
        <AdministrasiKeuanganVisualCharts
          onOpenFormulaModal={handleOpenFormula}
        />
      </div>

      {/* ==================================================================== */}
      {/* 4. UNIT DEEP-DIVE CENTER: SATU TAMPILAN 5 KARTU KOMPAK PER BIRO      */}
      {/* Variasi visualisasi kaya khas per biro dipertahankan & tanpa badge    */}
      {/* ==================================================================== */}
      <div id="a1-deep-dive-section" className="scroll-mt-6">
        <AdministrasiKeuanganDeepDiveCenter
          selectedUnitId={selectedBiro}
          onSelectUnit={(biroId) => {
            if (biroId === 'biro-keuangan' || biroId === 'biro-sdm' || biroId === 'biro-organisasi') {
              setSelectedBiro(biroId);
            }
          }}
          onOpenFormulaModal={handleOpenFormula}
        />
      </div>

      {/* ==================================================================== */}
      {/* 5. NARASI AI STRATEGIS (PERSIS MODEL DI DASHBOARD KEPALA BP BATAM)   */}
      {/* ==================================================================== */}
      <section className="pt-0.5">
        <AdministrasiKeuanganNarasiAi />
      </section>

      {/* ==================================================================== */}
      {/* 6. FORMULA & REGULATORY EXPLANATION MODAL                             */}
      {/* ==================================================================== */}
      <AdministrasiKeuanganFormulaModal
        isOpen={isFormulaModalOpen}
        onClose={() => setIsFormulaModalOpen(false)}
        kpiId={modalKpiId}
      />
    </div>
  );
};
