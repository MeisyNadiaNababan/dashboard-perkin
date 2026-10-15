import React, { useState } from 'react';
import {
  Calendar,
  Download,
  FileCode2,
} from 'lucide-react';
import { PERKIN_A3_KPIS } from './pengelolaanLahanPesisirData';
import { PengelolaanLahanPesisirKpiRow } from './PengelolaanLahanPesisirKpiRow';
import { PengelolaanLahanPesisirVisualCharts } from './PengelolaanLahanPesisirVisualCharts';
import { PengelolaanLahanPesisirDeepDiveCenter } from './PengelolaanLahanPesisirDeepDiveCenter';
import { PengelolaanLahanPesisirFormulaModal } from './PengelolaanLahanPesisirFormulaModal';
import { PengelolaanLahanPesisirNarasiAi } from './PengelolaanLahanPesisirNarasiAi';

interface PengelolaanLahanPesisirDashboardProps {
  activeSubTab?: string;
  onOpenFormulaModal?: (kpiId: string) => void;
  onOpenExportModal?: () => void;
  onSwitchUnit?: (unitId: string) => void;
}

export const PengelolaanLahanPesisirDashboard: React.FC<
  PengelolaanLahanPesisirDashboardProps
> = ({ onOpenFormulaModal, onOpenExportModal, onSwitchUnit: _onSwitchUnit }) => {
  // Filter State - Persis Model Filter Dashboard DEP-A2
  const [selectedYear, setSelectedYear] = useState<string>('2026');
  const [selectedDeepDiveUnit, setSelectedDeepDiveUnit] = useState<string>('dit-lahan');

  // Modal State
  const [isFormulaModalOpen, setIsFormulaModalOpen] = useState(false);
  const [modalKpiId, setModalKpiId] = useState<string | null>('ikp-1-lahan-investasi');

  const handleOpenFormula = (kpiId: string) => {
    if (onOpenFormulaModal) {
      onOpenFormulaModal(kpiId);
    } else {
      setModalKpiId(kpiId);
      setIsFormulaModalOpen(true);
    }
  };

  const handleSelectDeepDive = (unitId: string) => {
    setSelectedDeepDiveUnit(unitId);
    setTimeout(() => {
      const el = document.getElementById('a3-deep-dive-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 60);
  };

  const handleExportConsolidatedCsv = () => {
    const headers = ['Kategori', 'Indikator / Program', 'Target / Pagu', 'Realisasi Aktual', 'Capaian (%)', 'Status'];
    const rows: (string | number)[][] = [];

    // Add 3 IKP rows
    PERKIN_A3_KPIS.forEach((ikp) => {
      rows.push([
        'IKP Utama DEP-A3',
        `"${ikp.nama}"`,
        `"${ikp.target2025} ${ikp.satuan}"`,
        `"${ikp.realisasi} ${ikp.satuan}"`,
        ikp.capaianPersen.toFixed(1),
        ikp.capaianPersen >= 100 ? 'Melampaui' : 'Tercapai',
      ]);
    });

    // Add Operational KPIs based on Satu Data BP Batam
    rows.push(
      ['Monitoring Operasional', '"SLA Kecepatan Pelayanan Izin Lahan"', '4,0 Hari', '2,4 Hari', '166.7', '96,2% Patuh'],
      ['Monitoring Operasional', '"Kesesuaian Zonasi Laut & Reklamasi (PKKPRL)"', '100%', '100%', '100.0', '28 Rekomendasi'],
      ['Monitoring Operasional', '"Efektivitas Penanganan Sengketa & Mediasi Lahan"', '90,0%', '94,8%', '105.3', '182 Kasus Selesai'],
      ['Monitoring Operasional', '"Utilisasi SWP Lahan Produktif (#15)"', '80,0%', '86,5%', '108.1', '8 SWP Aktif'],
      ['Monitoring Operasional', '"Penerimaan PNBP Pengelolaan Lahan"', 'Rp 1.310 M', 'Rp 1.422,4 M', '108.6', 'Surplus Rp 112,4 M'],
      ['Monitoring Operasional', '"Rekuperasi Lahan Mangkrak (Penyelamatan Aset)"', '50,0 Ha', '94,6 Ha', '189.2', 'Rp 3,48 T Aset Diselamatkan'],
      ['Monitoring Operasional', '"Pengawasan Objek Lahan & Pesisir"', '450 Objek', '422 Lokasi', '93.8', '93,8% Patuh']
    );

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute(
      'download',
      `Konsolidasi_Perkin_DEP_A3_${selectedYear}_${new Date().toISOString().split('T')[0]}.csv`
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
      {/* 1. FILTER BAR RINGKAS (PERSIS MODEL FILTER DASHBOARD DEP-A2)         */}
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
                aria-label="Filter Tahun Anggaran DEP-A3"
                className="bg-slate-50 hover:bg-slate-100 border border-slate-200 font-bold text-[#0A2540] rounded-lg px-3 py-1 text-xs outline-none cursor-pointer pr-8 transition-colors focus:border-[#0A2540]"
              >
                <option value="2026">Tahun Anggaran 2026 (Berjalan)</option>
                <option value="2025">Tahun Anggaran 2025</option>
                <option value="2024">Tahun Anggaran 2024</option>
              </select>
            </div>
            <span className="text-[11px] text-slate-600 italic hidden sm:inline">
              Menampilkan data penetapan Perkin Deputi A3 &amp; capaian multi-indikator
            </span>
          </div>

          {/* Right Side: Manual 3 IKP & Ekspor Data */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => handleOpenFormula('ikp-1-lahan-investasi')}
              className="px-2.5 py-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
              title="Buka Dokumen Manual 3 IKP"
            >
              <FileCode2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Manual 3 IKP</span>
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
      {/* 2. BARIS KPI: 3 IKP UTAMA + 4 KPI OPERASIONAL ULTRA-SLIM              */}
      {/* ==================================================================== */}
      <PengelolaanLahanPesisirKpiRow
        onOpenFormulaModal={handleOpenFormula}
        onSelectUnit={handleSelectDeepDive}
      />

      {/* ==================================================================== */}
      {/* 3. CAPAIAN EVALUASI 3 IKP (RADAR + TAB GRAFIK PERSIS DEP-A2)         */}
      {/* ==================================================================== */}
      <div id="a3-visual-charts-section">
        <PengelolaanLahanPesisirVisualCharts
          onOpenFormulaModal={handleOpenFormula}
        />
      </div>

      {/* ==================================================================== */}
      {/* 4. UNIT DEEP-DIVE CENTER: 1 TAMPILAN BANYAK VISUALISASI PER UNIT     */}
      {/* ==================================================================== */}
      <div id="a3-deep-dive-section" className="scroll-mt-6">
        <PengelolaanLahanPesisirDeepDiveCenter
          selectedUnitId={selectedDeepDiveUnit}
          onSelectUnit={handleSelectDeepDive}
          onOpenFormulaModal={handleOpenFormula}
          onOpenExportModal={onOpenExportModal}
        />
      </div>

      {/* ==================================================================== */}
      {/* 5. NARASI AI STRATEGIS (PERSIS MODEL DI DASHBOARD DEP-A2)             */}
      {/* ==================================================================== */}
      <section className="pt-0.5">
        <PengelolaanLahanPesisirNarasiAi />
      </section>

      {/* ==================================================================== */}
      {/* 6. FORMULA & REGULATORY EXPLANATION MODAL                             */}
      {/* ==================================================================== */}
      <PengelolaanLahanPesisirFormulaModal
        isOpen={isFormulaModalOpen}
        onClose={() => setIsFormulaModalOpen(false)}
        kpiId={modalKpiId}
      />
    </div>
  );
};
